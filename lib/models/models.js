/*
	Models - contains all of the classes used for expressing data inside our app
*/

//Dependencies
var uuid = require("node-uuid");

//Our team model
function Team(teamName, teamType, dateCreated, teamId){
	this.Name = teamName;
	this.Type = teamType;
	this.Created = dateCreated || new DateTime();
	this.Id = teamId || uuid();
}

//Our member model
function Member(memberName, memberType, emailAddress, dateCreated, teamId, userId){
	this.Name = memberName;
	this.Type = memberType;
	this.Email = emailAddress;
	this.Created = dateCreated || new DateTime();
	this.Id = teamId || uuid();
	this.TeamId = teamId;
}