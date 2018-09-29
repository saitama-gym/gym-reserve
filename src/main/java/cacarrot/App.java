package cacarrot;

import cacarrot.dto.DiffResult;
import com.gargoylesoftware.htmlunit.BrowserVersion;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;

public class App {

    public static void execute(String browserName) throws IOException {
        WebDriver driver;
        ChromeOptions chromeOptions;
        switch (browserName) {
            case "htmlunit":
                java.util.logging.Logger.getLogger("com.gargoylesoftware.htmlunit.javascript.host.html.HTMLDocument").setLevel(Level.OFF);
                System.setProperty("org.apache.commons.logging.Log", "org.apache.commons.logging.impl.NoOpLog");
                driver = new HtmlUnitDriver(BrowserVersion.CHROME, true);
                break;
            case "chrome_headless":
                setChromeDriverPath();
                chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--headless");
                chromeOptions.addArguments("--disable-gpu");
                driver = new ChromeDriver(chromeOptions);
                break;
            case "chrome":
            default:
                setChromeDriverPath();
                chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--window-size=768,1024");
                driver = new ChromeDriver(chromeOptions);
        }
        driver.get(Const.URL_SITE_TOP);

        /* サイトトップ画面 */
        driver.findElement(By.cssSelector("img[alt='施設の空き状況']")).click();

        /* メニュー選択画面 */
        driver.findElement(By.cssSelector("img[alt='複合検索条件']")).click();

        /* 検索条件指定画面 */
        // 利用目的
        driver.findElement(By.cssSelector("img[alt='利用目的の選択']")).click();
        driver.findElement(By.linkText("バスケットボール")).click();

        // 曜日指定
        driver.findElement(By.cssSelector("img[alt='土']")).click();
        driver.findElement(By.cssSelector("img[alt='日']")).click();
        driver.findElement(By.cssSelector("img[alt='祝日']")).click();

        // 各体育館について繰り返し
        StringBuilder resultSb = new StringBuilder();//表示用
        Map<String, Integer> csvMap = new LinkedHashMap<>();//CSV履歴用
        for (String kanName : Const.TARGET_KAN_ARRAY) {
            System.out.println(kanName);
            List<String> reportList = new ArrayList<>();

            // 館
            driver.findElement(By.cssSelector("img[alt='館の選択']")).click();
            driver.findElement(By.linkText(kanName)).click();

            // 検索開始
            driver.findElement(By.cssSelector("img[alt='検索を開始する']")).click();

            /* 検索結果画面 */
            // 各施設について繰り返し
            boolean isIncrement = true;
            boolean hasNextSpace = true;
            while (hasNextSpace) {
                String spaceName = getSpaceName(driver);
                System.out.println(spaceName);
                // 各週について繰り返し
                for (int i = 1; i <= Const.MAX_PAGE; i++) {
                    String fromTo = getFromDateText(driver) + "〜" + getToDateText(driver);
                    System.out.println(fromTo);
                    int count = countFreeSpace(driver);
                    if (count > 0) {
                        reportList.add("　" + Const.SLACK_EMOJI_OK + spaceName.replace(kanName, "") + "(" + fromTo + ")：" + count + "枠あり");
                    } else {
                        reportList.add("　" + Const.SLACK_EMOJI_NG + spaceName.replace(kanName, "") + "(" + fromTo + ")：-");
                    }
                    if (!csvMap.containsKey(spaceName)) {
                        csvMap.put(spaceName, count);//新規
                    } else {
                        csvMap.put(spaceName, csvMap.get(spaceName) + count);//加算
                    }
                    if (i != Const.MAX_PAGE) {
                        if (isIncrement) {
                            driver.findElement(By.cssSelector("img[alt='次の週']")).click();
                        } else {
                            driver.findElement(By.cssSelector("img[alt='前の週']")).click();
                        }
                    }
                }
                // 次の施設へ
                By nextSpace = By.cssSelector("img[alt='次の施設']");
                if (driver.findElements(nextSpace).size() > 0) {
                    // 次の施設があれば進む
                    driver.findElement(nextSpace).click();
                    isIncrement = !isIncrement;
                } else {
                    // 次の施設がなければ検索条件指定画面へ戻る
                    driver.findElement(By.cssSelector("img[alt='もどる']")).click();
                    resultSb.append(createMessage(kanName, reportList));
                    hasNextSpace = false;
                    break;
                }
            }
        }

        /* 結果通知 */
        // 差分出力
        DiffResult diffResult = diffCsvMap(getLastCsvMap(), csvMap);//前回からの差分チェック
        Slack.postMessage(Const.SLACK_TO_DISPLAY_DIFF, diffResult.getSlackIcon(), diffResult.getMessage());

        // 全出力
        Slack.postMessage(Const.SLACK_TO_DISPLAY_ALL, Const.SLACK_EMOJI_BASKETBALL, resultSb.toString());

        /* CSV履歴保存 */
        StringBuilder csvSb = new StringBuilder();
        for (Map.Entry<String, Integer> entry : csvMap.entrySet()) {
            csvSb.append(entry.getKey() + "," + entry.getValue() + "\n");
        }
        Slack.postMessage(Const.SLACK_TO_CSV, Const.SLACK_EMOJI_BASKETBALL, csvSb.toString());

        /* 終了 */
        driver.quit();
    }

