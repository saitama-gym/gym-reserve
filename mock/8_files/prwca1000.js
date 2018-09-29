
function doTransInstSrchVacantTzoneAction(obj, action, transVacantMode, srchSelectInstNo, gSrchSelectInstMax) {
	obj.transVacantMode.value = transVacantMode;
	if (transVacantMode == 5) {
		if (0 > (srchSelectInstNo - 1)) {
			return;
		}
		obj.srchSelectInstNo.value = srchSelectInstNo - 1;
	} else if (transVacantMode == 6) {
		if (gSrchSelectInstMax <= (srchSelectInstNo + 1)) {
			return;
		}
		obj.srchSelectInstNo.value = srchSelectInstNo + 1;
	} else {
		obj.srchSelectInstNo.value = srchSelectInstNo;
	}
	doAction(obj, action);
}
function doInstSrchVacantSelectionAction(select, name, obj, action) {
	var sP = name.split("_");
	obj.selectItems.value = sP[0] + "_" + sP[1];
	obj.selectName.value = select;
	doAction(obj, action);
}
function doInstRsvFieldAction(name, obj, action) {
	obj.selectItems.value = new String(name);
	doAction(obj, action);
}
function checkSelect(obj, action) {
	var objform = (_dom == 3) ? document.layers['disp'].document.form1 : document.form1;
	var objSelectSize = objform.selectSize;
	if (objSelectSize.value == 0) {
		showAlert(objform.e410300.value);
		return;
	} else {
		doAction(obj, action);
	}
}
function reset(obj, action) {
	if ( true == showConfirm(obj.e512060.value) ) {
		doAction(obj, action);
	}
}
