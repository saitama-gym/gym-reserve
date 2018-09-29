package cacarrot;

public class Const {

    public static final String URL_SITE_TOP = "https://saitama.rsv.ws-scs.jp/web/";

    public static final String SLACK_WEBHOOK_ENDPOINT = "https://hooks.slack.com/services/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";
    public static final String SLACK_USER_NAME = "体育館予約空き状況";
    public static final String SLACK_TO_DISPLAY_ALL = "#crw-booking-trace";// TODO changeme
    public static final String SLACK_TO_DISPLAY_DIFF = "#crw-booking-diff";// TODO changeme
    public static final String SLACK_TO_CSV = "#crw-booking-csv";// TODO changeme

    public static final String SLACK_CHANNEL_ID_CSV = "CCH4SPBBL";// https://saitama-gym.slack.com/messages/CCH4SPBBL/
    public static final String SLACK_API_TOKEN = "xoxb-426200433623-442263328167-8qxeDX8Wje3UVuxuNYv8neuq";
    public static final String SLACK_API_ENDPOINT_CHANNELS_HISTORY = "https://slack.com/api/channels.history";

    public static final String SLACK_EMOJI_BASKETBALL = ":basketball:";
    public static final String SLACK_EMOJI_OK = ":basketball:";//ok_woman//sunny/o
    public static final String SLACK_EMOJI_NG = ":rain_cloud:";//x
    public static final String SLACK_EMOJI_NEW = ":+1:";
    public static final String SLACK_EMOJI_STAY = ":cloud:";

    public static final String[] TARGET_KAN_ARRAY = {"浦和駒場体育館", "大宮体育館", "与野体育館", "浦和西体育館", "サイデン化学アリーナ／記念総合", "三橋総合公園"};

    public static final int MAX_PAGE = 5;//翌週ボタン押下で何ページ目までチェックするか

}
