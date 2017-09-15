self.addEventListener('message', function(e){

	if(!e)
		self.terminate();

	var args = e.data;
	var pnum = 0;
	var intervalSeconds = 0;

	var interval = setInterval(function(){

			if(args.processes - 1 == 0)
				clearInterval(interval);

			var p = {
				pid: 'p' + pnum,
				exeTime: random(args.processExeTime[0], args.processExeTime[1]),
				priority: random(args.priority[0], args.priority[1])
			}

			console.log('New process: ', p);

			pnum++;
			args.processes--;

			intervalSeconds = random(args.stop[0], args.stop[1]) * 1000;

			console.log(interval);
	}, 2000);

}, false);

function random(a, b){
	return Math.floor(Math.random() * (b - a + 1)) + a;
}