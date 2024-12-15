"use strict";

var Cmn = function() {};

Cmn.onDownBtn = function(targetElement, className) {
	if (typeof targetElement === "undefined") {
		return;
	}
	if (typeof className === "string") {
		targetElement.className = className;
	}
};

Cmn.onUpBtn = function(targetElement, className) {
	if (typeof targetElement === "undefined") {
		return;
	}
	if (typeof className === "string") {
		targetElement.className = className;
	}
};

Cmn.setLocation = function(url) {
	if (typeof url === "string") {
		location.href = url;
	}
};


Cmn.switch = function(switches, pages) {

	var touchstart = new Array(switches.length);
	var touchend = new Array(switches.length);
	var touchcancel = new Array(switches.length);
	var active = new Array(switches.length);

	this.setBtnClass = function(touchstart_class, touchend_class, active_class, switch_id, onClick) {
		_setBtnClass(touchstart_class, touchend_class, active_class, switch_id, onClick);
	};
	this.init = function() {
		for (var i = 0; i < switches.length; i++) {
			if (i == 0) {
				switches[i].valid = true;
				switches[i].className = active[i];
			} else {
				switches[i].valid = false;
				pages[i].hide();
			}
		}
	};

	this.showPage = function(obj) {
		_showPage(obj);
	};

	var _showPage = function(obj) {
		var num = null;
		for (num = 0; num < switches.length; num++) {
			if (switches[num] === obj) break;
		}

		for (var i = 0; i < pages.length; i++) {
			if (i == num) {
				_showElementAnimSlide(pages[num]);
			} else {
				switches[i].valid = false;
				switches[i].className = touchend[i];
				pages[i].hide();
			}
		}
	};

	var _setBtnClass = function(touchstart_class, touchend_class, active_class, switch_id, onClick) {
		switches[switch_id].addEventListener("touchstart",
			function() {
				if (!this.valid) {
					this.className = touchstart_class;
				}
			});
		switches[switch_id].addEventListener("touchend",
			function() {
				if (!this.valid) {
					this.className = touchend_class;
				}
			});
		switches[switch_id].addEventListener("touchcancel",
			function() {
				if (!this.valid) {
					this.className = touchend_class;
				}
			});
		switches[switch_id].addEventListener("click",
			function() {
				if (this.tagName.toLowerCase() == "div") {
					this.blur();
				}
				if (this.valid) {
					return;
				}
				this.className = active_class;
				this.valid = true;
				_showPage(this);

				if (typeof onClick === 'function') {
					onClick();
				}

			});
		switches[switch_id].addEventListener("keyup",
			function() {
				if (event.keyCode == 13) {
					if (this.valid) {
						return;
					}
					this.className = active_class;
					this.valid = true;
					_showPage(this);

					if (typeof onClick === 'function') {
						onClick();
					}
				}
			});

		touchstart[switch_id] = touchstart_class;
		touchend[switch_id] = touchend_class;
		touchcancel[switch_id] = touchend_class;
		active[switch_id] = active_class;
	};

	this.showElementAnimSlide = function(targetElement) {
		_showElementAnimSlide(targetElement);
	};

	var _showElementAnimSlide = function(targetElement) {
		targetElement.show();
	};
};

window.addEventListener("pageshow", function() {
	$(".select").removeClass("select");
});

window.addEventListener("hashchange", function() {
	$(".select").removeClass("select");
});

$(function() {
	if (!Modernizr.svg) {
		$('img').each(function() {
			$(this).attr('src', $(this).attr('src').replace(/\.svg/gi, '.png'));
		});
	}
});
