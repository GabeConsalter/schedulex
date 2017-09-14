window.onload = function(){
	if(browserCheck()){
		loadBox();
		loadSliderValues();
	}else{
		loadBrowserError();
	}
}

function loadSliderValues() {
	var els = document.querySelectorAll('[data-output]');
	for(var i = 0; i < els.length; i++){
		document.getElementById(els[i].getAttribute('data-output')).textContent = els[i].value;
	}
}

function setMin(t, el, l) {
	el = document.getElementById(el);
	l = document.getElementById(l);

	el.min = t.value;
	el.value = t.value;
	l.textContent = el.value;
}

function browserCheck() {
	if(!!window.chrome && !!window.chrome.webstore)
		return false;
	else if(!!document.documentMode)
		return false;
	else if(!!document.documentMode && !!window.StyleMedia)
		return false;
	else if(/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)))
		return false;
	else if((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0)
		return false;
	else if((!!window.chrome && !!window.chrome.webstore || (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) && !!window.CSS)
		return false;

	return true;
}

function loadBox() {
	document.getElementById('box').classList.remove('hidden');
	document.getElementById('browserError').classList.add('hidden');
}

function loadBrowserError(){
	document.getElementById('browserError').classList.remove('hidden');
	document.getElementById('box').classList.add('hidden');
}