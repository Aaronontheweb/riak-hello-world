var express = require("express");
var app = express();
var db = require('riak-js').getClient({host: "127.0.0.1", port: "8091" });

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.set('view options', { pretty: true });
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

    //Set up some local DB logging to console when running locally
	db.registerListener({
	  "riak.request.start": function(event) {
	    console.log(event.method + ' ' + event.path);
	  }
	});

});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

require("./routes/site")(app);
require("./routes/status")(app, db);
require("./routes/teams")(app, db);

var server = app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);