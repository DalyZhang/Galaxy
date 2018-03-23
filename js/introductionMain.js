// JavaScript Document
// Basic Settings

var RJO = RJO || {};
RJO.Intr = RJO.Intr || {};

RJO.Intr.Departments = ["编辑部","综合管理部","综合新闻部","外联部","策划推广部","节目部","人力资源部","技术部","视频部","视觉设计部"];
RJO.Intr.Introductions = [
"谁说理工院校便是文艺的荒漠？作为校内新媒体平台的编辑部，必定与你同行，将世界的视线汇聚于你眼前。知乎、果壳、小说、美食、时尚、实事、诗与远方，甚至是网络写手的魅力。文字编辑，给你无处安放的才华安个家。想把自己的创意与审美用PS、AI、SAI等软件展现出来，P得一手表情包，参与报刊的设计与制作，为何不选这我们的可视化设计？按下快门，捕捉天下如梦如幻之影，打开闪光狩猎世界一动一静之美。奇思妙想脑洞大，摄影组需要你。",
"我们是百步梯庞大的根系，基础扎实的工作安排，事无巨细的组织策划，每个大型活动都离不开我们的力量和筹备。我们管理着百步梯内部财务、物资、行政，保证整个组织顺畅运行的同时，秉承着不断开拓创新的宗旨。加入我们，你的组织管理能力，团队协作意识和宏观且严谨的思维将会得到极大的提高。你若无惧，综管定然不弃。",
"于文字的刀光剑影中追寻真相，于摄影的光影变化中记录变迁。我们是百步梯综合新闻部，我们是华工校内举办各大明星活动时的现场首席媒体；我们是以新闻理想为精神食粮的校媒记者，我们关注学生权益、为学生发声；我们更是温暖有力、共同成长的新闻部大家庭。如果你对非虚构写作感兴趣、对摄影感兴趣、对正在发生的事情感兴趣，如果你对追求事实与真相有自己的坚守、愿意在大学期间加入一个大家庭，无悔奉献自己的青春，做自己认为有意义的事情，那就加入我们吧。真相永远不会太晚。",
"我们是百步梯对外交流的窗口，我们本着勇于挑战、自信乐观的宗旨力求以最完美的公关形象展现百步梯的风采。作为与社会联系最紧密的部门，我们主要负责与企业进行公关洽谈、与高校间信息交流互通、与各大媒体紧密合作、主办百步梯年会以及配合其他部门举办活动，我们是一支智力与实干相结合的优秀公关团队，始终力求以广阔的社会视角，担任好百步梯的“外交使者”。",
"灵感在这里迸发，创意在这里凝聚。我们是百步梯的创新大脑、品牌设计师，肩负着百步梯线上产品运营和线下推广的责任。 我们管理并运营百步梯官方微信平台和官方活动微博。我们策划并筹办的“雕刻时光”电影文化节、毕业季文化节都成功地跻身华园最受欢迎活动的行列。给你散发创新力的舞台，感受不一样的精彩，就在策划推广部！",
"节目部为每一个有播音主持梦想的你，提供一个绽放的舞台。我们主要负责每天下午五点三十分开始的校园广播，百步梯微信公众平台的“BBT汇音”栏目，以及荔枝FM节目运营。我们的主播负责节目的构思、录制和剪辑。现有新闻、音乐、粤语、英语、情感、时尚六大类型的节目。每年秋天，节目部还会承办百步梯三大活动之一的“爱上女主播”播音主持大赛。",
"“人”聚于此，“力”为百步梯。我们负责百步梯的人员培训，管理和考核；我们致力于建设百步梯内外的文化，努力挖掘每一个BBTer的潜力，加强各部门之间的沟通与合作；我们通过运营“百步梯梯妹”公众号，为百步梯增添活力。作为联系十大部门的桥梁与枢纽，我们旨在用心凝聚“人”的力量，用一撇一捺书写新篇章，让百步梯的创新理念溢满华园。我们渴望最有激情和创造力的你！Be with HR，人力等你来撩！",
"我们是百步梯的元老级部门。百步梯以网络技术起家，而作为其技术支撑的技术部拥有独立的研发办公室，负责日常的活动网站设计与制作。这里需要码力满满的程序猿，也需要灵感溢出的设计狮；我们能用设计图描绘新的世界，也能用代码将脑洞化为现实。想让你的作品流传全校吗？想让你的idea通过双手实现吗？加入我们，一起去创造不可能！",
"我们是出现在校园第一现场的绿马甲，我们是百步梯乃至华南理工大学的官方记录团队，我们更是“华工ISO”系列精品栏目的创作者，拥有各种拍摄的专业器材和设备，掌握PR、AE等多种软件的应用。发挥独特创意、记录生活点滴、采访明星名人，在视频部统统能实现。这里充满着无限的可能，这里洋溢着欢乐的气氛。零基础没关系，摄像视频制作培训等着你。",
"我们是百步梯的视觉形象设计师，负责各大活动的海报、传单、Vl、宣传册制作以及活动场地的布置、网络Ul设计，在电子美工、手绘美工和视觉设计艺术中不断推陈出新，是百步梯直接宣传推广的平台，用细腻传递美的触觉！当然，充满创意的美工水果们一定少不了主打的活动创意市集啦！"
];

