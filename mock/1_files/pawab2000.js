
function submitLogin(obj, action) {

	replaceStr = new Array();

	if (obj.userId.value == "") {
		showAlert(obj.e410000.value);
		obj.userId.focus();
		return;
	}

	if (obj.password.value == "") {
		showAlert(obj.e410010.value);
		obj.password.focus();
		return;
	}

	if (chkHanNum(obj.userId.value) == false) {
		showAlert(obj.e410320.value);
		obj.userId.value = "";
		obj.userId.focus();
		return;
	}


	if ( 1 == usersetpass ) {
		if (obj.password.value.length < userpassmin) {
			replaceStr[0] = userpassmin;
			showAlert(replaceErrMsg(obj.e520760.value,replaceStr));
			obj.password.focus();
			return;
		}
		if (obj.password.value.length > userpassmax) {
			replaceStr[0] = userpassmax;
			showAlert(replaceErrMsg(obj.e520770.value,replaceStr));
			obj.password.focus();
			return;
		}
		if(!checkText(obj.password, userpassmax, obj.e520790.value, 5)) {
			obj.password.focus();
			return;
		}
	} else
	if ( 2 == usersetpass ) {

		if (obj.password.value.length < userpassmin) {
			replaceStr[0] = userpassmin;
			showAlert(replaceErrMsg(obj.e520760.value,replaceStr));
			obj.password.focus();
			return;
		}
		if (obj.password.value.length > userpassmax) {
			replaceStr[0] = userpassmax;
			showAlert(replaceErrMsg(obj.e520770.value,replaceStr));
			obj.password.focus();
			return;
		}

		if(!checkText(obj.password, userpassmax, obj.e520800.value, 4)) {
			obj.password.focus();
			return;
		}

		str = obj.password.value;
		if ( str.match(/.*[0-9].*/) && str.match(/.*[a-zA-Z].*/) ) {
			;
		} else {
			showAlert(obj.e520780.value);
			obj.password.focus();
			return;
		}
	}
	if ( 3 == usersetpass ) {
		if (obj.password.value.length < userpassmin) {
			replaceStr[0] = userpassmin;
			showAlert(replaceErrMsg(obj.e520760.value,replaceStr));
			obj.password.focus();
			return;
		}
		if (obj.password.value.length > userpassmax) {
			replaceStr[0] = userpassmax;
			showAlert(replaceErrMsg(obj.e520770.value,replaceStr));
			obj.password.focus();
			return;
		}

		if(!checkText(obj.password, userpassmax, obj.e520800.value, 4)) {
			obj.password.focus();
			return;
		}
	}
	var in_userid = obj.userId.value;
	if (in_userid.length < useridmax) {
		in_userid = ("00000000"+in_userid).slice(useridmax*-1);
		obj.userId.value = in_userid;
	}

	doAction(obj, action)
}

var inputName = new Array('id', 'PASSWORD');
var tenkeyMax = 8;

function tenkeyPush(obj,num) {

	var name = 0;
	var text;
	var id = 0;
	var maxLength = tenkeyMax;

	if (obj.fcflg.value==1){
		name=1;
		id = 1;
		maxLength = userpassmax;
	}

	text = obj.elements[name].value;
	if (text.length >= maxLength) {
		return;
	}
	obj.elements[name].value = text + num;

}

function prevkey(obj) {
	var name = 0;
	var text;
	var tlength;
	if (obj.fcflg.value==1){
		name=1;
	}
	text = obj.elements[name].value;
	tlength = text.length;
	if (tlength > 0){
		obj.elements[name].value = text.substr(0,tlength-1);
	}
}
function resetform(obj) {
	obj.reset();

}
function pw(obj) {
	obj.fcflg.value="1";
}
function fid(obj) {
	obj.fcflg.value="0";
}
function nextfocus(obj) {
	var text;
	var tlength;
	if (obj.fcflg.value==1){
		obj.fcflg.value=0;
		obj.elements[0].focus();
		obj.elements[0].value = obj.elements[0].value;
	} else {
		name=inputName[1];
		obj.fcflg.value=1;
		obj.elements[1].focus();
		obj.elements[1].value = obj.elements[1].value;
	}

}

function mm_openbrwindow(theurl,winname,features) {
	window.open(theurl,winname,features);
}

function getSeltextLength(obj) {
	if (document.selection) {
		return document.selection.createRange().text.length;
	} else {
		return obj.selectionEnd - obj.selectionStart;
	}
}

function autofocus(e) {
	var name = 0;
	var nextname = 1;
	var text;
	var obj = document.form1;

	if (obj.fcflg.value == 0) {
		if (getSeltextLength(obj.elements[name]) > 0) {
			return;
		}
		text = obj.elements[name].value;
		if (text.length >= useridmax) {
			obj.fcflg.value = nextname;
			obj.elements[nextname].focus();
			obj.elements[nextname].value = obj.elements[nextname].value;
		}
	}
}
window.document.onkeyup=autofocus;

function selectfocus(obj,i) {

	if ( 1 == i ) {
		obj.userId.focus();
	} else if (2 == i) {
		obj.password.focus();
	}
}

function sendActionClassName(obj, action, actionClassName) {
	obj.actionClassName.value = actionClassName;

	doAction(obj, action);
}

function canLogin(obj, action) {
	if (gVacantFg == '2') {
		if(!showConfirm(obj.e412070.value)) {
			return;
		}
	}
	obj.vacantFg.value = '2';
	doAction(obj, action);
}

function resetUserID(obj) {

	obj.userId.value = "";

}
function sendNewsInfo(index) {
	if (_dom == 3) {
		document.layers['disp'].document.form1.wmsgIndex.value = index;
		document.layers['disp'].document.form1.selIkbn.value = '';
	} else {
		document.form1.wmsgIndex.value = index;
		document.form1.selIkbn.value = '';
	}
	doAction(((_dom == 3) ? document.layers['disp'].document.form1 : document.form1 ), gRsvPawab4000DispAction);
}

function doMsgAction(obj, action, ikbn) {
	obj.selIkbn.value = ikbn;
	doAction(obj, action);
}
function clickBenner(obj, action, url, number) {
	window.open(url);
	obj.selectBennerNo.value = number;
	doAction(obj, action);
}
