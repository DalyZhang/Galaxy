// JavaScript Document
// Basic Settings

var RJO = RJO || {};
RJO.Menu = RJO.Menu || {};

RJO.Menu.Intr = $("#intr");
RJO.Menu.Recr = $("#recr");
RJO.Menu.Quer = $("#quer");

RJO.Menu.Head = $("#headBar");
RJO.Menu.BBT = $("#bbt");



RJO.Menu.Intr.click(gotoIntroduction.bind(this));
RJO.Menu.Recr.click(gotoRecruit.bind(this));
RJO.Menu.Quer.click(gotoQuery.bind(this));
RJO.Menu.Head.click(gotoGame.bind(this));
RJO.Menu.BBT.click(gotoGame.bind(this));

// Main process
function gotoIntroduction(){
	window.location.assign("introduction.html");
}
function gotoRecruit(){
	window.location.assign("recruit.html");
}
function gotoQuery(){
	window.location.assign("query.html");
}
function gotoGame(){
	window.location.assign("game.html");
}