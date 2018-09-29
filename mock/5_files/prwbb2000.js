
function sendBldCd(obj, action, bldCd) {
	obj.selectBldCd.value = bldCd;
	doAction(obj, action);
}
function sendSubmmitMode(obj, action, submmitMode) {
	obj.submmitMode.value = submmitMode;
	doAction(obj, action);
}
function doTransInstSrchMultipleAction(obj, action, bldCd) {
	obj.selectBldCd.value = bldCd;
	obj.submmitMode.value = 1;
	obj.conditionMode.value = 3;
	obj.transVacantMode.value = 8;
	doAction(obj, action);
}
function doTransInstSrchMultipleAction2(obj, action, submmitMode) {
	obj.submmitMode.value = submmitMode;
	obj.conditionMode.value = 3;
	obj.transVacantMode.value = 8;
	doAction(obj, action);
}
