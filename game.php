<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
<title>百步梯彩蛋</title>
<link href="css/game.css<?php echo("?" . time());?>" rel="stylesheet" type="text/css">
</head>

<body bgcolor="#000000">
<script src="js/loadingShow.js"></script>
<script src="js/lib/jquery-3.2.1.min.js"></script>
	<div id="score-display">
		
	</div>
	<div id="game-lose" class="hidden">
	    <div id="container">
	    	<div id="result">你的得分：<span id='score'></span></div>
		    <div id="main">

		        <button id="recr">前往报名</button>
		        <button id="again">再玩一次</button>
		    </div>
		</div>
	</div>
<script src="js/game/pixi.js"></script>
<script src="js/game/input.js"></script>
<script src="js/game/battler.js"></script>
<script src="js/game/gameScene.js"></script>
<script src="js/gameMain.js"></script>
</html>
