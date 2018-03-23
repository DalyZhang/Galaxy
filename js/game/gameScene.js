// JavaScript Document

function GameScene() {
    throw new Error('This is a static class');
}

GameScene.Setting = {
    battleFieldSize : 300,
    battleBackgroundImage : 'img/StarlitSky.png',//'img/background.svg',
    bigButton : 'img/button.png',//'img/background.svg',

    battleBackgroundColor : 'rgba(128,0,192,0.2)',
    dangerBattleBackgroundColor : 'rgba(255,0,0,0.2)',

    battlerHPBar : 'img/HP.png',
    battlerTPBar : 'img/TP.png',
    battlerBarBackground : 'img/BarBG.png',

    battlerCollisionDamageRate : 2.5,
    criticalRate : 2,
};


GameScene.initialize = function() {
    this._stopped = false;
    this._skipCount = 0;
    this._maxSkip = 3
    this._gameEnd = 0;

    this._score = 0;
    
    this.initBattlers();

    this._updateSize();
    this._createAllElements();
    this._setupEventHandlers();

    this.requestUpdate();
};
GameScene.initBattlers = function() {
    this._player = new Battler(RJO.Battlers.player,true);
    this._battlers = [this._player];
    this._enemies = [];
};
GameScene.pushBattler = function(battler) {
    this._battlers.push(battler);
};
GameScene.pushEnemy = function(enemy) {
    this._enemies.push(enemy);
    this.pushBattler(enemy);
};
GameScene.player = function() {
    return this._player;
};
GameScene.enemies = function() {
    return this._enemies;
};


GameScene.frameCount = 0;

GameScene.render = function(stage) {
    if (this._skipCount === 0) {
        var startTime = Date.now();
        if (stage) {
            this._renderer.render(stage);
        }
        var endTime = Date.now();
        var elapsed = endTime - startTime;
        this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
    } else {
        this._skipCount--;
    }
    this.frameCount++;
};

GameScene.stopGame = function() {
    this._stopped = true;
};
GameScene.resumeGame = function() {
    this._stopped = false;
    this.requestUpdate();
};
GameScene.renderGame = function() {
    this.render(this._stage);
};
GameScene.requestUpdate = function() {
    if (!this._stopped) {
        requestAnimationFrame(this.update.bind(this));
    }
};
GameScene.restartGame = function() {
    this.initialize();
    this.hideGameOver();
};
GameScene.hideGameOver = function() {
    RJO.Game.Lose.fadeOut(0);
    RJO.Game.Lose.addClass("hidden");
};
GameScene.gameOver = function() {
    RJO.Game.Result[0].innerHTML = this._score;
    RJO.Game.Lose[0].style.display = 'inline';
    RJO.Game.Lose.removeClass("hidden");
    RJO.Game.Lose.addClass("shown");
    RJO.Game.Lose.fadeOut(0);
    RJO.Game.Lose.fadeIn(1000);
};

GameScene.update = function() {
    var newTime = this._getTimeInMs();
    var fTime = (newTime - this._currentTime) / 1000;
    if (fTime > 0.25) fTime = 0.25;
    this._currentTime = newTime;
    this._accumulator += fTime;
    while (this._accumulator >= this._deltaTime) {
        this.updateScene();
        this._accumulator -= this._deltaTime;
    }
    this.updateGame();
    this.renderGame();
    this.requestUpdate();
};

GameScene.update = function() {
    this.updateGame();
    this.renderGame();
    this.requestUpdate();
};

GameScene.updateGame = function() {
    this._updateStage();
};
GameScene.battleWidth = function() {
    return GameScene.Setting.battleFieldSize;
};



GameScene._createAllElements = function() {
    this._createCanvas();
    this._createUpperCanvas();
    this._createRenderer();
    this._createStage();
};
GameScene._updateAllElements = function() {
	this._updateSize();
    this._updateCanvas();
    this._updateUpperCanvas();
    this._updateRenderer();
};

GameScene._updateSize = function() {
	this._width = window.innerWidth;
	this._height = window.innerHeight;
};

GameScene._createCanvas = function() {
    this._canvas = document.createElement('canvas');
    this._canvas.id = 'GameCanvas';
    this._updateCanvas();
    document.body.appendChild(this._canvas);
};
GameScene._updateCanvas = function() {
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._canvas.style.zIndex = 1;
    this._centerElement(this._canvas);
};

