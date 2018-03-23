// JavaScript Document

var RJO = RJO || {};
RJO.Game = RJO.Game || {};

RJO.Game.Score = $("#score-display");
RJO.Game.Result = $("#score");

RJO.Game.Lose = $("#game-lose");
RJO.Game.Recr = $("#recr");
RJO.Game.Again = $("#again");

RJO.Battlers = {
	player : {
		name : '你',
		mhp : 1000,
		atk : 75,
		def : 10,
		pic : 'img/SpaceShip.png',
		skills : [0,1]
	},
	enemy1 : {
		name : '怪物A',
		mhp : 375,
		atk : 35,
		def : 7,
		agi : 50,
		speed : 1,
		pic : 'img/SpaceEnemy.png',
		skills : [2],

		aiType : 2,
		score : 50,
		hurtMove : false
	},
	enemy2 : {
		name : '怪物B',
		mhp : 375,
		atk : 35,
		def : 7,
		agi : 50,
		speed : 1,
		pic : 'img/SpaceEnemy.png',
		skills : [3],
		aiType : 1,
		score : 50,
		hurtMove : false
	},
	stone : {
		name : '陨石',
		mhp : 444,
		atk : 75,
		def : 20,
		agi : 5,
		speed : 4,
		pic : 'img/SpaceStone.png',
		aiType : 0,
		score : 75,
		hurtMove : true
	},
}
RJO.Skills = [{
	id : 0,
	name : '玩家普攻',
	type : 'hurt',
	once : true,
	cd : 10,
	bullets : [{
		pic : 'img/playerBul.png',
		angle : 90,
		speed : 30,
		rate : 1.0,
		effects : [],
	}]
},{
	id : 1,
	name : '玩家大招',
	type : 'hurt',
	once : false,
	cd : 25,
	bullets : [{
		pic : 'img/playerBig.png',
		angle : 90,
		speed : 12,
		rate : 2.0,
		effects : [{
			type: 'ghost', params:[3,20]
		}],
	},{
		pic : 'img/playerBig.png',
		angle : 80,
		speed : 12,
		rate : 1.0,
		effects : [{
			type: 'ghost', params:[3,20]
		}],
	},{
		pic : 'img/playerBig.png',
		angle : 100,
		speed : 12,
		rate : 1.0,
		effects : [{
			type: 'ghost', params:[3,20]
		}],
	}]
},{
	id : 2,
	name : '敌人普攻1',
	type : 'hurt',
	once : true,
	cd : 200,
	bullets : [{
		pic : 'img/enemyBul1.png',
		angle : 90,
		speed : 2,
		rate : 1.0,
		effects : [],
	}]
},{
	id : 3,
	name : '敌人普攻2',
	type : 'hurt',
	once : true,
	cd : 200,
	bullets : [{
		pic : 'img/enemyBul2.png',
		angle : 90,
		speed : 2,
		rate : 0.5,
		effects : [],
	},{
		pic : 'img/enemyBul2.png',
		angle : 120,
		speed : 2,
		rate : 0.3,
		effects : [],
	},{
		pic : 'img/enemyBul2.png',
		angle : 60,
		speed : 2,
		rate : 0.3,
		effects : [],
	}]
}];

RJO.Game.Recr.click(gotoMenu.bind(this));
RJO.Game.Again.click(GameScene.restartGame.bind(GameScene));

function gotoMenu(){
	window.open("index.php", "_self");
}
GameScene.hideGameOver();

Input.initialize();
GameScene.initialize();