
function errorMsg(msg, mode) {
	var gDebugStart = (new Date()).getTime();
	if ((msg != null) && (msg != "")) {
		switch (mode) {
			case 1:
			var brw = 0;
			if(navigator.appName=="Netscape"){
			  brw = 0;
			} else if(navigator.userAgent.indexOf("Gecko")!=-1){
			  brw = 0;
			} else if(navigator.userAgent.indexOf("Netscape6")!=-1){
			  brw = 0;
			} else if(navigator.appName=="Microsoft Internet Explorer"){
			  brw = 1;
			} else if(navigator.userAgent.indexOf("MSIE")!=-1){
			  brw = 1;
			}
			if (brw == 0) {
				window.open("pawfa1000.jsp?id=" + gDebugStart + "&m=" + msg, "window", "alwaysRaised=yes,status=no,width=720,height=480");
			} else {
				showModalDialog("pawfa1000.jsp?id=" + gDebugStart + "&m=" + msg, "window", "status:no;dialogWidth:720px;dialogHeight:480px");
			}
			break;
			case 0:
				var re = new RegExp("<br>","gi");
				var re2 = new RegExp("<br/>","gi");
				showAlert(msg.replace(re,"\n").replace(re2,"\n"));
			break;
		}
	}
}