GameScene._createUpperCanvas = function() {
    this._upperCanvas = document.createElement('canvas');
    this._upperCanvas.id = 'UpperCanvas';
    this._updateUpperCanvas();
    document.body.appendChild(this._upperCanvas);
};
GameScene._updateUpperCanvas = function() {
    this._upperCanvas.width = this._width;
    this._upperCanvas.height = this._height;
    this._upperCanvas.style.zIndex = 3;
    this._centerElement(this._upperCanvas);
};

GameScene._createStage = function() {
	this._stage = new PIXI.Container();
    this._createBackground();
    this._createScore();
    this._createBattleField();
    this._createDangerBattleField();
    this._createButton();

    this._createPlayer();
};
GameScene._createBackground = function() {
    var texture = new PIXI.Texture.fromImage(GameScene.Setting.battleBackgroundImage);//(new PIXI.BaseTexture(background));
    this._background = new PIXI.extras.TilingSprite(texture, this._width, this._height);
    this._stage.addChild(this._background); 
};
GameScene._createScore = function() {
    var canvas = document.createElement('canvas');
    canvas.width = GameScene.Setting.battleFieldSize;
    canvas.height = this._height;
    canvas.style.width = canvas.width+'px';
    canvas.style.height = canvas.height+'px';

    var texture = new PIXI.Texture(new PIXI.BaseTexture(canvas));
    this._scoreDisplay = new PIXI.Sprite(texture);
    this._scoreDisplay.anchor = {x:0.5, y:0.5};
    this._scoreDisplay.x = this._width/2;
    this._scoreDisplay.y = this._height/2;    

    this._stage.addChild(this._scoreDisplay); 
};
GameScene._createBattleField = function() {
    var battleField = document.createElement('canvas');
    this._setupBattleField(battleField);

    var texture = new PIXI.Texture(new PIXI.BaseTexture(battleField));
    this._battleField = new PIXI.Sprite(texture);
    this._battleField.anchor.x = 0.5;
    this._battleField.position.x = this._width/2;
    this._stage.addChild(this._battleField); 
};
GameScene._setupBattleField = function(battleField) {
    var context = battleField.getContext('2d');    
    battleField.width = GameScene.Setting.battleFieldSize;
    battleField.height = this._height;
    battleField.style.width = battleField.width+'px';
    battleField.style.height = battleField.height+'px';

    context.save();
    context.fillStyle = GameScene.Setting.battleBackgroundColor;
    context.fillRect(0, 0, battleField.width, battleField.height);
    context.restore();
};
GameScene._createDangerBattleField = function() {
    var battleField = document.createElement('canvas');
    this._setupDangerBattleField(battleField);

    var texture = new PIXI.Texture(new PIXI.BaseTexture(battleField));
    this._dBattleField = new PIXI.Sprite(texture);
    this._dBattleField.anchor.x = 0.5;
    this._dBattleField.position.x = this._width/2;
    this._dBattleField.alpha = 0;
    this._stage.addChild(this._dBattleField); 
};
GameScene._setupDangerBattleField = function(battleField) {
    var context = battleField.getContext('2d');    
    battleField.width = GameScene.Setting.battleFieldSize;
    battleField.height = this._height;
    battleField.style.width = battleField.width+'px';
    battleField.style.height = battleField.height+'px';

    context.save();
    context.fillStyle = GameScene.Setting.dangerBattleBackgroundColor;
    context.fillRect(0, 0, battleField.width, battleField.height);
    context.restore();
};
GameScene._createPlayer = function() {
    this._player.sprite().anchor = {x:0.5, y:0.5};
    this._player.sprite().x = 0;
    this._player.sprite().y = this._height-48; 
    this._player.sprite().refreshPosition();
    this._player.setShooting(true);

    this._playerHP = new BattlerHPSprite(this._player);
    this._playerHP.y = this._height;
    this._player.sprite().setHpShow(this._playerHP);

    function create(){
        this._playerTP = new BattlerTPSprite(this._player);
        this._playerTP.y = this._height-this._playerHP.height;
        this._player.sprite().setTpShow(this._playerTP);

        this._battleField.addChild(this._playerHP); 
        this._battleField.addChild(this._playerTP); 
    }

    if(this._playerHP.texture.baseTexture.hasLoaded){
        this._playerTP = new BattlerTPSprite(this._player);
        this._playerTP.y = this._height-this._playerHP.height;
        this._player.sprite().setTpShow(this._playerTP);

        this._battleField.addChild(this._playerHP); 
        this._battleField.addChild(this._playerTP); 
    }else{
        this._playerHP.texture.baseTexture.on('loaded',function(){
            this._playerTP = new BattlerTPSprite(this._player);
            this._playerTP.y = this._height-this._playerHP.height;
            this._player.sprite().setTpShow(this._playerTP);

            this._battleField.addChild(this._playerHP); 
            this._battleField.addChild(this._playerTP); 
        }.bind(this));
    }
    
    this._battleField.addChild(this._player.sprite()); 
};

