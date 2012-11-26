/*
	A simple little page for showing Riak status information
*/

module.exports = function(app, db){
	app.get("/status", function(req, res){
		db.stats(function(err, stats){
			if(err) stats = err;
			res.send(JSON.stringify(stats));
			//res.render('status/index',  {title: 'Riak Cluster Stats', stats: JSON.stringify(stats)});
		});
		
	});
};