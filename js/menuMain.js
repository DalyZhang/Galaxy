// JavaScript Document
// Basic Settings

var RJO = RJO || {};
RJO.Menu = RJO.Menu || {};

RJO.Menu.Intr = $("#intr");
RJO.Menu.Recr = $("#recr");
RJO.Menu.Quer = $("#quer");

RJO.Menu.Head = $("#headBar");
RJO.Menu.BBT = $("#tStar");



RJO.Menu.Intr.click(gotoIntroduction.bind(this));
RJO.Menu.Recr.click(gotoRecruit.bind(this));
RJO.Menu.Quer.click(gotoQuery.bind(this));
RJO.Menu.Head.click(gotoGame.bind(this));
RJO.Menu.BBT.click(gotoGame.bind(this));

// Main process
function gotoIntroduction(){
	window.location.assign("introduction.php");
}
function gotoRecruit(){
	window.location.assign("recruit.php");
}
function gotoQuery(){
	window.location.assign("query.php");
}
function gotoGame(){
	window.location.assign("game.php");
}