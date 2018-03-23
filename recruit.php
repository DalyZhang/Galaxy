<!doctype html>
<html>
<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
<title>百步梯报名表</title>
<link href="css/recruit.css<?php echo("?" . time());?>" rel="stylesheet" type="text/css">
</head>


<body bgcolor="#000000">
<globalization requestEncoding="gb2312" responseEncoding="gb2312">
    <script src="js/lib/jquery-3.2.1.min.js"></script>
</globalization>
<script src="js/loadingShow.js<?php echo("?" . time());?>"></script>

<div id="centerer" class="hidden">
    <div id="alert-window" class="hidden">	
        <div id="alert-msg"></div>
        <button id="alert-menu" class="alert-button hidden">返回主菜单</button>
        <button id="alert-back" class="alert-button hidden">返回继续报名</button>
        <button id="alert-quer" class="alert-button hidden">查看报名信息</button>
    </div>	
</div>

<div id="headBar">
    <img id="logo" src="img/title.png">
</div>             
<div id="main"> 
    <div id="n" class="field">
    <div class="key">名字*</div>
    <input id="name" class="textBox" spellcheck="false" maxlength="15" placeholder="输入你的大名~"/>
    </div>
    <div class="field">
    <div class="key">性别</div>
        <div class="radioBox" id="gender"> 
            <div class="radio">男
                <input type="radio" id="g1" name="gender" value="1" checked/>
                <label class="radioL" for="g1"></label>
            </div>
            <div class="radio">女
                <input type="radio" id="g2" name="gender" value="2"/>
                <label class="radioL" for="g2"></label>
            </div>
        </div>
    <!--select name="gender" id="gender" class="textBox">  
    <option value="1" selected class="option">男</option>
    <option value="2" class="option">女</option>
    </select-->
    </div>
    <div id="s" class="field">
    <div class="key">学院*</div>
            <select name="school" id="school" class="textBox">                
                <option value="0" selected>请选择</option>
                <option value="1">机械与汽车工程学院</option>
                <option value="2">建筑学院</option>
                <option value="3">土木与交通学院</option>
                <option value="4">电子与信息学院</option>
                <option value="5">材料科学与工程学院</option>
                <option value="6">化学与化工学院</option>
                <option value="7">轻工科学与工程学院</option>
                <option value="8">食品科学与工程学院</option>
                <option value="9">数学学院</option>
                <option value="10">物理与光电学院</option>
                <option value="11">经济与贸易学院</option>
                <option value="12">自动化科学与工程学院</option>
                <option value="13">计算机科学与工程学院</option>
                <option value="14">电力学院</option>
                <option value="15">生物科学与工程学院</option>
                <option value="16">环境与能源学院</option>
                <option value="17">软件学院</option>
                <option value="18">工商管理学院</option>
                <option value="19">公共管理学院</option>
                <option value="20">马克思主义学院</option>
                <option value="21">外国语学院</option>
                <option value="22">法学院</option>
                <option value="23">新闻与传播学院</option>
                <option value="24">艺术学院</option>
                <option value="25">体育学院</option>
                <option value="26">设计学院</option>
                <option value="27">医学院</option>
                <option value="28">国际教育学院</option>
            </select>
    </div>
    <div id="d" class="field">
    <div class="key">宿舍*</div>
    <input id="dorm" class="textBox" spellcheck="false" placeholder="格式为Cx-xxx（例：C10-548）"/>
    </div>
    <div id="t" class="field">
    <div class="key">手机*</div>
    <input id="tele" class="textBox" spellcheck="false" placeholder="输入11位手机号码"/>
    </div>
    <div id="f" class="field">
    <div class="key">第一志愿*</div>
    <select name="first" id="first" class="textBox">
        <option value="0" selected>请选择</option>
        <option value="1">编辑部</option>
        <option value="2">综合管理部</option>
        <option value="3">综合新闻部</option>
        <option value="4">外联部</option>
        <option value="5">策划推广部</option>
        <option value="6">节目部</option>
        <option value="7">人力资源部</option>
        <option value="8">技术部</option>
        <option value="9">视频部</option>
        <option value="10">视觉设计部</option>
    </select>
    </div>
    <div id="s2" class="field">
    <div class="key">第二志愿</div>
    <select name="second" id="second" class="textBox">
        <option value="0" selected>选填</option>
        <option value="1">编辑部</option>
        <option value="2">综合管理部</option>
        <option value="3">综合新闻部</option>
        <option value="4">外联部</option>
        <option value="5">策划推广部</option>
        <option value="6">节目部</option>
        <option value="7">人力资源部</option>
        <option value="8">技术部</option>
        <option value="9">视频部</option>
        <option value="10">视觉设计部</option>
    </select>
    </div>
    <div class="field">
    <div class="key">服从调剂</div>
        <div class="radioBox" id="obey"> 
            <div class="radio">是
                <input type="radio" id="o1" name="obey" value="1" checked/>
                <label for="o1"></label>
            </div>
            <div class="radio">否
                <input type="radio" id="o2" name="obey" value="0"/>
                <label for="o2"></label>
            </div>
        </div>
    </div>

    <div class="field"><div class="key">自我介绍</div></div>
    <textarea name="info" rows="4" wrap="hard" class="textBox" id="info" spellcheck="false" maxlength="100" placeholder="展示一下自己吧~（100字以内）"></textarea>

    <div class="tips">注意：带*的为必填项哦~</div>
</div>
<div id="buttons">
    <button id="submit" class="left">提交</button>
    <button id="back" class="right">返回</button>
</div>
<script src="js/recruitMain.js<?php echo("?" . time());?>"></script>
</body>

</html>