RJO.Intr.Frames = [];

RJO.Intr.InfoContainer = $("#info-container");
RJO.Intr.SwiperContainer = $(".swiper-container");

RJO.Intr.Recr = $("#recr");
RJO.Intr.Back = $("#back");

RJO.Intr.Recr.click(gotoRecr.bind(this));
RJO.Intr.Back.click(gotoMenu.bind(this));

function gotoRecr(){
	window.location.replace("recruit.php");
}
function gotoMenu(){
	window.location.replace("index.php");
}
/*
function refreshBoxPos(){
	
	var boxWidth = window.innerWidth;
	var boxHeight = window.innerHeight;
	if(boxWidth>boxHeight){
		RJO.Intr.InfoContainer.height(boxHeight);
		
  		//var height = RJO.Intr.InfoContainer.height();
		//RJO.Intr.InfoContainer.height(height);
	}else{
		RJO.Intr.InfoContainer.width(Math.min(boxWidth,400));
  		var width = RJO.Intr.InfoContainer.width();
		RJO.Intr.InfoContainer.height(boxHeight);
	}
  	var width = RJO.Intr.InfoContainer.width();
	
	RJO.Intr.InfoContainer.css({"left":(boxWidth-width)/2+"px"});
	RJO.Intr.InfoContainer.css({"height":(boxHeight-75)+"px"});
	RJO.Intr.InfoContainer.css({"bottom":"65px"});

	//RJO.Intr.SwiperContainer.css({"padding-top":"-128px"});
};
*/
function initForm(){
	//refreshBoxPos();
	initFrames();
	initSwiper();
}
function makeFrameInnerHTML(id){
	var name = RJO.Intr.Departments[id];
	var desc = RJO.Intr.Introductions[id].replace(/\n/g,"<br>");
	var text = "<h1>"+name+"</h1><p>"+desc+"</p>";
	return text;	
}
function initFrames(){
	for(var i=0;i<RJO.Intr.Departments.length;i++){
		var f = RJO.Intr.Frames[i] = $("#"+i);
		f[0].innerHTML = makeFrameInnerHTML(i);
	}
}
function initSwiper(){
	var swiper = new Swiper('.swiper-container', {
		/*effect: 'cube',*/
      	/*direction: 'vertical',*/
		grabCursor: true,
		/*cubeEffect: {
			shadow: true,
			slideShadows: true,
			shadowOffset: 20,
			shadowScale: 0.94,
	},*//*
		pagination: {
			el: '.swiper-pagination',
		},*/
		/*navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},*/
	});
}
//window.addEventListener("resize",refreshBoxPos);
window.addEventListener("load",initForm);