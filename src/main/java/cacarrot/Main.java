package cacarrot;

import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        System.out.println("START!!");
        try {
            App.execute(Browser.htmlunit.driverName());
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("ERROR!!");
        }
        System.out.println("SUCCESS!!");
    }
}
