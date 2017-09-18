var args;
var queue;
var exe;
var work = false;

while(!work)
	self.postMessage('#1');

self.addEventListener('message', function(e){
	args = e.data[0];
	queue = e.data[1];

	if(!exe){
		go(args.algorithm);	
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
	var p = queue[0];
	self.postMessage(['#5', p]);

	console.log('Executing', p.pid, '...');
	sleep(5);
}

function sleep(s){
	var start = new Date().getTime();
	var end = start;

	while(end < start + (s * 1000)){
		end = new Date().getTime();
	}
}