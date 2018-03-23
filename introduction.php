<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  <title>百步梯部门介绍</title>

  <!-- Link Swiper's CSS -->
  <link href="css/lib/swiper.min.css<?php echo("?" . time());?>" rel="stylesheet" type="text/css">
  <link href="css/introduction.css<?php echo("?" . time());?>" rel="stylesheet" type="text/css">

  <!-- Demo styles -->
  <style>
  </style>
</head>
<body bgcolor="#000000" >
	<script src="js/loadingShow.js<?php echo("?" . time());?>"></script>
	<script src="js/lib/jquery-3.2.1.min.js"></script>
  <!-- Swiper -->
  <!-- Add Arrows -->
  <!--div class="arrows" style="display:block;">
    <div class="swiper-button-next" id="pageDown"></div>
    <div class="swiper-button-prev" id="pageUp"></div>
  </div-->
<div id="container">
<div class="swiper-container">
	<div class="swiper-wrapper">
		<div class="swiper-slide">
			<div class="star">
				<img class="star-edit" src="img/Edit.png<?php echo("?1" . time());?>"/>
			</div>
			<div id="0" class="frame"></div>
		</div>
		<div class="swiper-slide">
			<div class="star">
				<img class="star-video" src="img/Edit.png<?php echo("?2" . time());?>"/>
			</div>
			<div id="1" class="frame"></div>
		</div>
		<div class="swiper-slide">
			<div class="star">
				<img class="star-video" src="img/Edit.png<?php echo("?3" . time());?>"/>
			</div>
			<div id="2" class="frame"></div>
		</div>
		<div class="swiper-slide">
			<div class="star">
				<img class="star-video" src="img/Edit.png<?php echo("?4" . time());?>"/>
			</div>
			<div id="3" class="frame"></div>
		</div>
		<div class="swiper-slide">
			<div class="star">
				<img class="star-plan" src="img/Plan.png<?php echo("?5" . time());?>"/>
			</div>
			<div id="4" class="frame"></div>
		</div>
		<div class="swiper-slide">
			<div class="star">
				<img class="star-video" src="img/Edit.png<?php echo("?6" . time());?>"/>
			</div>
		<div id="5" class="frame"></div>
		</div>
		<div class="swiper-slide">
			<div class="star">
				<img class="star-video" src="img/Edit.png<?php echo("?7" . time());?>"/>
			</div>
			<div id="6" class="frame"></div>
		</div>
		<div class="swiper-slide">
			<div class="star">
				<img class="star-deathstar" src="img/DeathStar.png<?php echo("?8" . time());?>"/>
			</div>
			<div id="7" class="frame"></div>
		</div>
		<div class="swiper-slide">
			<div class="star">
				<img class="star-video" src="img/Video.png<?php echo("?9" . time());?>"/>
			</div>
			<div id="8" class="frame"></div>
		</div>
		<div class="swiper-slide">
			<div class="star">
				<img class="star-video" src="img/Edit.png<?php echo("?a" . time());?>"/>
			</div>
			<div id="9" class="frame"></div>
		</div>
	</div>
	<div class="swiper-pagination"></div>
</div>

<div id="buttons">
	<button id="recr"><img class="icon" src="img/B.png<?php echo("?" . time());?>"/><div class="icon-text">马上报名</div></button>
	<button id="back"><img class="icon" src="img/back.png<?php echo("?" . time());?>"/><div class="icon-text">返回菜单</div></button>
</div>
</div>

	<!-- Swiper JS -->
	<script src="js/lib/swiper.min.js"></script>
	<script src="js/introductionMain.js<?php echo("?" . time());?>"></script>
</body>
</html>
