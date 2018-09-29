package cacarrot;

public enum Browser {
    htmlunit("htmlunit"),
    chrome("chrome"),
    chrome_headless("chrome_headless");

    private String driverName;

    Browser(String driverName) {
        this.driverName = driverName;
    }

    public String driverName() {
        return driverName;
    }
}
