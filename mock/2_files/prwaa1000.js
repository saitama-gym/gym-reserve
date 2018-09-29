
function doAreaMapAction(obj, action) {
	obj.conditionMode.value = 1;
	obj.selectPpsPpsdCd.value = 0;
	obj.selectPpsCd.value = 0;
	doAction(obj, action)
}
function doAreaAction(obj, action) {
	obj.conditionMode.value = 1;
	doAction(obj, action)
}
function doPpsdSearchAction(obj, action) {
	obj.conditionMode.value = 2;
	doAction(obj, action)
}
function doComplexSearchAction(obj, action) {
	obj.submmitMode.value = 1;
	obj.conditionMode.value = 3;
	obj.transVacantMode.value = 8;
	doAction(obj, action)
}
