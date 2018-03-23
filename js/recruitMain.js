// JavaScript Document
// Others
function htmlEncodeJQ( str ) {  
    return $('<span/>').text( str ).html();  
}  

// Basic Settings

var RJO = RJO || {};

RJO.LocalRecord = {};

RJO.Recruit = RJO.Recruit || {};

RJO.Recruit.Fields = ["Name","Gender","School","Dorm","Tele","First","Second","Obey","Info"];
RJO.Recruit.Failed = ["你的名字是？","性别呢？","学院呢？","要正确填写宿舍哦？","要正确填写手机号哦？","还没填第一志愿呢","","服不服0.0",""];
RJO.Recruit.Schools = ["","机械与汽车工程学院","建筑学院","土木与交通学院","电子与信息学院","材料科学与工程学院","化学与化工学院",
"轻工科学与工程学院","食品科学与工程学院","数学学院","物理与光电学院","经济与贸易学院","自动化科学与工程学院","计算机科学与工程学院",
"电力学院","生物科学与工程学院","环境与能源学院","软件学院","工商管理学院","公共管理学院","马克思主义学院","外国语学院","法学院",
"新闻与传播学院","艺术学院","体育学院","设计学院","医学院","国际教育学院"];

RJO.Recruit.Departments = ["","编辑部","综合管理部","综合新闻部","外联部","策划推广部","节目部","人力资源部","技术部","视频部","视觉设计部"];

RJO.Recruit.Centerer = $("#centerer");

RJO.Recruit.AlertWindow = $("#alert-window");
RJO.Recruit.AlertMsg = $("#alert-msg");

RJO.Recruit.AlertMenu = $("#alert-menu");
RJO.Recruit.AlertQuer = $("#alert-quer");
RJO.Recruit.AlertBack = $("#alert-back");

RJO.Recruit.Submit = $("#submit");
RJO.Recruit.Back = $("#back");
RJO.Recruit.Form = {};
RJO.Recruit.PHPPath = "php/reg.php";

// type: 'POST'  url: php path  
// data: json    success: function to call back
RJO.SendAJAX = function(type,url,data,success){
	data = {data : JSON.stringify(data)};
	$.ajax({
        type:type, url:url,
        data:data, success:function(data){
			success(JSON.parse(data));
		}.bind(this)
    });
}

RJO.Recruit.SendAJAX = function(type,data,success){
    RJO.SendAJAX(type,RJO.Recruit.PHPPath,data,success);
}