GameScene._createButton = function() {
    var texture = new PIXI.Texture.fromImage(GameScene.Setting.bigButton);
    this._bigButton = new PIXI.Sprite(texture);
    this._bigButton.x = this._battleField.x + this._battleField.width/2;
    this._bigButton.y = this._height;
    this._bigButton.anchor = {x:1, y:1};

    this._stage.addChild(this._bigButton);
};

GameScene._onButtonDown = function() {
    this._playerBig = true;
    this._bigButton.alpha = 0.3;
};
GameScene._onButtonUp = function() {
    this._playerBig = false;
    this._player.setStatus(0);
    this._bigButton.alpha = 1;
};

GameScene._createEnemies = function() {
    for(var i=0;i<2;i++){
        var enemy = new Battler(RJO.Battlers.enemy1);
        this.pushEnemy(enemy);
        enemy.sprite().anchor = {x:0.5, y:0.5};
        enemy.sprite().x = GameScene.Setting.battleFieldSize/2-
            Math.randomInt(GameScene.Setting.battleFieldSize);
        enemy.sprite().y = 48; 
        enemy.sprite().refreshPosition();
        enemy.setShooting(true);

        this._battleField.addChild(enemy.sprite()); 
    }
    for(var i=0;i<2;i++){
        var enemy = new Battler(RJO.Battlers.enemy2);
        this.pushEnemy(enemy);
        enemy.sprite().anchor = {x:0.5, y:0.5};
        enemy.sprite().x = GameScene.Setting.battleFieldSize/2-
            Math.randomInt(GameScene.Setting.battleFieldSize);
        enemy.sprite().y = 48; 
        enemy.sprite().refreshPosition();
        enemy.setShooting(true);

        this._battleField.addChild(enemy.sprite()); 
    }
    for(var i=0;i<2;i++){
        var enemy = new Battler(RJO.Battlers.stone);
        this.pushEnemy(enemy);
        enemy.sprite().anchor = {x:0.5, y:0.5};
        enemy.sprite().x = GameScene.Setting.battleFieldSize/2-
            Math.randomInt(GameScene.Setting.battleFieldSize);
        enemy.sprite().y = 48; 
        enemy.sprite().refreshPosition();
        enemy.setShooting(true);

        this._battleField.addChild(enemy.sprite()); 
    }
};

GameScene._updateStage = function() {
    this._updateDangerBatterField();
    this._updateStageChildren();

    this._updateScore();

    this._updatePlayerSkill();
    this._updateEnemySet();
    this._updateBattlers();

    this._updateInput();

    this._updateGameEnd();

    this._refreshBattlers();
    Input.update();
};
GameScene._updateDangerBatterField = function() {
    var danger = (this._player.hpRate() < 0.2);
    if(danger) {
        var min = 0.25, max = 0.8, spd = 0.05;
        this._shineMode = this._shineMode || -1;
        if(this._dBattleField.alpha <= min) this._shineMode = 1;
        else if(this._dBattleField.alpha >= max) this._shineMode = -1;
        this._dBattleField.alpha += spd * this._shineMode;
    }else this._dBattleField.alpha = (1-this._player.hpRate())/4;
};

GameScene._updatePlayerSkill = function() {
    if(!this._playerBig && !this._player.dead() && this._player.tpRate() >= 0.75)
        this._bigButton.visible = true;
    else{
        if(this._playerBig && this._player.tp()>0){
            this._player.setStatus(1);
            this._player.reduceTp(1);
        }else{
            this._onButtonUp();
            this._player.setStatus(0);
            this._bigButton.visible = false;
        }
    }
};
GameScene._updateEnemySet = function() {
    if(this._enemies.length<=4) this._createEnemies();
};
GameScene._updateStageChildren = function() {
    this._stage.children.forEach(function(child) {
        if (child.update) child.update();
    });
};
GameScene._updateScore = function() {
    this._score += (this._player.hpRate() < 0.2 ? 2 : 0);
    RJO.Game.Score[0].innerHTML = this._score;
    RJO.Game.Score[0].style.left = this._battleField.x-this._battleField.width/2+'px';
};

