//package cacarrot;
//
//import org.junit.Ignore;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.junit.runners.JUnit4;
//
//import static org.hamcrest.CoreMatchers.is;
//import static org.junit.Assert.assertThat;
//
//@RunWith(JUnit4.class)
//public class SlackTest {
//
//    private static final String CHANNEL_ID_DEBUG = "C8CFDHPGD";// #debug https://zerogs.slack.com/messages/C8CFDHPGD/
//
//    @Ignore
//    @Test
//    public void postMessage() throws Exception {
//        Slack.postMessage("#debug", ":+1:", "<!channel> 空きが出ました。");
//    }
//
//    @Ignore
//    @Test
//    public void getLastMessageText() throws Exception {
//        // {
//        //    "ok": true,
//        //    "messages": [
//        //        {
//        //            "text": "\u6d66\u548c\u99d2\u5834\u4f53\u80b2\u9928\u7af6\u6280\u5834\u5168\u9762,0\n\u6d66\u548c\u99d2\u5834\u4f53\u80b2\u9928\u7af6\u6280\u5834\uff11\uff0f\uff12\u9762,0\n\u6d66\u548c\u99d2\u5834\u4f53\u80b2\u9928\u7b2c\uff12\u4f53\u80b2\u5ba4,0\n\u5927\u5bae\u4f53\u80b2\u9928\u30a2\u30ea\u30fc\u30ca\uff14\u5358\u4f4d,5\n\u4e0e\u91ce\u4f53\u80b2\u9928\u7af6\u6280\u5834\u5168\u9762,0\n\u4e0e\u91ce\u4f53\u80b2\u9928\u7af6\u6280\u5834\uff11\uff0f\uff12\u9762,0\n\u6d66\u548c\u897f\u4f53\u80b2\u9928\u7af6\u6280\u5834\u5168\u9762,1\n\u30b5\u30a4\u30c7\u30f3\u5316\u5b66\u30a2\u30ea\u30fc\u30ca\uff0f\u8a18\u5ff5\u7dcf\u5408\u30e1\u30a4\u30f3\u30a2\u30ea\u30fc\u30ca\uff21\u9762,0\n\u30b5\u30a4\u30c7\u30f3\u5316\u5b66\u30a2\u30ea\u30fc\u30ca\uff0f\u8a18\u5ff5\u7dcf\u5408\u30e1\u30a4\u30f3\u30a2\u30ea\u30fc\u30ca\uff22\u9762,0\n\u30b5\u30a4\u30c7\u30f3\u5316\u5b66\u30a2\u30ea\u30fc\u30ca\uff0f\u8a18\u5ff5\u7dcf\u5408\u30e1\u30a4\u30f3\u30a2\u30ea\u30fc\u30ca\uff23\u9762,0\n\u30b5\u30a4\u30c7\u30f3\u5316\u5b66\u30a2\u30ea\u30fc\u30ca\uff0f\u8a18\u5ff5\u7dcf\u5408\u30b5\u30d6\u30a2\u30ea\u30fc\u30ca\u5168\u9762,1\n\u30b5\u30a4\u30c7\u30f3\u5316\u5b66\u30a2\u30ea\u30fc\u30ca\uff0f\u8a18\u5ff5\u7dcf\u5408\u30b5\u30d6\u30a2\u30ea\u30fc\u30ca\uff11\uff0f\uff12\u9762,1\n\u4e09\u6a4b\u7dcf\u5408\u516c\u5712\u4f53\u80b2\u5ba4\uff21\u5168\u9762,0\n\u4e09\u6a4b\u7dcf\u5408\u516c\u5712\u4f53\u80b2\u5ba4\uff21\uff11\/\uff12,2\n\u5ca9\u69fb\u6587\u5316\u516c\u5712\u30e1\u30a4\u30f3\u30a2\u30ea\u30fc\u30ca\u5168\u9762,0\n\u5ca9\u69fb\u6587\u5316\u516c\u5712\u30e1\u30a4\u30f3\u30a2\u30ea\u30fc\u30ca\uff11\uff0f\uff12\u9762,3\n",
//        //            "username": "\u4f53\u80b2\u9928\u4e88\u7d04\u7a7a\u304d\u72b6\u6cc1",
//        //            "bot_id": "B89204P1B",
//        //            "icons": {
//        //                "emoji": ":basketball:",
//        //                "image_64": "https:\/\/a.slack-edge.com\/f5d6f\/img\/emoji_2016_06_08\/apple\/1f3c0.png"
//        //            },
//        //            "type": "message",
//        //            "subtype": "bot_message",
//        //            "ts": "1512891092.000032"
//        //        }
//        //    ],
//        //    "has_more": false
//        // }
//        String ret = Slack.getLastMessageText(CHANNEL_ID_DEBUG);
//        System.out.println("【" + ret + "】");
//    }
//
//    @Ignore
//    @Test
//    public void getLastMessageText_異常系_メッセージ0件() throws Exception {
//        // {
//        //    "ok": true,
//        //    "messages": [],
//        //    "has_more": false
//        // }
//        String ret = Slack.getLastMessageText(CHANNEL_ID_DEBUG);
//        assertThat(ret, is(""));
//    }
//
//    @Ignore
//    @Test
//    public void getLastMessageRaw() throws Exception {
//        String ret = Slack.getLastMessageRaw(CHANNEL_ID_DEBUG);
//        System.out.println("【" + ret + "】");
//    }
//
//}