    protected static DiffResult diffCsvMap(final Map<String, Integer> mapBefore, final Map<String, Integer> mapAfter) {
        StringBuilder msg = new StringBuilder();
        boolean hasIncrease = false;
        for (Map.Entry<String, Integer> entry : mapAfter.entrySet()) {
            String spaceName = entry.getKey();
            int countAfter = entry.getValue();
            int countBefore = mapBefore.get(spaceName);
            if (countBefore < countAfter) {
                // 対象施設の空きが増えた
                msg.append("　" + Const.SLACK_EMOJI_NEW + spaceName + "：" + countAfter + "枠(+" + (countAfter - countBefore) + ")\n");
                hasIncrease = true;
            } else if (countBefore > countAfter) {
                // 対象施設の空きが減った
                msg.append("　" + Const.SLACK_EMOJI_NG + spaceName + "：" + countAfter + "枠(-" + (countBefore - countAfter) + ")\n");
            }
        }
        DiffResult result = new DiffResult();
        if (hasIncrease) {
            // 増加がある場合
            result.setMessage("<!channel> 空きが増えました。\n" + msg.toString() + "\n" + Const.URL_SITE_TOP);
            result.setSlackIcon(Const.SLACK_EMOJI_NEW);
        } else if (msg.length() == 0) {
            // 増減なしの場合
            result.setMessage("前回チェック時から空き増減なし");
            result.setSlackIcon(Const.SLACK_EMOJI_STAY);
        } else {
            // 減少のみの場合
            result.setMessage("前回チェック時から空き減少のみ\n" + msg.toString());
            result.setSlackIcon(Const.SLACK_EMOJI_NG);
        }
        return result;
    }

    protected static Map<String, Integer> csvStringToMap(String csvString) {
        Map<String, Integer> retMap = new LinkedHashMap<>();
        String[] csvArray = csvString.split("\n");
        for (String csvRecord : csvArray) {
            if (csvRecord == "")
                continue;
            String[] col = csvRecord.split(",");
            String spaceName = col[0];
            int count = Integer.parseInt(col[1]);
            retMap.put(spaceName, count);
        }
        return retMap;
    }

    protected static Map<String, Integer> getLastCsvMap() throws IOException {
        String lastMessageText = Slack.getLastMessageText(Const.SLACK_CHANNEL_ID_CSV);
        return csvStringToMap(lastMessageText);
    }

    private static String getSpaceName(WebDriver driver) {
        return driver.findElement(By.cssSelector("caption")).getText().replace(" 空き状況", "");
    }

    private static String getFromDateText(WebDriver driver) {
        return driver.findElement(By.cssSelector(".akitablelist tbody tr:nth-child(2) th:nth-child(2)")).getText().replaceAll("\n", "");
    }

    private static String getToDateText(WebDriver driver) {
        return driver.findElement(By.cssSelector(".akitablelist tbody tr:nth-child(2) th:nth-child(8)")).getText().replaceAll("\n", "");
    }

    private static int countFreeSpace(WebDriver driver) {
        int countAki = driver.findElements(By.cssSelector("img[alt='空き']")).size();
        int countZan = driver.findElements(By.cssSelector("td font[size='+2']")).size();
        return countAki + countZan;
    }

    private static String createMessage(String kanName, List<String> reportList) throws IOException {
        String ret;
        StringBuilder sb = new StringBuilder();
        sb.append("*" + kanName + "*\n");
        for (String reportText : reportList) {
            sb.append(reportText + "\n");
        }
        ret = sb.toString();
        return ret;
    }

    private static String getProjectPath() {
        String projectPath = "";
        if (OS.isMac()) {
            // ローカル開発用
            projectPath = "/workspace/Bitbucket/crw-booking-checker/";
        }
        if (OS.isLinux()) {
            projectPath = System.getenv("CIRCLE_WORKING_DIRECTORY") + "/";// CircleCI用
            //projectPath = "/builds/cacarrot/crw-booking/";// GitLab CI用
        }
        return projectPath;
    }

    private static void setChromeDriverPath() {
        String chromeDriverPath = "";
        if (OS.isMac()) {
            chromeDriverPath = getProjectPath() + "bin/mac64/chromedriver";
        }
        if (OS.isLinux()) {
            chromeDriverPath = getProjectPath() + "bin/linux64/chromedriver";
        }
        System.setProperty("webdriver.chrome.driver", chromeDriverPath);
    }

}
