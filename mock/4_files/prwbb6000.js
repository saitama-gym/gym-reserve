
function sendPageMode(obj, action, pageMode) {
	obj.pageMode.value = pageMode;
	doAction(obj, action);
}
function sendPpsCd(obj, action, ppsPpsdCd, ppsCd) {
	obj.selectPpsPpsdCd.value = ppsPpsdCd;
	obj.selectPpsCd.value = ppsCd;
	doAction(obj, action);
}
function sendCityPpsCd(obj, action, ppsPpsdCd, ppsCd) {
	obj.selectPpsPpsdCd.value = ppsPpsdCd;
	obj.selectPpsCd.value = ppsCd;
	obj.conditionMode.value = 2;
	doAction(obj, action);
}
function sendSubmmitMode(obj, action, submmitMode) {
	obj.submmitMode.value = submmitMode;
	obj.conditionMode.value = 3;
	obj.transVacantMode.value = 8;
	doAction(obj, action);
}
function doTransInstSrchMultipleAction(obj, action, ppsPpsdCd, ppsCd) {
	obj.selectPpsPpsdCd.value = ppsPpsdCd;
	obj.selectPpsCd.value = ppsCd;
	obj.submmitMode.value = 1;
	obj.conditionMode.value = 3;
	obj.transVacantMode.value = 8;
	doAction(obj, action);
}
function doTransInstSrchBuildAction(obj, action, ppsPpsdCd, ppsCd) {
	obj.selectPpsPpsdCd.value = ppsPpsdCd;
	obj.selectPpsCd.value = ppsCd;
	obj.selectAreaCd.value = 0;
	obj.selectCommunityManageCd.value = 0;
	obj.selectCommunityPlaceCd.value = 0;
	doAction(obj, action);
}
