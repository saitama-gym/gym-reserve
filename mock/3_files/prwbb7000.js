
var weekonfiles = new Array("image/bw_monon.gif",
							"image/bw_tueon.gif",
							"image/bw_wedon.gif",
							"image/bw_thuon.gif",
							"image/bw_frion.gif",
							"image/bw_saton.gif",
							"image/bw_sunon.gif",
							"image/bw_shukuon.gif");
var weekofffiles = new Array("image/bw_mon.gif",
							 "image/bw_tue.gif",
							 "image/bw_wed.gif",
							 "image/bw_thu.gif",
							 "image/bw_fri.gif",
							 "image/bw_sat.gif",
							 "image/bw_sun.gif",
							 "image/bw_shuku.gif");
var dayonfiles = new Array("image/lw_kikangaiL.gif",
						   "image/lw_kikangaiL.gif",
						   "image/lw_kikangaiL.gif");
var dayofffiles = new Array("image/bw_today.gif",
							"image/bw_thismonth.gif",
							"image/bw_nextmonth.gif");

function changeGif(obj, flg, onname, offname) {
	if (flg == 0) {
		obj.src = offname;
	} else {
		obj.src = onname;
	}
}

function changeWeekGif(obj, no) {
	var objSelectWeek = document.form1.dispWeek[no];
	if (objSelectWeek.value == 0) {
		objSelectWeek.value = 1;
	} else {
		objSelectWeek.value = 0;
	}
	changeGif(obj, objSelectWeek.value, weekonfiles[no], weekofffiles[no]);
}

function sendSelectWeekNum(obj, action) {

	if (action == gRsvWGetInstSrchInfAction && obj.selectBldCd.value == "") {
		showAlert(obj.e420190.value);
		return;
	}

	if ((action == gRsvWGetInstSrchInfAction) && (gwebAkiFlg == 1) && (obj.selectBldCd.value == "0")) {
		showAlert(obj.e420190.value);
		return;
	}
	var i = 0;
	var counter = 0;
	setDispWeekNum(obj);

	obj.dispYY.value = obj.selectYY.value;
	obj.dispMM.value = obj.selectMM.value;
	obj.dispDD.value = obj.selectDD.value;

	obj.transVacantMode.value = 8;
	obj.conditionMode.value = 3;
	obj.submmitMode.value = 1;

	doAction(obj, action);
}

function doGetInstSrchInfAction(obj, action) {

	var i = 0;
	var counter = 0;


	if ( eval(obj.selectDD.value) < 1 || eval(obj.selectDD.value) > getDays(eval(obj.selectYY.value), eval(obj.selectMM.value))) {
		showAlert(obj.e420100.value);
		obj.selectDD.focus();
		return;
	}

	setDispWeekNum(obj);

	obj.dispYY.value = obj.selectYY.value;
	obj.dispMM.value = obj.selectMM.value;
	obj.dispDD.value = obj.selectDD.value;

	obj.transVacantMode.value = 8;
	obj.conditionMode.value = 3;
	obj.submmitMode.value = 1;

	doAction(obj, action);

}
function doGetInstSrchInfWAllAction(obj, action) {

	if ( 4 == pmode ) {
		if (action == gRsvWGetInstSrchInfWAllAction && ((obj.selectCommunityManageCd.value == "") || (obj.selectCommunityPlaceCd.value == ""))) {
			showAlert(obj.e420200.value);
			return;
		}
		if ((action == gRsvWGetInstSrchInfWAllAction) && (gwebAkiFlg == 1) && ((obj.selectCommunityManageCd.value == "0") || (obj.selectCommunityPlaceCd.value == "0"))) {
			showAlert(obj.e420200.value);
			return;
		}
	}

	if (action == gRsvWGetInstSrchInfWAllAction && obj.selectBldCd.value == "") {
		showAlert(obj.e420190.value);
		return;
	}

	if ((action == gRsvWGetInstSrchInfWAllAction) && (gwebAkiFlg == 1) && (obj.selectBldCd.value == "0")) {
		showAlert(obj.e420190.value);
		return;
	}

	var i = 0;
	var counter = 0;

	if ( eval(obj.selectDD.value) < 1 || eval(obj.selectDD.value) > getDays(eval(obj.selectYY.value), eval(obj.selectMM.value))) {
		showAlert(obj.e420100.value);
		obj.selectDD.focus();
		return;
	}

	setDispWeekNum(obj);

	obj.dispYY.value = obj.selectYY.value;
	obj.dispMM.value = obj.selectMM.value;
	obj.dispDD.value = obj.selectDD.value;

	obj.transVacantMode.value = 8;
	obj.conditionMode.value = 3;
	obj.submmitMode.value = 1;

	doAction(obj, action);

}
function sendSetDay(obj, action) {
	var i = 0;
	var counter = 0;

	setDispWeekNum(obj);

	obj.dispYY.value = obj.selectYY.value;
	obj.dispMM.value = obj.selectMM.value;
	obj.dispDD.value = obj.selectDD.value;

	obj.transVacantMode.value = 8;
	obj.conditionMode.value = 3;
	obj.submmitMode.value = 1;

	doAction(obj, action);
}

function setDispWeekNum(obj) {

	var i = 0;
	var counter = 0;
	var objSelectWeek = document.form1.dispWeek;
	for (i = 0; i < objSelectWeek.length; i++) {
		if (objSelectWeek[i].value == 1) {
			counter++
		}
	}
	obj.dispWeekNum.value = counter;
}
