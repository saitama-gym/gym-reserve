
var clicked=false
var gErrMsg = 'e110990';
var gTimerId = 0;
var _dom = 0;
function showAlert(msg){
	if (msg != '') {
		alert(msg);
	}
}
function showComplete(msg){
	if (msg != '') {
		alert(msg);
	}
}
function showConfirm(msg){
	if (msg != '') {
		if(!confirm(msg)){
			return false;
		}
	}
	return true;
}
function checkText(obj, len, msg, type){
	var msg;
	if (len > 0) {
		if (chkBytes(obj, msg, len) != true) {
			return false;
		}
	}
	if (type == 1) {
		if (chkZenField(obj, msg) != true) {
			return false;
		}
	} else if (type == 2) {
		if (chkKanaField(obj, msg) != true) {
			return false;
		}
	} else if (type == 3) {
		if (chkHanField(obj, msg) != true) {
			return false;
		}
	} else if (type == 4) {
		if (chkHanAlpNum(obj, msg) != true) {
			return false;
		}
	} else if (type == 5) {
		if (chkNumField(obj, msg, 0) != true) {
			return false;
		}
	} else if (type == 6) {
		if (chkNumField(obj, msg, 1) != true) {
			return false;
		}
	} else if (type == 7) {
		if (chkHanNumZero(obj, msg) != true) {
			return false;
		}
	} else if (type == 8) {
		if (chkNumField(obj, msg, 0) != true) {
			return false;
		}
		if (chkUserID(obj, msg) != true) {
			return false;
		}
	}
	return true;
}
function chkSelNengetsu(objY, objM, objD, msg) {
	var days;
	yyyy = objY.value;
	mm = objM.value;
	dd = objD.value;
	if (yyyy == '') {
		showAlert(msg);
		objY.focus();
		return false;
	}
	if (!chkHanNum(yyyy) ||
		eval(yyyy) < 1000 || eval(yyyy) > 9999) {
		showAlert(msg);
		objY.focus();
		return false;
	}
	if (mm == '') {
		showAlert(msg);
		objM.focus();
		return false;
	}
	if (!chkHanNum(mm) ||
		eval(mm) < 1 || eval(mm) > 12) {
		showAlert(msg);
		objM.focus();
		return false;
	}
	if (dd == '') {
		showAlert(msg);
		objD.focus();
		return false;
	}
	days = getDays(eval(yyyy), eval(mm));
	if (!chkHanNum(dd) ||
		eval(dd) < 1 || eval(dd) > days) {
		showAlert(msg);
		objD.focus();
		return false;
	}
	return true;
}
function chkNengetsuHani(objY1,objM1,objD1,objY2,objM2,objD2,msg) {
	var sdate;
	var edate;
	var y1;
	var m1;
	var d1;
	var y2;
	var m2;
	var d2;
	y1 = objY1.value;
	m1 = objM1.value;
	d1 = objD1.value;
	y2 = objY2.value;
	m2 = objM2.value;
	d2 = objD2.value;
	sdate = joinDate(y1, m1, d1);
	edate = joinDate(y2, m2, d2);
	if (sdate > edate) {
		showAlert(msg);
		objY1.focus();
		return false;
	}
	return true;
}
function chkHHMMField(obj,msg) {
	var inp;
	inp = obj.value;
	if (inp == '') {
		return true;
	}
	if (!chkHHMM(inp)) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function chkSelHHMM(objHH,objMM,msg) {
	var st1;
	var st2;
	st1 = getSelectValue(objHH);
	st2 = getSelectValue(objMM);
	if(st1.length == 1){
		st1 = "0" + st1;
	}
	if(st2.length == 1){
		st2 = "0" + st2;
	}
	if(Number(st1 > 24) || Number(st2 > 59)){
		showAlert(msg);
		return false;
	}
	if(Number(st1 > 23) && Number(st2 > 0)) {
		showAlert(msg);
		return false;
	}
	return true;
}
function chkMail(obj,msg) {
	var str;
	var check;
	str = obj.value;
	if (str == '') {
		return true;
	}
	check = /.+@.+\..+/;
	if (!str.match(check)) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	if ( -1 != str.indexOf(";") ) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function chkHissuField(obj, msg) {
	if (obj.value == '') {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function chkBytes(obj, msg, leng) {
	if (getBytes(obj.value) > leng) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function chkKana(str) {
	var i;
	var chr;
	if ( -1 == navigator.userAgent.indexOf("Opera") ) {
		var okChar = "（）－０１２３４５６７８９・";
		var kana1 = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
		var kana2 = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
		var kana3 = "ャュョァィゥェォッ";
		for (i=0; i<str.length; i++) {
			chr = str.charAt(i);
			if (chr == '　' || chr == 'ー') {
				continue;
			}
			if (okChar.indexOf(chr) >= 0) {
				continue;
			}
			if ((kana1.indexOf(chr,0) >= 0) ||
				(kana2.indexOf(chr,0) >= 0) ||
				(kana3.indexOf(chr,0) >= 0)) {
				continue;
			} else {
				return false;
			}
		}
	} else {
		var okChar = "%uFF08%uFF09%uFF0D%uFF10%uFF11%uFF12%uFF13%uFF14%uFF15%uFF16%uFF17%uFF18%uFF19%u30FB";
		var kana1 = "%u30A2%u30A4%u30A6%u30A8%u30AA%u30AB%u30AD%u30AF%u30B1%u30B3%u30B5%u30B7%u30B9%u30BB%u30BD%u30BF%u30C1%u30C4%u30C6%u30C8%u30CA%u30CB%u30CC%u30CD%u30CE%u30CF%u30D2%u30D5%u30D8%u30DB%u30DE%u30DF%u30E0%u30E1%u30E2%u30E4%u30E6%u30E8%u30E9%u30EA%u30EB%u30EC%u30ED%u30EF%u30F2%u30F3";
		var kana2 = "%u30AC%u30AE%u30B0%u30B2%u30B4%u30B6%u30B8%u30BA%u30BC%u30BE%u30C0%u30C2%u30C5%u30C7%u30C9%u30D0%u30D3%u30D6%u30D9%u30DC%u30D1%u30D4%u30D7%u30DA%u30DD";
		var kana3 = "%u30E3%u30E5%u30E7%u30A1%u30A3%u30A5%u30A7%u30A9%u30C3";
		var ok1   = "%u3000";
		var ok2   = "%u30FC";
		for (i=0; i<str.length; i++) {
			chr = str.charAt(i);
			if (chr == unescape(ok1) || chr == unescape(ok2)) {
				continue;
			}
			if (unescape(okChar).indexOf(chr) >= 0) {
				continue;
			}
			if ((unescape(kana1).indexOf(chr,0) >= 0) ||
				(unescape(kana2).indexOf(chr,0) >= 0) ||
				(unescape(kana3).indexOf(chr,0) >= 0)) {
				continue;
			} else {
				return false;
			}
		}
	}
	return true;
}
function chkKanaField(obj, msg) {
	var inp;
	inp = obj.value;
	if (inp == '') {
		return true;
	}
	if (!chkKana(inp)) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function chkHanNum(str) {
	var i;
	for (i=0; i<str.length; i++) {
		chr = str.charAt(i);
		if (chr < '0' || chr > '9') {
			return false;
		}
	}
	return true;
}
function chkHanNumMinus(str) {
	var i;
	for (i=0; i<str.length; i++) {
		chr = str.charAt(i);
		if (chr == '-') {
			if (i > 0) {
				return false;
			}
		}
		else if (chr < '0' || chr > '9') {
			return false;
		}
	}
	return true;
}
function chkHanNumPlusMinus(str) {
	var i;
	for (i=0; i<str.length; i++) {
		chr = str.charAt(i);
		if (chr == '+' || chr == '-') {
			if (i > 0) {
				return false;
			}
		}
		else if (chr < '0' || chr > '9') {
			return false;
		}
	}
	return true;
}
function chkNumField(obj, msg, flag) {
	var ret;
	if (flag == 1) {
		ret = chkHanNumMinus(obj.value);
	}
	else {
		ret = chkHanNum(obj.value);
	}
	if (!ret) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function chkHanNumZero(obj, msg) {
	var str;
	var chr;
	var i;
	str = obj.value;
	for (i=0; i<str.length; i++) {
		chr = str.charAt(i);
		if (chr < '0' || chr > '9') {
			showAlert(msg);
			obj.focus();
			obj.select();
			return false;
		}
	}
	if (eval(str) <= 0) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function chkHanNumHani(obj, svalue, evalue, msg) {
	var str;
	var ret;
	var i;
	str = obj.value;
	ret = chkHanNumMinus(str);
	if (ret != true) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	if (eval(str) < svalue || eval(str) > evalue) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function isUruu(year) {
	if (year%4 == 0 && year%100 != 0 || year%400 == 0) {
		return true;
	}
	return false;
}
function getSelectValue(sel) {
	return(sel[sel.selectedIndex].value);
}
function getDays(year,month) {
	var days = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var ret;
	ret = days[month-1];
	if (month == 2 && isUruu(year)) {
		ret ++;
	}
	return(ret);
}
function chgDay(selY, selM, selD) {
	var selYear;
	var selMonth;
	var selDay;
	var days;
	var opt;
	var i;
	selYear = eval(getSelectValue(selY));
	selMonth = eval(getSelectValue(selM));
	selDay = eval(getSelectValue(selD));
	days = getDays(selYear,selMonth);
	opt = selD.options;
	opt.length = 0;
	for (i=1; i<=days; i++) {
		opt[opt.length] = new Option(i, i, false, false);
	}
	opt.length = days;
	if (opt.length >= selDay) {
		opt[selDay-1].selected = true;
	} else {
		opt[0].selected = true;
	}
}
function searchIndex(elem, arr) {
	var i;
	for (i=0; i<arr.length; i++) {
		if (arr[i] == elem) {
			return(i);
		}
	}
	return(-1);
}
function setSelectValue(sel, val) {
	sel.selectedIndex = searchOptValue(val, sel.options);
}
function chgSTime(selST, selET, timeArr, textArr) {
	var selSTime;
	var selETime;
	var opt;
	var times = new Array();
	var texts = new Array();
	var etime;
	var etext;
	var i;
	var j = 0;
	var idx;
	selSTime = eval(getSelectValue(selST));
	selETime = eval(getSelectValue(selET));
	for (i=0; i<timeArr.length; i++) {
		etime = timeArr[i];
		etext = textArr[i];
		if (selSTime < etime) {
			times[j] = etime;
			texts[j] = etext;
			j++;
		}
	}
	opt = selET.options;
	opt.length = 0;
	for (i=1; i<=times.length; i++)	{
		opt[opt.length] = new Option(texts[i-1], times[i-1], false, false);
	}
	opt.length = times.length;
	if (opt[0].value > selETime) {
		opt[0].selected = true;
	} else {
		idx =searchIndex(selETime,times);
		opt[idx].selected = true;
	}
}
function checkSelect(sel, msg) {
	if (sel.selectedIndex < 0) {
		showAlert(msg);
		sel.focus();
		return false;
	}
	return true;
}
function checkRadio(rad, msg) {
	var chkcnt = 0;
	var i = 0;
	if (rad == null) {
		return false;
	}
	if (rad.length > 0) {
		for (i = 0; i < rad.length; i++) {
			if (rad[i].checked == true) {
				chkcnt++;
			}
		}
	} else {
		if (rad.checked == true) {
			chkcnt++;
		}
	}
	if (chkcnt == 0) {
		showAlert(msg);
		return false;
	}
	return true;
}
function checkChkBox(chkbox, msg) {
	if (chkbox.checked != true) {
		showAlert(msg);
		return false;
	}
	return true;
}
function checkMinus(val,msg) {
	val = val.replace(/,/g, "");
	if (eval(val) < 0) {
		showAlert(msg);
		return false;
	}
	return true;
}
function chkNengetsu(textY,textM,textD,msg,flag) {
	var days;
	if (textY.value == '') {
		if (flag == 1) {
			showAlert(msg);
			textY.focus();
			return false;
		}
	}
	if (!chkHanNum(textY.value) ||
		eval(textY.value) < 1000 || eval(textY.value) > 9999) {
		showAlert(msg);
		textY.focus();
		textY.select();
		return false;
	}
	if (textM.value == '') {
		if (flag == 1) {
			showAlert(msg);
			textM.focus();
			return false;
		}
	}
	if (!chkHanNum(textM.value) ||
		eval(textM.value) < 1 || eval(textM.value) > 12) {
		showAlert(msg);
		textM.focus();
		textM.select();
		return false;
	}
	if (textD.value == '') {
		if (flag == 1) {
			showAlert(msg);
			textD.focus();
			return false;
		}
	}
	days = getDays(eval(textY.value), eval(textM.value));
	if (!chkHanNum(textD.value) ||
		eval(textD.value) < 1 || eval(textD.value) > days) {
		showAlert(msg);
		textD.focus();
		textD.select();
		return false;
	}
	return true;
}
function checkNavigator(osArr,brArr,verArr,msg) {
	var br;
	var agent;
	var ver;
	var wkver;
	var flag;
	var i;
	var n;
	br = navigator.appName;
	agent = navigator.userAgent;
	flag = 0;
	for (i=0; i < osArr.length; i++) {
		if (agent.indexOf(osArr[i]) >= 0) {
			flag = 1;
			break;
		}
	}
	if (flag == 0) {
		showAlert(msg);
		return false;
	}
	wkver = "";
	if (br == "Microsoft Internet Explorer") {
		wkver = agent.substr(agent.indexOf("MSIE") + 5);
	} else if (br == "Netscape") {
		if (agent.indexOf("Netscape6") != -1) {
			wkver = agent.substr(agent.indexOf("Netscape6") + 10);
		} else if(agent.indexOf("Netscape/7") != -1) {
			wkver = agent.substr(agent.indexOf("Netscape/") + 9);
		} else if(agent.indexOf("Opera") != -1) {
			wkver = agent.substr(agent.indexOf("Opera") + 6);
			br = "Opera";
		} else if ((agent.indexOf("rv:") != -1) &&
					 (agent.indexOf("Netscape") == -1)) {
			wkver = agent.substr(agent.indexOf("rv:") + 3);
			br = "Mozilla";
		}
		if(parseFloat(agent.charAt(8)) < 5) {
			wkver = agent.substr(8);
		}
	} else if (br == "Opera") {
		wkver = agent.substr(agent.indexOf("Opera") + 6);
	}
	if (wkver == "") {
		showAlert(msg);
		return false;
	}
	n = 0;
	ver = "";
	while (wkver.charAt(n).match(/\d|\.|b/)) {
		n += 1;
		ver = wkver.substr(0, n);
	}
	flag = 0;
	for (i=0; i < brArr.length; i++) {
		if ((br == brArr[i]) &&
			(parseFloat(ver) >= parseFloat(verArr[i]))) {
			flag = 1;
			break;
		}
	}
	if (flag == 0) {
		showAlert(msg);
		return false;
	}
	return true;
}
function chkUserID(obj, msg) {
	if (eval(obj.value) > 2100000000) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function getDiffDays(y1, m1, d1, y2, m2, d2) {
	var utc1;
	var utc2;
	utc1 = Date.UTC(y1, m1-1, d1, 0, 0, 0);
	utc2 = Date.UTC(y2, m2-1, d2, 0, 0, 0);
	return((utc2-utc1) / (24*60*60*1000));
}
function getDayAfterDay(y, m, d, after) {
	var utc;
	var myDate;
	var y2;
	var m2;
	var d2;
	utc = Date.UTC(y, m-1, d, 0, 0, 0);
	utc += after*24*60*60*1000;
	myDate = new Date();
	myDate.setTime(utc);
	y2 = myDate.getFullYear();
	m2 = myDate.getMonth() + 1;
	d2 = myDate.getDate();
	return(y2*10000 + m2*100 + d2);
}
function setSelectValueNear(sel, val, mode) {
	var opt = sel.options;
	var i;
	var idx;
	idx = -1;
	for (i=0; i<opt.length; i++) {
		if (eval(opt[i].value) == eval(val)) {
			idx = i;
			break;
		}
		if (eval(opt[i].value) > eval(val)) {
			if (mode == 1) {
				idx = ((i > 0) ? (i-1) : 0);
			}
			else {
				idx = i;
			}
			break;
		}
	}
	if (idx < 0) {
		idx = opt.length-1;
	}
	sel.selectedIndex = idx;
}
function setSelectTimeNear(sel, time, mode) {
	var opt = sel.options;
	var i;
	var idx;
	idx = -1;
	for (i=0; i<opt.length; i++) {
		tm = getTimeValue(opt[i].text);
		if (tm == time) {
			idx = i;
			break;
		}
		if (tm > time) {
			if (mode == 1) {
				idx = ((i > 0) ? (i-1) : 0);
			}
			else {
				idx = i;
			}
			break;
		}
	}
	if (idx < 0) {
		idx = opt.length-1;
	}
	sel.selectedIndex = idx;
}
function showStatus(msg){
	if (msg != '') {
		status = msg;
	}
}
function getIntArray(init) {
	var arr, leng, initArr;
	initArr = init.split(',');
	leng = initArr.length;
	arr = new Array(leng);
	for (i=0; i<leng; i++) {
		arr[i] = parseInt(initArr[i], 10);
	}
	return(arr);
}
function res(frm) {
	frm.reset();
}
function sub(frm, chk, mode) {
	if (chk == 1) {
		if (!chkSubmit(mode)) {
			return;
		}
	}
	if (mode != 0) {
		frm.MODE.value = mode;
	}
	frm.submit();
}
function chkNumLeng(obj, leng, msg) {
	var inp;
	inp = obj.value;
	if (inp.length != leng) {
		showAlert(msg);
		obj.focus();
		obj.select();
		return false;
	}
	return true;
}
function isHankaku(chr) {
	var han = " -^\\@[;:],./!\"#$%&'()=~|`{+*}･<>?_";
	var kana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝﾞﾟｬｭｮｧｨｩｪｫ";
	if ("0"<=chr && chr<="9" ||
		"a"<=chr && chr<="z" ||
		"A"<=chr && chr<="Z" ||
		kana.indexOf(chr,0)>=0 ||
		han.indexOf(chr,0)>=0) {
		return true;
	}
	return false;
}
function getBytes(str) {
	var leng, i, chr;
	leng = 0;
	for (i=0; i<str.length; i++) {
		chr = str.charAt(i);
		if (isHankaku(chr)) {
			leng ++;
		}
		else {
			leng += 2;
		}
	}
	return leng;
}
function chkHanField(obj, msg) {
	var str, chr, i;
	var han = " -^\\@[;:],./!\"#$%&()=~|`{+*}<>?_";
	var kana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝﾞﾟｬｭｮｧｨｩｪｫ";
	str = obj.value;
	for (i=0; i<str.length; i++) {
		chr = str.charAt(i);
		if (isHankaku(chr) != true) {
			showAlert(msg);
			obj.focus();
			obj.select();
			return false;
		}
	}
	return true;
}
function chkZenField(obj, msg) {
	var str, chr, i;
	var han = " -^\\@[;:],./!\"#$%&'()=~|`{+*}<>?_";
	var kana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝﾞﾟｬｭｮｧｨｩｪｫ";
	str = obj.value;
	for (i=0; i<str.length; i++) {
		chr = str.charAt(i);
		if (isHankaku(chr) == true) {
			showAlert(msg);
			obj.focus();
			obj.select();
			return false;
		}
	}
	return true;
}
function chkHanAlpNum(obj, msg) {
	var str, chr, i;
	str = obj.value;
	for (i=0; i<str.length; i++) {
		chr = str.charAt(i);
		if ("0"<=chr && chr<="9" ||
			"a"<=chr && chr<="z" ||
			"A"<=chr && chr<="Z") {
		} else {
			showAlert(msg);
			obj.focus();
			obj.select();
			return false;
		}
	}
	return true;
}
function chkHHMM(str) {
	var hhmm;
	var hh;
	var mm;
	if (!chkHanNum(str)) {
		return false;
	}
	hhmm = eval(str);
	if (hhmm == 2400) {
		return true;
	}
	hh = Math.floor(hhmm / 100);
	mm = hhmm % 100;
	if (hh >= 24) {
		return false;
	}
	if (mm >= 60) {
		return false;
	}
	return true;
}
function searchOptValue(val, opt) {
	var i;
	for (i=0; i<opt.length; i++) {
		if (opt[i].value == val) {
			return(i);
		}
	}
	return(-1);
}
function searchIdx(val, arr) {
	var i;
	for (i=0; i<arr.length; i++) {
		if (arr[i] == val) {
			return(i);
		}
	}
	return(-1);
}
function setRadioValue(radio, val) {
	var i;
	for (i=0; i<radio.length; i++) {
		if (radio[i].value == val) {
			radio[i].checked = true;
			return;
		}
	}
}
function searchRadioValue(rad) {
	var i;
	if (rad.length == undefined) {
		return (0);
	} else {
		for (i=0; i<rad.length; i++) {
			if (rad[i].checked == true) {
				return(i);
			}
		}
	}
	return(-1);
}
function getTimeStr(hhmm) {
	var str = '0000' + hhmm;
	var str2 = str.substr(str.length-4, 4);
	return(str2.substr(0,2) + ':' + str2.substr(2,2));
}
function getTimeValue(str) {
	var hh = str.substr(0, 2);
	var mm = str.substr(3, 2);
	return(eval(hh)*100 + eval(mm));
}
function sortNumber(a, b) {
	var numA = eval(a);
	var numB = eval(b);
	return(numA - numB);
}
function joinDate(year, month, day) {
	var date;
	year = ""+ year;
	month = "" + month;
	day = "" + day;
	date = year + ((month.length == 1) ? ("0" + month) : month) + ((day.length == 1) ? ("0" + day) : day);
	return date;
}
function joinDateMMDD(month, day) {
	var date;
	month = "" + month;
	day = "" + day;
	date = ((month.length == 1) ? ("0" + month) : month) + ((day.length == 1) ? ("0" + day) : day);
	return date;
}
function splitDate(ymd) {
	var ymdArr = new Array(3);
	ymdArr[0] = Math.floor(ymd / 10000);
	ymdArr[1] = Math.floor((ymd % 10000) / 100);
	ymdArr[2] = ymd % 100;
	return(ymdArr);
}
function checkAll(form, name) {
	var flag;
	var check;
	var i;
	flag = 0;
	if ( false == isValidObj(form.elements[name]) ) {
		return;
	}
	if ( undefined == form.elements[name].length ) {
		if ( true == form.elements[name].checked ) {
			form.elements[name].checked = false;
		} else {
			form.elements[name].checked = true;
		}
	} else {
		for ( i = 0 ;  i < form.elements[name].length ; i++ ) {
			if ( false == form.elements[name][i].checked ) {
				flag = 1;
				break;
			}
		}
		if ( 1 == flag ) {
			check = true;
		} else {
			check = false;
		}
		for ( i = 0 ; i < form.elements[name].length ; i++ ) {
			form.elements[name][i].checked = check;
		}
	}
}
function getSelectText(sel) {
	return(sel[sel.selectedIndex].text);
}
function chgSelKan(kanObj,shiObj,shiCode,shiName,kanCode,no) {
	var selKan;
	var opt;
	var optNo;
	var i;
	selKan = getSelectValue(kanObj);
	opt = shiObj.options;
	optNo = no;
	for (i=0; i<shiCode.length; i++) {
		if (kanCode[i] != selKan) {
			continue;
		}
		opt[optNo] = new Option(shiName[i], shiCode[i], false, false);
		optNo++;
	}
	if (optNo == 0) {
		opt[0] = new Option("　　", "", false, false);
		optNo = 1;
	}
	opt.length = optNo;
}
function inSyubetsu(shiIdx,syu,syuCode) {
	var syuAll, syuSrch;
	syuAll = ',' + syuCode[shiIdx] + ',';
	syuSrch = ',' + syu + ',';
	return (syuAll.indexOf(syuSrch,0) >= 0);
}
function chgSelShiE(kanObj,shiObj,setObj,
						setCode,setName,kanCode,shiCode,no) {
	var selShi;
	var selKan;
	var opt;
	var optNo;
	var wsetCode;
	var wsetName;
	var i;
	var j;
	var jj;
	wsetCode = new Array();
	wsetName = new Array();
	selShi = getSelectValue(shiObj);
	selKan = getSelectValue(kanObj);
	jj=0;
	for (i=0; i<setCode.length; i++)	{
		if ("" != selShi &&
			shiCode[i] != selShi) {
			continue;
		}
		if (kanCode[i] != selKan) {
			continue;
		}
		for (j=0; j<wsetCode.length; j++) {
			if (wsetCode[j] == setCode[i]) {
				break;
			}
		}
		if (j>=wsetCode.length) {
			wsetCode[jj] = setCode[i];
			wsetName[jj] = setName[i];
			jj++;
		}
	}
	opt = setObj.options;
	optNo = no;
	for (i=0; i<wsetCode.length; i++) {
		opt[optNo] = new Option(wsetName[i], wsetCode[i], false, false);
		optNo ++;
	}
	if (optNo == 0) {
		opt[0] = new Option("　　", "", false, false);
		optNo = 1;
	}
	opt.length = optNo;
}
function getRadioValue(rad) {
	var i;
	for (i=0; i<rad.length; i++) {
		if (rad[i].checked == true) {
			return(rad[i].value);
		}
	}
}
function chkSelTsukihi(objM, objD, msg) {
	var days = new Array(31,29,31,30,31,30,31,31,30,31,30,31);
	var ret;
	mm = objM.value;
	dd = objD.value;
	if (mm == '') {
		showAlert(msg);
		objM.focus();
		return false;
	}
	if (!chkHanNum(mm) ||
		eval(mm) < 1 || eval(mm) > 12) {
		showAlert(msg);
		objM.focus();
		return false;
	}
	if (dd == '') {
		showAlert(msg);
		objD.focus();
		return false;
	}
	if (!chkHanNum(dd) ||
		eval(dd) < 1 || eval(dd) > days[mm-1]) {
		showAlert(msg);
		objD.focus();
		return false;
	}
	return true;
}
function chkAddressObject(address1, address2, address3, text) {
	if (address1.value == '' && address2.value == '') {
		return true;
	}
	if (address1.value.length == 0) {
		showAlert(text);
		address1.focus();
		address1.select();
		return false;
	}
	if (address2.value.length == 0) {
		showAlert(text);
		address2.focus();
		address2.select();
		return false;
	}
	return true;
}
function chkFinancialCodeObject(finance1, finance2, text) {
	if (finance1.value == '' && finance2.value == '') {
		showAlert(text);
		finance1.focus();
		finance1.select();
		return false;
	}
	if (finance1.value.length != 5) {
		showAlert(text);
		finance1.focus();
		finance1.select();
		return false;
	}
	if (finance2.value.length != 3) {
		showAlert(text);
		finance2.focus();
		finance2.select();
		return false;
	}
	return true;
}
function chkPhoneNoObject(phone1, phone2, phone3, flg1, flg2, text) {
	if (flg1 == '1' && phone1.value == '') {
		showAlert(text);
		phone1.focus();
		phone1.select();
		return false;
	}
	if (flg2 == '1' && phone2.value == '') {
		showAlert(text);
		phone2.focus();
		phone2.select();
		return false;
	}
	if (phone3.value.length == 0) {
		showAlert(text);
		phone3.focus();
		phone3.select();
		return false;
	}
	return true;
}
function chkPhoneNoObject(phone1, phone2, phone3, text) {
	if (phone1.value == '' && phone2.value == '' && phone3.value == '') {
		return true;
	}
	if (phone3.value.length == 0) {
		showAlert(text);
		phone3.focus();
		phone3.select();
		return false;
	}
	if (phone2.value.length == 0) {
		showAlert(text);
		phone2.focus();
		phone2.select();
		return false;
	}
	if (phone1.value.length == 0) {
		showAlert(text);
		phone1.focus();
		phone1.select();
		return false;
	}
	return true;
}
function chkPost(spost1,spost2,epost1,epost2) {
	var stext1;
	var stext2;
	var etext1;
	var etext2;
	var wk1;
	var wk2;
	stext1 = spost1.value;
	stext2 = spost2.value;
	etext1 = epost1.value;
	etext2 = epost2.value;
	if (stext1 == '') {
		return false;
	}
	if (!chkHanNum(stext1) ||
		stext1.length != 3) {
		return false;
	}
	if (stext2 != '') {
		if (!chkHanNum(stext2) ||
			stext2.length > 4) {
			return false;
		}
	}
	if (etext1 != '') {
		if (!chkHanNum(etext1) ||
			etext1.length != 3) {
			return false;
		}
	}
	if (etext2 != '') {
		if (!chkHanNum(etext2) ||
			etext2.length > 4) {
			return false;
		}
	}
	if (stext2.length > 0 &&
		((etext1.length > 0 && etext2.length == 0) ||
		 (etext1.length == 0 && etext2.length > 0))) {
		return false;
	}
	if (stext2.length == 0 &&
		((etext1.length > 0 && etext2.length > 0) ||
		 (etext1.length == 0 && etext2.length > 0))) {
		return false;
	}
	len = stext2.length;
	if (len == 0) {
		wk1 = '0000';
	} else if (len == 1) {
		wk1 = stext2 + '000';
	} else if (len == 2) {
		wk1 = stext2 + '00';
	} else if (len == 3) {
		wk1 = stext2 + '0';
	} else {
		wk1 = stext2;
	}
	len = etext2.length;
	if (len == 0) {
		wk2 = '9999';
	} else if (len == 1) {
		wk2 = etext2 + '999';
	} else if (len == 2) {
		wk2 = etext2 + '99';
	} else if (len == 3) {
		wk2 = etext2 + '9';
	} else {
		wk2 = etext2;
	}
	if (eval(stext1) > eval(etext1)) {
		return false;
	}
	if (eval(stext1) == eval(etext1) &&
		eval(wk1) > eval(wk2)) {
		return false;
	}
	return true;
}
function chkSelHHMM(timeObj,msg) {
	var msg;
	var st1;
	var st2;
	st1 = timeObj.value;
	if (st1.length > 4 && st1.length < 3) {
		showAlert(msg);
		timeObj.focus();
		timeObj.select();
		return false;
	}
	if(st1.length == 3){
		st1 = "0" + st1;
	}
	st2 = st1.substring(2,4);
	st1 = st1.substring(0,2);
	if(Number(st1 > 24) || Number(st2 > 59)){
		showAlert(msg);
		timeObj.focus();
		timeObj.select();
		return false;
	}
	if(Number(st1 > 23) && Number(st2 > 0)) {
		showAlert(msg);
		timeObj.focus();
		timeObj.select();
		return false;
	}
	return true;
}
function chkZipkCodeObject(zip1, zip2, text) {
	if (zip1.value == '' && zip2.value == '') {
		return true;
	}
	if (zip1.value.length != 3) {
		showAlert(text);
		zip1.focus();
		zip1.select();
		return false;
	}
	if (zip2.value.length != 4) {
		showAlert(text);
		zip2.focus();
		zip2.select();
		return false;
	}
	return true;
}
function chkInputZipkCodeObject(zip1, zip2, text) {
	if ((zip1.value == null) || (zip1.value == '')) {
		showAlert(text);
		zip1.focus();
		zip1.select();
		return false;
	}
	if ((zip1.value.length != 0) && (zip1.value.length != 3)) {
		showAlert(text);
		zip1.focus();
		zip1.select();
		return false;
	}
	return true;
}
function comma(val){
	var minus=val.charAt(0)=="-"?"-":"";
	if(minus!=""){
		val=val.substring(1);
	}
	var tmp="",c=0;
	for(i=0;i<val.length;i++){
		if(val.charAt(i)>="0"&&val.charAt(i)<="9"||val.charAt(i)=="."&&c++==0){
			tmp+=val.charAt(i);
		}
	}
	var d="",i=tmp.indexOf(".");
	if(i!=-1){
		d=tmp.substring(i);
		if(d=="."){
			d="";
		}
		tmp=tmp.substring(0,i);
	}
	while(tmp.charAt(0)=="0"&&tmp!="0"){
		tmp=tmp.substring(1);
	}
	val=tmp;
	tmp="";
	for(i=val.length-1;i>=0;i--){
		tmp=val.charAt(i)+tmp;
		if((val.length-i)%3==0&&i!=0){
			tmp=","+tmp;
		}
	}
	if(tmp==""&&d!=""){
		tmp="0";
	}
	if(minus!=""&&tmp==""){
		minus="";
	}
	return minus+tmp+d;
}
function doLogout(form) {
	var resultFlg = confirm(form.e110010.value);
	if (resultFlg == true) {
		doAction(form, 'rsvLogoutAction.do');
		self.close();
	}
}
function keycheck(e){
	var c;
	if ((c=e.keyCode)>0) {
		return (c>=48&&c<=57)||(c>=96&&c<=105)||(c==8)||(c==9)||(c==46)||(c==37||c==39)||(c=="-".charCodeAt(0));
	} else {
		if((c=e.which)>0){
			return (c>=48&&c<=57)||(c==8);
		} else {
			if(e.value.match(/\D/)!=null) {
				e.value=e.value.replace(/\D/g,"");
			}
		}
	}
	return true
}
function isValidObj(obj) {
	if (( obj == undefined ) || ( obj == null )) {
		return false;
	}
	return true;
}
function showMessage(obj,errorNo,mode) {
	if ( 0 == mode ) {
		showAlert(obj.elements[errorNo].value);
		return false;
	} else if ( 1 == mode ) {
		return confirm(obj.elements[errorNo].value);
	}
}
function replaceErrMsg(errMsg,errStr) {
	var i;
	var str;
	var replaceStr;
	for ( i = 0 ; i < errStr.length ; i++ ) {
		str = "\\\{" + i + "\\\}";
		replaceStr = new RegExp(str,"g");
		errMsg = errMsg.replace(replaceStr, errStr[i]);
	}
	return errMsg;
}
function checkChkBoxM(frm, chkArr, msg, mode) {
	var obj;
	var chkcnt;
	var i;
	chkcnt = 0;
	i = 0;
	if ( undefined == frm.elements[chkArr].length ) {
		return checkChkBox(frm.elements[chkArr], msg);
	} else {
		for ( i = 0 ; i < frm.elements[chkArr].length ; i++ ) {
			if ( true == frm.elements[chkArr][i].checked ) {
				chkcnt++;
			}
		}
		if ( 0 == chkcnt ) {
			showAlert(msg);
			return false;
		}
		if(mode == 1 && chkcnt > 1){
			showAlert(msg);
			return false;
		}
		return true;
	}
}
function isChecked(value, msg) {
	var i;
	if (value == null) {
		showAlert(msg);
		return false;
	}
	if (value.length > 0) {
		for (i = 0; i < value.length; i++) {
			if (value[i].checked == true) {
				return true;
			}
		}
	} else {
		if (value.checked == true) {
			return true;
		}
	}
	showAlert(msg);
	return false;
}
function chkAllSpace(obj, msg) {
	var i;
	var str;
	var flag;
	str  = obj.value;
	flag = false;
	for ( i = 0 ; i < str.length ; i++ ) {
		if ( ' ' != str.charAt(i) && '　' != str.charAt(i) ) {
			flag = true;
			break;
		}
	}
	if ( false == flag ) {
		showAlert(msg);
	}
	return flag;
}
function addOption(obj, text, value){
	var opt;
	var optNo;
	var i;
	opt   = obj.options;
	optNo = opt.length;
	for ( i = 0 ; i < optNo ; i++ ) {
		if ( opt[i].text == text && opt[i].value == value ) {
			return;
		}
	}
	opt[optNo] = new Option(text, value, false, false);
	opt.length = optNo + 1;
}
function removeOption(obj, index){
	var opt;
	var optNo;
	var i;
	opt   = obj.options;
	optNo = opt.length;
	for ( i = index ; i < optNo - 1 ; i++ ) {
		opt[i].text  = opt[i+1].text;
		opt[i].value = opt[i+1].value;
	}
	opt.length = optNo - 1;
	if ( index > opt.length - 1 ) {
		index = opt.length - 1;
	}
	obj.selectedIndex = index;
}
function startInitTimer() {
	gTimerId = setTimeout("initProc()", gTimerValue * 1000);
}
function initProc() {
	doAction(document.form1, gTimeOutAction);
}
function showLAYER(layName) {
	initBr();
	var apl = navigator.appName;
	if (_dom == 3) {
		if (getDivFromName(layName)) {
			getDivFromName(layName).visibility = "show";
		}
	} else if (_dom == 4) {
		if(apl.indexOf("Opera") >= 0){
			getDivFromName(layName).visibility = "visible";
		} else {
			getDivFromName(layName).visibility = "inherit";
		}
	} else {
		getDivFromName(layName).visibility = "visible";
	}
}
function hideLAYER(layName) {
	initBr();
	if (_dom == 3) {
		if (getDivFromName(layName)) {
			getDivFromName(layName).visibility = "hide";
		}
	} else if (_dom == 4) {
		getDivFromName(layName).visibility = "hidden";
	} else {
		getDivFromName(layName).visibility = "hidden";
	}
}
function loadMsgWrite(doc) {
	initDispWrite(doc, 1);
	doc.open();
	if (_dom == 3) {
		doc.write("<layer id='disp'>");
	} else {
		doc.write("<div id='disp'>");
	}
	doc.close();
	hideLAYER('disp');
}
function endTagWrite(doc) {
	doc.open();
	if (_dom == 3) {
		doc.write("</layer>&nbsp;");
	} else {
		doc.write("</div>");
	}
	doc.close();
}
function msgHide() {
	initBr();
	hideLAYER('loadmsg');
	showLAYER('disp');
}
function procStart() {
	window.scroll(0, 0);
	hideLAYER('disp');
	showLAYER('loadmsg');
}
function initDispWrite(doc, num) {
	initBr();
	doc.open();
	if (_dom == 3) {
		doc.write("<layer id='loadmsg' zindex=2 bgcolor='#ffffff'><center><br><br><br><br><br><br><br><br><br><br><img src='image/bi_nowloading.gif' alt='loading'></center></layer>&nbsp;");
	} else {
		doc.write("<div id='loadmsg' style='position:absolute;top:0px;left:0px;right:0px;width:100%'><center><br><br><br><br><br><br><br><br><br><br><img src='image/bi_nowloading.gif' alt='loading'></center></div>");
	}
	doc.close();
	if (num == 0) {
		hideLAYER('loadmsg');
	}
}
function initBr(){
	_dom = document.all?(document.getElementById?2:1)
				:(document.getElementById?4
				:(document.layers?3:0));
}
function getDivFromName(nm) {
	initBr();
	if ((_dom == 4) || (_dom == 2)) {
		return document.getElementById(nm).style;
	} else if (_dom == 1) {
		return document.all(nm).style;
	} else if (_dom == 3) {
		var sTargetObject = "document.layers['" + nm + "']";
		return eval(sTargetObject);
  	}
  	return null;
}
function chkCityPhoneNoObject(phone1, phone2, phone3, flg1, flg2, text) {
	if (flg1 == '1' && phone1.value == '') {
		showAlert(text);
		phone1.focus();
		phone1.select();
		return false;
	}
	if (flg2 == '1' && phone2.value == '') {
		showAlert(text);
		phone2.focus();
		phone2.select();
		return false;
	}
	if (phone3.value.length == 0) {
		showAlert(text);
		phone3.focus();
		phone3.select();
		return false;
	}
	return true;
}
function chkSetPhoneNoObject(phone1, phone2, phone3, text) {
	if (phone1.value == '' && phone2.value == '' && phone3.value == '') {
		return true;
	}
	if (phone3.value.length == 0) {
		showAlert(text);
		phone3.focus();
		phone3.select();
		return false;
	}
	return true;
}
function callF4() {
	var objShell = new ActiveXObject("WScript.Shell");
	objShell.SendKeys("{F4}");
}
function addChar(obj,char) {
	if (obj.value.length < obj.maxLength) {
		obj.value+=char;
	}
}
function delChar(obj) {
	var pos = 0;
	if (obj.value.length > 0) {
		pos = obj.value.length - 1;
		obj.value = obj.value.substring(0,pos);
	}
}
function delCharAll(obj) {
	obj.value="";
}
function confirmMsg(msg, form, action) {
	if ((msg != null) && (msg != "")) {
		if (showConfirm(msg)) {
			doAction(form, action);
		}
	}
}
