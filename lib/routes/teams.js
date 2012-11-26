/* Teams.js - a site for working with teams */

var   models = require("../models/models")
	, Team = models.Team
	, TeamViewModel = models.TeamViewModel;

module.exports = function(app, db){

	var team = new Team(db);

	/* Params */
    app.param('teamid', function(req, res, next, id){
      team.get(id, function(error, teamVm){
        if(error) return next(error);
        if(!teamVm) return res.send('Unable to find team');
        req.team = teamVm;
        next();
      });
    });

	app.get("/teams", function(req, res){
		team.all(function(err, teams){
			if(err) return res.send(err);
			res.render('teams/index', {title: 'All Teams', teams:teams});
		});
	});

	app.get('/teams/:teamid', function(req, res){
		res.render('teams/view', {title:req.team.Name, post:req.team});
	});

	app.get("/teams/new", function(req, res){
		res.render('teams/new', {title: 'Add New Team'});
	});

	app.post("/teams/create", function(req, res){
		var teamData = req.body.team;
		team.save(new TeamViewModel(teamData.name, teamData.type), function(err, data){
			if(err) return res.render('teams/new', {title: 'Add New Team', errors:err});
			console.log(data);
			res.redirect('/teams');
		});
	});
};