RJO.Recruit.makeForm = function(){
	RJO.Recruit.makeBaseForm();
	RJO.Recruit.specializeForm();
}
RJO.Recruit.makeBaseForm = function(){
	for(var i=0;i<RJO.Recruit.Fields.length;i++){
		var key = RJO.Recruit.Fields[i];
		var field = key.toLowerCase();
		var f = RJO.Recruit.Form[field] = {};
		var clear = RJO.Recruit.clearField.bind(this,f);
		f.selector = RJO.Recruit[key] = $("#"+field);
		f.selector[0].addEventListener('focus',clear);
		f.failText = RJO.Recruit.Failed[i];
		f.parent = $("#"+field[0]);
		f.require = true;
		f.textBox = false;
		f.selectBox = false;
	}
}
RJO.Recruit.specializeForm = function(){
	// Set textbox
	RJO.Recruit.Form.name.textBox = true;
	RJO.Recruit.Form.dorm.textBox = true;
	RJO.Recruit.Form.tele.textBox = true;
	RJO.Recruit.Form.info.textBox = true;

	// Set selectbox

	RJO.Recruit.Form.school.selectBox = true;
	RJO.Recruit.Form.first.selectBox = true;
	RJO.Recruit.Form.second.selectBox = true;
	
	// Set not require fields
	RJO.Recruit.Form.second.require = false;
	RJO.Recruit.Form.info.require = false;
	
	// Set parent
	RJO.Recruit.Form.second.parent = $("#s2");

	// Set regexp fields
	RJO.Recruit.Form.dorm.reg = /^C([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i;
	RJO.Recruit.Form.tele.reg = /^1[0-9]{10}$/;
}

RJO.Recruit.clearField = function(f){
	if(!f.selector.hasClass("fail")) return;
	if(f.textBox) f.selector.val("");
	f.selector.removeClass("fail");
	f.parent.removeClass("fail-div");
}
RJO.Recruit.clearAllFields = function(){
	for(var key in RJO.Recruit.Form){
		RJO.Recruit.clearField(RJO.Recruit.Form[key]);
	}
}
RJO.Recruit.addFail = function(f){
	if(f.textBox) f.selector.val(f.failText);
	f.selector.addClass("fail");
	f.parent.addClass("fail-div");
}
RJO.Recruit.validField = function(f){
	if(!f.require) return true;
	if(f.textBox){
		var text = f.selector.val();
		if(!text || text=='') return "unfilled";
		if(f.reg && !f.reg.test(text)) return "unformat";
		return true;
	} 
	if(f.selectBox){
		var index = Number(f.selector.val());
		return index>0 ? true : "unfilled";
	}
	return true;
}
RJO.Recruit.makeForm();

RJO.Recruit.Submit.click(submitRecruit.bind(this));
RJO.Recruit.Back.click(gotoMenu.bind(this));

RJO.Recruit.AlertMenu.click(gotoMenu.bind(this));
RJO.Recruit.AlertQuer.click(gotoQuery.bind(this));
RJO.Recruit.AlertBack.click(closeAlert.bind(this));

// Main process
function gotoQuery(){
	var href;
	if(RJO.Recruit.QueryTele)
		href ="query.php?name="+encodeURI(RJO.Recruit.QueryName)+" tele="+RJO.Recruit.QueryTele+"";
	else 
		href = "query.php";
	//href = encodeURI(encodeURI(href));
	RJO.Recruit.QueryTele = RJO.Recruit.QueryName = null;
	window.location.replace(href);
}
function gotoMenu(){
	window.open("index.php", "_self");
}

function validAll(){
	var flag = true;
	for(var key in RJO.Recruit.Form){
		var f=RJO.Recruit.Form[key];
		var fg = RJO.Recruit.validField(f);
		if(fg !== true){
			RJO.Recruit.addFail(f);
			if(flag===true) flag=fg;
		}
	}
	if( Number(RJO.Recruit.Form.second.selector.val()) != 0 && 
		Number(RJO.Recruit.Form.first.selector.val()) === 
		Number(RJO.Recruit.Form.second.selector.val())){
		RJO.Recruit.addFail(RJO.Recruit.Form.first);
		RJO.Recruit.addFail(RJO.Recruit.Form.second);
		if(flag===true) flag = "repeated";
	}	
	return flag;
}
function makeSend(){
	var send = {};
	for(var key in RJO.Recruit.Form){
		var f=RJO.Recruit.Form[key];
		if(f.textBox)
			send[key] = f.selector.val();
		else if(f.selectBox)
			send[key] = Number(f.selector.val());
		else
			send[key] = Number($("input[name="+key+"]:checked").val());
	}
	return send;
}

function dealRecruitResult(data){
	switch(data.type){
		case 0: alertMessage("未知错误，报名失败...",true);break;
		case 1: alertMessage("恭喜！报名成功！",false,1);break;
		case 2: alertMessage("你似乎已经报名过了！",true);break;
	}
}

function submitRecruit(){
	RJO.Recruit.clearAllFields();
	var valid = validAll();
	if(valid===true){
		var send = makeSend();
		
		RJO.Recruit.QueryTele = send.tele;
		RJO.Recruit.QueryName = send.name;

		console.info(send);
		RJO.Recruit.SendAJAX("POST", send, dealRecruitResult);
		// send AJAX:
		
		// *local:
		/*var data = {};
		if(RJO.LocalRecord[send.tele]) data.type = 2;
		else{
			RJO.LocalRecord[send.tele] = true;
			data.type = 1;   data.info = send;
		}
		*/
		
		//dealRecruitResult(data);
	}else{
		switch(valid){
			case "unfilled":
				alertMessage("信息不全！",true);break;
			case "unformat":
				alertMessage("格式有误！",true);break;
			case "repeated":
				alertMessage("第一志愿与第二志愿相同！",true);break;
		}
	}
}

function alertMessage(msg,auto,type){
	msg = htmlEncodeJQ(msg);
	var jalertW = RJO.Recruit.AlertWindow;
	var jalertM = RJO.Recruit.AlertMsg;
	RJO.Recruit.AlertMenu.addClass("hidden");
	RJO.Recruit.AlertQuer.addClass("hidden");
	RJO.Recruit.AlertBack.addClass("hidden");
	
	RJO.Recruit.Centerer.removeClass("hidden");
	//RJO.Recruit.Centerer.addClass("centerer");
	
	jalertM[0].innerHTML = msg;  
	jalertW.finish();
	jalertW.fadeOut(0);
    //jalertW.removeClass("hidden");  
    jalertW.fadeIn(360);
	if(auto) {
		/*jalertW.height("32px");*/
		jalertW.delay(1200).fadeOut(360,closeCenterer.bind(this));//.addClass("hidden");
	}else{
		jalertW.delay(1200).fadeOut(360,gotoQuery.bind(this));
		/*jalertW.height("74px");*/
		/*
		if(type==1){	
			RJO.Recruit.AlertQuer.removeClass("hidden");
			RJO.Recruit.AlertMenu.removeClass("hidden");
		}
		if(type==2){
			RJO.Recruit.AlertQuer.removeClass("hidden");
			RJO.Recruit.AlertBack.removeClass("hidden");
		}*/
	}
}
function closeAlert(){
	var jalertW = RJO.Recruit.AlertWindow;
	jalertW.fadeOut(360);
	closeCenterer();
}

function closeCenterer(){
	RJO.Recruit.Centerer.addClass("hidden");
	RJO.Recruit.Centerer.removeClass("centerer");
}

