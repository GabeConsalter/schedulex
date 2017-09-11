window.onload = function(){
	if(browserCheck()){
		loadBox();
		loadSliderValues();
		loadPlural();	
	}else{
		loadBrowserError();
	}
}

function setValue(id, r) {
	var el = document.getElementById(id);
	el.textContent = r.value;

	loadPlural(id);
}

function loadSliderValues() {
	var els = document.querySelectorAll('[data-slider]');
	for(var i = 0; i < els.length; i++){
		els[i].textContent = document.getElementById(els[i].getAttribute('data-slider')).value;
	}
}

function loadPlural(id){

	if(id){

		var num = Number(document.getElementById(id).textContent);
		if(num > 1)
			document.querySelector('[data-plural="'+ id +'"]').textContent = 'processes';
		else
			document.querySelector('[data-plural="'+ id +'"]').textContent = 'process';

	}else{
		var els = document.querySelectorAll('[data-plural]');
		for(var i = 0; i < els.length; i++){

			if(Number(document.getElementById(els[i].getAttribute('data-plural')).textContent) > 1)
				els[i].textContent = 'processes';
			else
				els[i].textContent = 'process';
		}
	}
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