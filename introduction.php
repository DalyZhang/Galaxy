<?php include "version.php";?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
	<title>百步梯部门介绍</title>
	<link href="css/lib/swiper.min.css<?php echo($v);?>" rel="stylesheet" type="text/css">
	<link href="css/introduction.css<?php echo($v);?>" rel="stylesheet" type="text/css">
</head>
<body bgcolor="#000000" >
	<script src="js/loadingShow.js<?php echo($v);?>"></script>
	<script src="js/lib/jquery-3.2.1.min.js"></script>
	<div id="container">
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<div class="star">
					<img class="star-edit" src="img/Edit.png<?php echo($v . "0");?>"/>
				</div>
				<div id="0" class="frame"></div>
			</div>
			<div class="swiper-slide">
				<div class="star">
					<img class="star-video" src="img/Edit.png<?php echo($v . "1");?>"/>
				</div>
				<div id="1" class="frame"></div>
			</div>
			<div class="swiper-slide">
				<div class="star">
					<img class="star-video" src="img/Edit.png<?php echo($v . "2");?>"/>
				</div>
				<div id="2" class="frame"></div>
			</div>
			<div class="swiper-slide">
				<div class="star">
					<img class="star-video" src-data="img/Edit.png<?php echo($v . "3");?>"/>
				</div>
				<div id="3" class="frame"></div>
			</div>
			<div class="swiper-slide">
				<div class="star">
					<img class="star-plan" src-data="img/Plan.png<?php echo($v . "4");?>"/>
				</div>
				<div id="4" class="frame"></div>
			</div>
			<div class="swiper-slide">
				<div class="star">
					<img class="star-video" src-data="img/Edit.png<?php echo($v . "5");?>"/>
				</div>
			<div id="5" class="frame"></div>
			</div>
			<div class="swiper-slide">
				<div class="star">
					<img class="star-video" src-data="img/Edit.png<?php echo($v . "6");?>"/>
				</div>
				<div id="6" class="frame"></div>
			</div>
			<div class="swiper-slide">
				<div class="star">
					<img class="star-deathstar" src-data="img/DeathStar.png<?php echo($v . "7");?>"/>
				</div>
				<div id="7" class="frame"></div>
			</div>
			<div class="swiper-slide">
				<div class="star">
					<img class="star-video" src-data="img/Video.png<?php echo($v . "8");?>"/>
				</div>
				<div id="8" class="frame"></div>
			</div>
			<div class="swiper-slide">
				<div class="star">
					<img class="star-video" src-data="img/Edit.png<?php echo($v . "9");?>"/>
				</div>
				<div id="9" class="frame"></div>
			</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>

	<div id="buttons">
		<button id="recr"><img class="icon" src="img/write.png<?php echo($v);?>"/><div class="icon-text">马上报名</div></button>
		<button id="back"><img class="icon" src="img/back.png<?php echo($v);?>"/><div class="icon-text">返回主页</div></button>
	</div>
	</div>

	<script src="js/lib/swiper.min.js"></script>
	<script src="js/introductionMain.js<?php echo($v);?>"></script>
</body>
</html>
