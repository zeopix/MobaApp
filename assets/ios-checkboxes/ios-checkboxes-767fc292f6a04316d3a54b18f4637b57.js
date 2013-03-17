(function() {
	var $$ = function(selector) {
		return Array.prototype.slice.call(document.querySelectorAll(selector));
	}
	document.addEventListener("DOMContentLoaded", function() {
		var checkbox;
		//if (switchControl.classList.contains("on")) {
			//switchControl.lastElementChild.checked = true;
		//}		
		$$(".switch").forEach(function(switchControl) {
			switchControl.addEventListener("click", function toggleSwitch() {
				checkbox = switchControl.lastElementChild;
				checkbox.checked = !checkbox.checked;
				switchControl.classList.toggle("on");
			}, false);
		});
	}, false);
})();
