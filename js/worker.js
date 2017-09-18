var args;
var pnum;

self.addEventListener('message', function(e){

	if(!e)
		self.terminate();

	args = e.data;
	pnum = 0;
	var intervalSeconds = 0;

	while(args.processes--){
		var p = {
			pid: 'p' + pnum,
			exeTime: random(args.processExeTime[0], args.processExeTime[1]),
			priority: random(args.priority[0], args.priority[1])
		}

		console.log('New process: ', p);

		pnum++;

		sleep(random(args.stop[0], args.stop[1]));
	}

}, false);

function random(a, b){
	return Math.floor(Math.random() * (b - a + 1)) + a;
}

function sleep(s){
	console.log(s);
	var start = new Date().getTime();
	var end = start;

	while(end < start + (s * 1000)){
		end = new Date().getTime();
	}
}