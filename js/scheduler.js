var args;
var queue = 0;

self.addEventListener('message', function(e){

	if(e.data[0] == '#3'){//get queue and args to execute a process
		queue = e.data[1];
		args = e.data[2];
		go(args.algorithm);
	}
	if(e.data[0] == '#2'){//update queue
		queue = e.data[1];
	}

}, false);

function go(a) {
	
	switch(a){
		case 0:
			fifo();
			break;
		case 1:
			sjf();
			break;
		case 2:
			priority();
			break;
		case 3:
			hrrn();
			break;
	}
}

function fifo() {
	var p = queue.shift();
	self.postMessage(['#4', p]);
	console.log('SCHEDULER: executing', p.pid + '. Exe time:', p.exeTime);
	sleep(p.exeTime);
	self.postMessage('#6');
}

function sjf() {
	var p = queue[0];
	if(queue.length > 1){
		for(var i = 1; i < queue.length; i++){
			if(p.exeTime > queue[i].exeTime){
				p = queue[i];
			}
		}
	}

	self.postMessage(['#4', p]);
	console.log('SCHEDULER: executing', p.pid + '. Exe time:', p.exeTime);
	sleep(p.exeTime);
	self.postMessage('#6');
}

function priority() {
	var p = queue[0];
	if(queue.length > 1){
		for(var i = 1; i < queue.length; i++){
			if(p.priority < queue[i].priority){
				p = queue[i];
			}
		}
	}

	self.postMessage(['#4', p]);
	console.log('SCHEDULER: executing', p.pid + '. Exe time:', p.exeTime, '. Priority:', p.priority);
	sleep(p.exeTime);
	self.postMessage('#6');
}

function hrrn() {
	var p = queue[0];
	if(queue.length > 1){
		for(var i = 1; i < queue.length; i++){
			var rr = (p.waitTime + p.exeTime) / p.exeTime;
			var qrr = (queue[i].waitTime + queue[i].exeTime) / queue[i].exeTime;
			if(rr < qrr){
				p = queue[i];
			}
		}
	}

	self.postMessage(['#4', p]);
	console.log('SCHEDULER: executing', p.pid + '. Exe time:', p.exeTime, '. Priority:', p.priority);
	sleep(p.exeTime);
	self.postMessage('#6');
}

function sleep(s){
	var start = new Date().getTime();
	var end = start;

	while(end < start + (s * 1000)){
		end = new Date().getTime();
	}
}

function watchQueue() {
	while(queue.length <= 0 || queue == 0){
		console.log('SCHEDULER: waiting a process...');
	}

	go(args.algorithm);
}