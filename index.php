<?php include "version.php";?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
	<title>百步梯</title>
	<link href="css/main.css<?php echo($v);?>" rel="stylesheet" type="text/css"/>
</head>

<body bgcolor="#000000">
<script src="js/loadingShow.js<?php echo($v);?>"></script>
<script src="js/lib/jquery-3.2.1.min.js"></script>
<div id="container">
	<div class="headBar">
		<img id="tStar" src="img/tStar.png<?php echo($v);?>"/>
		<img id="tStarE" src="img/tStarE.png<?php echo($v);?>"/>
		<img class="star-deathstar" src="img/DeathStarMin.png<?php echo($v);?>"/>
		<img class="star-plan" src="img/PlanMin.png<?php echo($v);?>"/>
		<img class="star-video" src="img/VideoMin.png<?php echo($v);?>"/>
		<img class="star-edit" src="img/EditMin.png<?php echo($v);?>"/>
	</div>
	<div id="main">
		<button id="intr"><img class="icon icon-large" src="img/explore.png<?php echo($v);?>"/><div class="icon-text">探索部门星球</div></button>
		<button id="recr"><img class="icon" src="img/write.png<?php echo($v);?>"/><div class="icon-text">马上报名</div></button>
		<button id="quer"><img class="icon" src="img/query.png<?php echo($v);?>"/><div class="icon-text">报名查询</div></button>
	</div>
</div>

<script src="js/menuMain.js<?php echo($v);?>"></script>
</html>
