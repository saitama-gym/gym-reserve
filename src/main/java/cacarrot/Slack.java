package cacarrot;

import com.eclipsesource.json.Json;
import com.eclipsesource.json.JsonObject;
import okhttp3.*;

import java.io.IOException;

public class Slack {

    public static void postMessage(String channelName, String icon_emoji, String text) throws IOException {
        OkHttpClient client = new OkHttpClient();

        MediaType MIMEType = MediaType.parse("application/json; charset=utf-8");

        String payload = "{'channel': '" + channelName + "', 'username': '" + Const.SLACK_USER_NAME + "', 'text': '" + text + "', 'icon_emoji': '" + icon_emoji + "'}";

        RequestBody requestBody = RequestBody.create(MIMEType, payload);

        Request request = new Request.Builder()
                .url(Const.SLACK_WEBHOOK_ENDPOINT)
                .post(requestBody)
                .build();

        client.newCall(request).execute();
    }

    public static String getLastMessageText(String channelId) throws IOException {
        String resStr = getLastMessageRaw(channelId);
        JsonObject resJson = Json.parse(resStr).asObject();
        JsonObject messageObj = null;
        if (resJson.get("messages") != null && resJson.get("messages").asArray().size() > 0) {
            return resJson.get("messages").asArray().get(0).asObject().get("text").asString();
        } else {
            return "";
        }
    }

    public static String getLastMessageRaw(String channelId) throws IOException {
        String ret = "";

        OkHttpClient client = new OkHttpClient();

        // https://slack.com/api/channels.history
        // ?token=xoxp-281997460647-280849825603-284350893794-013e44adf6d1ecc97b539188434623b7
        // &channel=C8BQDKE0H
        // &count=1
        // &pretty=1
        FormBody.Builder formBodyBuilder = new FormBody.Builder()
                .add("token", Const.SLACK_API_TOKEN)
                .add("channel", channelId)
                .add("count", "1")
                .add("pretty", "1");

        Request request = new Request.Builder()
                .url(Const.SLACK_API_ENDPOINT_CHANNELS_HISTORY)
                .post(formBodyBuilder.build())
                .build();

        Response response = client.newCall(request).execute();
        if (response.isSuccessful() && response.body() != null) {
            ret = response.body().string();
        }
        return ret;
    }

}
