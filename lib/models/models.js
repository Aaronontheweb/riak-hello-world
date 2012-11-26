/*
	Models - contains all of the classes used for expressing data inside our app
*/

//Dependencies
var uuid = require("node-uuid");

var teamsBucket = "teams";
var membersBucket = "membrs";

//Our team model
TeamViewModel = function(teamName, teamType, dateCreated, teamId){
	this.Name = teamName;
	this.Type = teamType;
	this.Created = dateCreated || new DateTime();
	this.Id = teamId || uuid();
	this.Members = [];
};

Team = function(db){
	this.db = db;
};

Team.prototype._mapObject = function(team){
	new TeamViewModel(team.Name, team.Type, team.Created, team.Id);
}

//Retrieve a team by ID
Team.prototype.get = function(id, fn){
	var self = this;
	this.db.get(teamsBucket, id, null, function(err, team, meta){
		if(err) return fn(err, null); //If there's an error, send it back to the caller
		if(typeof(team) === "undefined" || team == null) return fn(null, null); //If no data was returned, return null
		var vm = self._mapObject(team);
		fn(null, vm);
	});
}

//Save a team to the database
Team.prototype.save = function(team, fn){
	this.db.save(teamsBucket, team.Id, team, {returnbody:true}, fn);
}

Team.prototype.all = function(fn){
	var self = this;
	this.db.get(teamsBucket, null, null, function(err, teams, meta){
		if(err) return fn(err, null); //If there's an error, send it back to the caller
		if(typeof(team) === "undefined" || team == null) return fn(null, null); //If no data was returned, return null
		var teamVms = [];
		teams.forEach(function(team){
			teamVms.push(self._mapObject(team));
		});
		fn(null, teamVms);
	});
}

//Our member model
MemberViewModel = function(memberName, memberType, emailAddress, dateCreated, teamId, userId){
	this.Name = memberName;
	this.Type = memberType;
	this.Email = emailAddress;
	this.Created = dateCreated || new DateTime();
	this.Id = teamId || uuid();
	this.TeamId = teamId;
};

exports.Team = Team;