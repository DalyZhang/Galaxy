// JavaScript Document
// Others
function getQueryString(name) { 
	var reg = new RegExp(name+"=([^ ]+)", "g"); 
	var text = window.location.search.replace("%20"," ");
	var r = text.substr(1).match(reg); 
	if (r) return (RegExp.$1); return null; 
} 
function htmlEncodeJQ( str ) {  
    return $('<span/>').text( str ).html();  
}  


// Basic Settings

var RJO = RJO || {};
RJO.Query = RJO.Query || {};

RJO.Query.NameQ  = decodeURI(getQueryString('name'));
RJO.Query.TeleQ  = getQueryString('tele');

RJO.Query.DemoData = {
				"name" : "Demo",        //string    一定格式的文本（限制字符数量）
				"gender" : 1,           //number    1到2的整数（1“男”，2“女”）
				"school" : 5,           //number    1到28的整数（对应各个学院，编号由前端决定）
				"dorm" : "C5-210",      //string    一定格式的文本
				"tele" : "12345678910", //string    一定格式的文本（开头为1的11个数字字符的文本）
				"first" : 2,            //number    1到10的的整数（对应各个部门，编号由前端决定，下同）
				"second" : 6,           //number    1到11的整数（11含义为不填）
				"obey" : 1,             //number    0到1的整数（0“不服从”，1“服从”）
				"info" : "Info Demo"         //string    一定格式的文本（限制字符数量）
			}

RJO.Query.Fields = ["Name","Gender","School","Dorm","Tele","First","Second","Obey","Info","Status"];
RJO.Query.Failed = ["你的名字是？","性别呢？","学院呢？","要正确填写宿舍哦？","要正确填写手机号哦？","还没填第一志愿呢","","服不服0.0",""];
RJO.Query.Schools = ["","机械与汽车工程学院","建筑学院","土木与交通学院","电子与信息学院","材料科学与工程学院","化学与化工学院",
"轻工科学与工程学院","食品科学与工程学院","数学学院","物理与光电学院","经济与贸易学院","自动化科学与工程学院","计算机科学与工程学院",
"电力学院","生物科学与工程学院","环境与能源学院","软件学院","工商管理学院","公共管理学院","马克思主义学院","外国语学院","法学院",
"新闻与传播学院","艺术学院","体育学院","设计学院","医学院","国际教育学院"];

RJO.Query.Departments = ["无","编辑部","综合管理部","综合新闻部","外联部","策划推广部","节目部","人力资源部","技术部","视频部","视觉设计部"];

RJO.Query.NameQuery = $("#name-quer");
RJO.Query.TeleQuery = $("#tele-quer");
RJO.Query.Tips = $("#tips");
RJO.Query.BottomTips = $("#bottom-tips");

RJO.Query.Centerer = $("#centerer");

RJO.Query.AlertWindow = $("#alert-window");
RJO.Query.AlertMsg = $("#alert-msg");

RJO.Query.Edit = $("#edit");
RJO.Query.Quer = $("#quer");
RJO.Query.Next = $("#next");
RJO.Query.Back = $("#back");
RJO.Query.Form = {};
RJO.Query.Data = {};
RJO.Query.PHPPath1 = "php/quy.php";
RJO.Query.PHPPath2 = "php/mdy.php";

// type: 'POST'  url: php path  
// data: json    success: function to call back
RJO.SendAJAX = function(type,url,data,success){
	data = {data : JSON.stringify(data)};
	$.ajax({
        type:type, url:url,
        data:data, success: function(data){
			success(JSON.parse(data));
		}.bind(this)
    });
}

RJO.Query.SendAJAX1 = function(type,data,success){
    RJO.SendAJAX(type,RJO.Query.PHPPath1,data,success);
}
RJO.Query.SendAJAX2 = function(type,data,success){
    RJO.SendAJAX(type,RJO.Query.PHPPath2,data,success);
}