GameScene._updateBattlers = function() {
    this._battlers.forEach(function(battler) {battler.update();});
    this._updateHit();
};
GameScene._updateHit = function() {
    this._updatePlayerHit();
    this._updateEnemiesHit();
};
GameScene._updatePlayerHit = function() {
    this._updateSkillHit(this._player,this._enemies);
};
GameScene._updateEnemiesHit = function() {
    var eny = [this._player];
    for(var i=this._enemies.length-1;i>=0;i--){
        var enemy = this._enemies[i];
        if(enemy.totallyDead()) this._enemies.splice(i,1);
        else {
            this._updateSkillHit(enemy,eny);
            if(!enemy.dead()){
                eny.forEach(function(e){
                    e.checkBattler(enemy);
                }.bind(this));
            }
        }
    }
};
GameScene._updateSkillHit = function(battler,enemies) {
    var skills = battler.activatingSkills();
    skills.forEach(function(skill){
        enemies.forEach(function(enemy){
            if(!enemy.dead()) enemy.checkSkill(skill,battler);
        }.bind(this));
    }.bind(this));
};

GameScene._updateInput = function() {
    if(!Input._currentState) Input.initialize();
    if(Input.isPressed('left'))
        this._player.sprite().slide(-5);
    if(Input.isPressed('right'))
        this._player.sprite().slide(5);
    /*
    if(Input.isPressed('fire') && this._bigButton.visible) this._onButtonDown();
    else this._onButtonUp();*/
    /*
    if(Input.isPointerDown() && this._buttonValid()) return this._onButtonDown();
    if(Input.isPointerUp() && this._buttonValid()) return this._onButtonUp();*/
    if(Input.isMousePressed()){
        if(this._buttonValid()) this._onButtonDown();
        else if(this._playerBig && !this._touchIntoButton()){
            this._onButtonUp();
        }else if(!this._touchIntoButton()){
            this._player.sprite().slide(this._convertMousePositionIntoPlayer()/10);
        }
    }else this._onButtonUp();
        
};
GameScene._touchIntoButton = function() {
    var pos = Input.getMousePos();
    var x = pos.x, y = pos.y;
    var sw = this._bigButton.width;
    var sh = this._bigButton.height;
    var sx = this._bigButton.x-sw;
    var sy = this._bigButton.y-sh;
    return x>sx && x<sx+sw && y>sy && y<sy+sh;
};
GameScene._buttonValid = function() {
    return this._bigButton.visible && this._touchIntoButton();
};

GameScene._updateGameEnd = function() {
    if(this._player.dead()){
        this._gameEnd++;
        if(this._gameEnd>=60) {
            this.stopGame();
            this.gameOver();
        }
    }
};
GameScene._convertMousePositionIntoPlayer = function() {
    var pos = Input.getMousePos();
    return pos.x-(this._battleField.x+this._player.sprite().x);
};

GameScene._refreshBattlers = function() {
    this._battlers.forEach(function(battler) {
        if(battler && !battler.dead()){
            battler = battler.sprite();
            var side = this.battleWidth()/2-battler.width/2;
            battler.x = Math.min(side,Math.max(-side,battler.x));
        }
    }.bind(this));
};

GameScene._createRenderer = function() {
    PIXI.dontSayHello = true;
    var width = this._width;
    var height = this._height;
    var options = { view: this._canvas };
    try {
        this._renderer = PIXI.autoDetectRenderer(width, height, options);
        if(this._renderer && this._renderer.textureGC)
            this._renderer.textureGC.maxIdle = 1;
    } catch (e) {
        this._renderer = null;
    }
};
GameScene._updateRenderer = function() {
    if (this._renderer) {
        this._renderer.resize(this._width, this._height);
    }
};

GameScene._centerElement = function(element) {
    var width = element.width;
    var height = element.height;
    element.style.position = 'absolute';
    element.style.margin = 'auto';
    element.style.top = 0;
    element.style.left = 0;
    element.style.right = 0;
    element.style.bottom = 0;
    element.style.width = width + 'px';
    element.style.height = height + 'px';
};

GameScene._setupEventHandlers = function() {
    window.addEventListener('resize', this._onWindowResize.bind(this));
};
GameScene._onWindowResize = function() {
    this._updateAllElements();
};
