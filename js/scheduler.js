var args;
var queue = 0;
var exe = false;

self.addEventListener('message', function(e){

	if(e.data[0] == '#3'){//get args
		args = e.data[1];
		watchQueue();
	}
	if(e.data[0] == '#2'){//update queue
		queue = e.data[1];
	}

}, false);

function go(a) {
	switch(a){
		case 0:
			if(queue.length > 0) fifo();
			break;
	}
}

function fifo() {
	if(!exe){
		while(queue.length > 0){
			if(queue[0]){
				exe = true;
				var p = queue.shift();
				self.postMessage(['#2', queue]);

				console.log('SCHEDULER: executing', p.pid + '. Exe time:', p.exeTime);
				sleep(p.exeTime);
			}
		}
	}
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