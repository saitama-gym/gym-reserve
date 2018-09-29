package cacarrot;

import com.amazonaws.services.lambda.runtime.Context;

import java.io.IOException;

/**
 * cacarrot.Lambda::crwHandler
 */
public class Lambda {

    public String crwHandler(Object input, Context context) {
        String output = "OK";
        try {
            App.execute(Browser.htmlunit.driverName());
        } catch (IOException e) {
            e.printStackTrace();
            output = "ERROR";
        }
        return output;
    }

}