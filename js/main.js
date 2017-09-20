/*
MESSAGE CODES
	#1: request if exists any process at process queue
	#2: update queue
	#3: send queue and args to scheduler to execute a process
	#4: scheduler is executing, receive process in execution
	#5: process executing
	#6: scheduler execution end
*/

var queue = [];
var schedulerExecuting = false;

window.onload = function(){
	if(browserCheck()){
		loadBox();
		loadSliderValues();
		go();
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

function go() {
/*
	var args = {
		processes: Number(document.getElementById('inputProcesses').value),
		queueSize: Number(document.getElementById('inputQueueSize').value),
		algorithm: Number(document.getElementById('schedulerAlgorithm').value),
		processExeTime: [
			Number(document.getElementById('inputMinTime').value),
			Number(document.getElementById('inputMaxTime').value)
		],
		priority: [
			Number(document.getElementById('inputMinPri').value),
			Number(document.getElementById('inputMaxPri').value)
		],
		stop: [
			Number(document.getElementById('inputMinStop').value),
			Number(document.getElementById('inputMaxStop').value)
		],
		quantum: Number(document.getElementById('inputQuantum').value)
	}*/

	var args = {
		processes: 8,
		queueSize: 4,
		algorithm: 3,
		processExeTime: [1, 10],
		priority: [1, 15],
		stop: [1, 2],
		quantum: [5]
	};

	hide('box');
	show('panel');

	var w = new window.Worker('js/worker.js');
	var s = new window.Worker('js/scheduler.js');

	w.postMessage(args);

	w.onmessage = function(e){
		e.data.waitTime = new Date().getTime();
		queue.push(e.data);
		uiAddProcess(e.data);

		if(!schedulerExecuting)
			s.postMessage(['#3', queue, args]);
	}

	s.onmessage = function(e){
		if(e.data[0] == '#4'){
			schedulerExecuting = true;
			queueRemove(e.data[1]);
		}

		if(e.data == '#6'){
			if(queue.length > 0)
				s.postMessage(['#3', queue, args]);
			else
				console.log('END!');
		}
	}
}

function queueRemove(p) {
	for(var i = 0; i < queue.length; i++){
		if(queue[i].pid == p.pid)
			uiProcessToExecuting(queue[i]);
			queue.splice(i, 1);
	}
}

function hide(id) {
	document.getElementById(id).classList.add('hidden');
}

function show(id) {
	document.getElementById(id).classList.remove('hidden');
}

function uiAddProcess(p) {
	var queue = document.getElementById('queue');
	var block = document.createElement('div');
	block.appendChild(document.createTextNode(p.pid));
	block.classList.add('processBlock');
	block.style.background = uiColorRandom();
	queue.appendChild(block);
}

function uiColorRandom(){
	var color = '#'; // hexadecimal starting symbol
	var letters = ['2e5266','ba3f1d','521945','912f56','02111b','5d737e','df2935','86ba90'
					,'496ddb','ee8434','550527','f44708','ee2677','297373','c6d8d3','2f4858']; //Set your colors here
	color += letters[Math.floor(Math.random() * letters.length)];

	return color;
}

function uiProcessToExecuting(p) {
	
}