RJO.Query.makeForm = function(){
	RJO.Query.makeBaseForm();
	RJO.Query.specializeForm();
}
RJO.Query.makeBaseForm = function(){
	for(var i=0;i<RJO.Query.Fields.length;i++){
		var key = RJO.Query.Fields[i];
		var field = key.toLowerCase();
		var f = RJO.Query.Data[field] = {};
		var dealClick = RJO.Query.dealClick.bind(this,f);
		var dealDbclick = RJO.Query.dealDbclick.bind(this,f);
		var dealDbclick_mb = RJO.Query.dealDbclick_mb.bind(this,f);
		f.key = field;
		f.selector = RJO.Query[key] = $("#"+field);
		f.selector[0].addEventListener('focus',dealClick);
		f.selector[0].addEventListener('dblclick',dealDbclick);
		f.selector[0].addEventListener('click',dealDbclick_mb);
		f.parent = $("#"+field[0]);
		f.parent[0].addEventListener('click',dealClick);
	}
	
	// Edit part
	for(var i=0;i<RJO.Query.Fields.length;i++){
		var key = RJO.Query.Fields[i];
		if(key == "Status") continue;
		var field = key.toLowerCase();
		var f = RJO.Query.Form[field] = {};
		var dealClick = RJO.Query.dealEditClick.bind(this,f);
		f.key = field;
		f.selector = RJO.Query[key+"E"] = $("#"+field+"-edit");
		f.selector[0].addEventListener('focus',dealClick);
		f.failText = RJO.Query.Failed[i];
		f.parent = $("#"+field[0]);
		f.require = true;
		f.textBox = false;
		f.selectBox = false;
	}
}
RJO.Query.specializeForm = function(){
	// Set fields visible
	RJO.Query.Data.name.visible = true;
	RJO.Query.Data.tele.visible = true;
	RJO.Query.Data.status.visible = true;
	
	// Set fields parent
	RJO.Query.Data.second.parent = $("#s2");
	RJO.Query.Data.status.parent = null;
	
	// Set fields val
	RJO.Query.Data.gender.vals = ["","男","女"];
	RJO.Query.Data.school.vals = RJO.Query.Schools;
	RJO.Query.Data.first.vals = RJO.Query.Departments;
	RJO.Query.Data.second.vals = RJO.Query.Departments;
	RJO.Query.Data.obey.vals = ["否","是"];
	
	// Edit part
	// Set textbox
	RJO.Query.Form.name.textBox = true;
	RJO.Query.Form.dorm.textBox = true;
	RJO.Query.Form.tele.textBox = true;
	RJO.Query.Form.info.textBox = true;

	// Set selectbox
	RJO.Query.Form.school.selectBox = true;
	RJO.Query.Form.first.selectBox = true;
	RJO.Query.Form.second.selectBox = true;
	
	// Set not require fields
	RJO.Query.Form.second.require = false;
	RJO.Query.Form.info.require = false;
	
	// Set parent
	RJO.Query.Form.second.parent = $("#s2");

	// Set regexp fields
	RJO.Query.Form.dorm.reg = /^C([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i;
	RJO.Query.Form.tele.reg = /^1[0-9]{10}$/;
}

RJO.Query.dealClick = function(f){
	RJO.Query.clearAllClick();
	if(f.parent)
		f.parent.addClass("selected");
}
RJO.Query.dealEditClick = function(f){
	RJO.Query.clearAllClick();
	RJO.Query.clearField(f);
	if(f.parent)
		f.parent.addClass("selected");
}

RJO.Query.removeClick = function(f){
	if(f.parent)
		f.parent.removeClass("selected");
}
RJO.Query.clearAllClick = function(){
	for(var key in RJO.Query.Data){
		RJO.Query.removeClick(RJO.Query.Data[key]);
	}
}

// Edit part
RJO.Query.dealDbclick = function(f){
	var ed = RJO.Query.Form[f.key];
	if(!ed) return;
	RJO.Query.dealClick(f);
	RJO.Query.setEditValue(f);
	f.selector.addClass("hidden");
	ed.selector.removeClass("hidden");
	ed.selector.focus();
}
// 用来处理手机端无法触发dblclick事件
RJO.Query.dealDbclick_mb = function(f){
    if(f.touchtime && new Date().getTime() - f.touchtime < 500 ){
        RJO.Query.dealDbclick(f);
    }else{
        f.touchtime = new Date().getTime();
    }
}
RJO.Query.setEditValue = function(f){
	var ed = RJO.Query.Form[f.key];
	if(!ed) return;
	if(ed.textBox)
		ed.selector.val(f.selector[0].innerHTML.replace(/<br>/gi,"\n"));
	else if(ed.selectBox)
		ed.selector.val(f.vals.indexOf(f.selector[0].innerHTML));
	else
		$("input[name="+f.key+"][value="+f.vals.indexOf(f.selector[0].innerHTML)+"]").attr("checked", true);
}

RJO.Query.clearField = function(f){
	if(!f.selector.hasClass("fail")) return;
	if(f.textBox) f.selector.val("");
	f.selector.removeClass("fail");
	f.parent.removeClass("fail-div");
}
RJO.Query.clearAllFields = function(){
	for(var key in RJO.Query.Form){
		RJO.Query.clearField(RJO.Query.Form[key]);
	}
}
RJO.Query.addFail = function(f){
	if(f.textBox) f.selector.val(f.failText);
	f.selector.addClass("fail");
	f.parent.addClass("fail-div");
}
RJO.Query.validField = function(f){
	if(!f.require) return true;
	var q=RJO.Query.Data[f.key];
	if(f.textBox){
		var text = f.selector.hasClass("hidden") ? 
			q.selector[0].innerHTML : f.selector.val();
		if(!text || text=='') return "unfilled";
		text = text.replace(/<br>/gi,"\n")
		if(f.reg && !f.reg.test(text)) return "unformat";
		return true;
	} 
	if(f.selectBox){
		var index = Number(f.selector.hasClass("hidden") ? 
			q.vals.indexOf(q.selector[0].innerHTML) : f.selector.val());
		return index>0 ? true : "unfilled";
	}
	return true;
}



// Data deal
RJO.Query.dealData = function(data){
	switch(data.type){
		case 0:RJO.Query.setFail("你还没有报名哦~点击下方按钮报名吧！");break;
		case 1:RJO.Query.setSuccess(data.info);break;
		case 2:alertMessage("手机号与姓名不匹配！看看是怎么肥事吧..");break;
	}
}
RJO.Query.hideAllFields = function(force){
	for(var key in RJO.Query.Data){
		var f = RJO.Query.Data[key];
		if(f.parent && (force || !f.visible)) f.parent.addClass("hidden");
	}
}
RJO.Query.showAndSetupAllFields = function(info){
	for(var key in RJO.Query.Data){
		var f = RJO.Query.Data[key];
		var ed = RJO.Query.Form[key];
		if(f.parent) f.parent.removeClass("hidden");
		f.selector.removeClass("hidden");
		f.selector[0].innerHTML = (info[key] ? info[key].replace(/\n/g,"<br>") : "");
		if(ed) ed.selector.addClass("hidden");
	}
}
RJO.Query.setSuccessStatus = function(){
	RJO.Query.Tips.addClass("hidden");
	RJO.Query.BottomTips.removeClass("hidden");
	
	RJO.Query.Edit.removeClass("hidden");
	RJO.Query.Back.removeClass("hidden");
	RJO.Query.Quer.addClass("hidden");
	RJO.Query.Next.addClass("hidden");
	RJO.Query.Status.removeClass("failed");
	RJO.Query.Status.addClass("success");
	//RJO.Query.Status.width("50%");
	RJO.Query.Status[0].innerHTML = ("报名成功~请耐心等待面试信息吧！");
}
RJO.Query.setFailStatus = function(text){
	RJO.Query.Tips.removeClass("hidden");
	RJO.Query.BottomTips.addClass("hidden");
	
	RJO.Query.Quer.removeClass("hidden");
	RJO.Query.Next.removeClass("hidden");
	RJO.Query.Back.addClass("hidden");
	RJO.Query.Edit.addClass("hidden");
	RJO.Query.Status.removeClass("success");
	RJO.Query.Status.addClass("failed");
	//RJO.Query.Status.width("75%");
	RJO.Query.Status[0].innerHTML = (text);
}
RJO.Query.stringifyInfo = function(info){
	info.gender = (info.gender==1 ? "男" : "女");
	info.school = RJO.Query.Schools[info.school];
	info.first = RJO.Query.Departments[info.first];
	info.second = RJO.Query.Departments[info.second];
	info.obey = (info.obey ? "是" : "否");
	info.info = (info.info=='' ? "无" : info.info);
}
RJO.Query.setSuccess = function(info){
	RJO.Query.NameQ = info.name;
	RJO.Query.TeleQ = info.tele;
	RJO.Query.stringifyInfo(info);
	
	RJO.Query.TeleQuery.addClass("hidden");
	RJO.Query.NameQuery.addClass("hidden");
	RJO.Query.showAndSetupAllFields(info);
	RJO.Query.setSuccessStatus();
}
RJO.Query.setFail = function(text){
	RJO.Query.setFailStatus(text);
	RJO.Query.hideAllFields();
}
RJO.Query.makeForm();

RJO.Query.Edit.click(submitEdit.bind(this));
RJO.Query.Quer.click(submitQuery.bind(this));
RJO.Query.Next.click(gotoRecruit.bind(this));
RJO.Query.Back.click(gotoMenu.bind(this));

// Main process
function gotoRecruit(){	
	window.location.replace("recruit.php");
}
function gotoMenu(){
	window.open("index.php", "_self");
}

function doQuery(name, tele){
	RJO.Query.Tele.removeClass("hidden");
	var send = {name:name,tele:tele};

	RJO.Query.SendAJAX1("POST", send, RJO.Query.dealData);
	// send AJAX:
		
	// *local:
	/*var data = {};
	if(name==RJO.Query.DemoData.name && tele==RJO.Query.DemoData.tele){
		data.type = 1; data.info = RJO.Query.DemoData;
	}else data.type = 0;*/
	//RJO.Query.dealData(data);
}

if(RJO.Query.NameQ && RJO.Query.TeleQ){
	doQuery(RJO.Query.NameQ,RJO.Query.TeleQ);
}

// Edit part

function validAll(){
	var flag = true;
	for(var key in RJO.Query.Form){
		var f=RJO.Query.Form[key];
		var fg = RJO.Query.validField(f);
		if(fg !== true){
			RJO.Query.addFail(f);
			if(flag===true) flag=fg;
		}
	}
	if(RJO.Query.Form.first.selector.hasClass("hidden")){
		var q = RJO.Query.Data.first;
		RJO.Query.Form.first.selector.val(q.vals.indexOf(q.selector[0].innerHTML))
	}
	if(RJO.Query.Form.second.selector.hasClass("hidden")){
		var q = RJO.Query.Data.second;
		RJO.Query.Form.second.selector.val(q.vals.indexOf(q.selector[0].innerHTML))
	}
	if( Number(RJO.Query.Form.second.selector.val()) != 0 && 
		Number(RJO.Query.Form.first.selector.val()) === 
		Number(RJO.Query.Form.second.selector.val())){
		RJO.Query.addFail(RJO.Query.Form.first);
		RJO.Query.addFail(RJO.Query.Form.second);
		if(flag===true) flag = "repeated";
	}	
	return flag;
}
function makeSend(){
	var send = {};
	for(var key in RJO.Query.Form){
		var f=RJO.Query.Form[key];
		if(f.selector.hasClass("hidden")){
			var q=RJO.Query.Data[key];
			if(f.textBox)
				send[key] = q.selector[0].innerHTML.replace(/<br>/gi,"\n");
			else
				send[key] = q.vals.indexOf(q.selector[0].innerHTML);
		}else{
			if(f.textBox)
				send[key] = f.selector.val();
			else if(f.selectBox)
				send[key] = Number(f.selector.val());
			else
				send[key] = Number($("input[name="+key+"]:checked").val());
		}
	}
	return send;
}

function dealEditResult(data){
	switch(data.type){
		case 0: alertMessage("未知错误，修改失败...");break;
		case 1: alertMessage("修改信息成功！",true);break;
		case 2: alertMessage("该电话号码已被使用");break;
	}
}
function submitQuery(){
	var name = RJO.Query.NameQuery.val();
	var tele = RJO.Query.TeleQuery.val();
	var valid = name && tele && name!="" && tele.match(RJO.Query.Form.tele.reg);
	if(valid) doQuery(name,tele);
	else alertMessage("填写格式不正确！");
}

function submitEdit(){
	RJO.Query.clearAllFields();
	var valid = validAll();
	if(valid===true){
		var send = makeSend();
		RJO.Query.NameQ = send.name;
		RJO.Query.TeleQ = send.tele;

		RJO.Query.SendAJAX2("POST", send, dealEditResult);
		// send AJAX:
		
		// *local:
		/*var data = {};
		data.type = 1;   data.info = send;
		RJO.Query.DemoData = send;
		
		RJO.Query.QueryTele = send.tele;
		RJO.Query.QueryName = send.name;
		*/
		//dealEditResult(data);
	}else{
		switch(valid){
			case "unfilled":
				alertMessage("信息不全！");break;
			case "unformat":
				alertMessage("格式有误！");break;
			case "repeated":
				alertMessage("第一志愿与第二志愿相同！");break;
		}
	}
}

function alertMessage(msg,refresh){
	msg = htmlEncodeJQ(msg);
	var jalertW = RJO.Query.AlertWindow;
	var jalertM = RJO.Query.AlertMsg;
	
	RJO.Query.Centerer.removeClass("hidden");
	//RJO.Query.Centerer.addClass("centerer");
	
	jalertM[0].innerHTML = msg;  
	jalertW.finish();
	jalertW.fadeOut(0);
    jalertW.fadeIn(360);
	jalertW.delay(1200).fadeOut(360,closeCenterer.bind(this));
	if(refresh) doQuery(RJO.Query.NameQ,RJO.Query.TeleQ);
}
function closeCenterer(){
	RJO.Query.Centerer.addClass("hidden");
	RJO.Query.Centerer.removeClass("centerer");
}