
function Battler() {
    this.initialize.apply(this, arguments);
}
/*
battler:
    mhp,atk,def,agi,pic
*/
Battler.prototype.initialize = function(battler, player) {
    this._battler = battler;
    this._player = player || false;

    this.initBattlerParams();
    this.makeBattlerSprite();

    this._visible = true;
    // AI
    this._count = 0; this._dir = -1;
};

Battler.prototype.battler = function() {return this._battler};
Battler.prototype.initBattlerParams = function() {
    var battler = this._battler;
    this._name = battler.name;
    this._mhp = this._hp = battler.mhp;
    this._mtp = 100; this._tp = 0;
    this._atk = battler.atk;
    this._def = battler.def;
    this._agi = battler.agi;
    this._speed = battler.speed;
    this._skills = battler.skills;
    if(this._skills) this.makeSkillCDList();

    this._status = 0; // 玩家使用大招

    this._aiType = battler.aiType;
    this._score = battler.score;
    this._hurtMove = battler.hurtMove;
};
Battler.prototype.makeSkillCDList = function() {
    this._activatingSkills = [];
    this._skillCD = {};
    this._skills.forEach(function(skill){this._skillCD[skill]=0;}.bind(this));
};
Battler.prototype.makeBattlerSprite = function() {
    var battler = this._battler;
    var texture = new PIXI.Texture.fromImage(battler.pic);
    var idleAni = this._player ? 'idle' : 'forward';
    this._sprite = new BattlerSprite(texture,this,idleAni);
};
Battler.prototype.pushToStage = function(stage) {
    stage.addChild(this._sprite); 
};

Battler.prototype.useSkill = function(skill) {
    var ski = new SkillSprite(this,skill);
    this._skillCD[skill.id] = skill.cd;
    this._activatingSkills.push(ski);
};
Battler.prototype.skillUsable = function(skill) {
    return this._skillCD[skill.id] <= 0;
};

Battler.prototype.refresh = function() {
    this._hp = Math.max(0,Math.min(this._mhp,this._hp));
    this._tp = Math.max(0,Math.min(this._mtp,this._tp));
    if(this._hp<=0) {
        if(!this._player) GameScene._score+=this._score;
        this.die();
    }
};
Battler.prototype.die = function() {
    this._die = true;
    this._shooting = false;
    this._visible = false;
};
Battler.prototype.dead = function() {
    return this._die || this.outOfRange();
};
Battler.prototype.totallyDead = function() {
    return this.dead() && this.activatingSkills().length<=0;
};

Battler.prototype.update = function() {
    this.updateStatus();
    this.updateAI();
    this._sprite.update();
};

Battler.prototype.updateStatus = function() {
    this._unMovable = this.dead();
    this._unSkillable = this._sprite.hurting() || this.dead();
};

Battler.prototype.updateAI = function() {
    this.updateMove();
    this.updateSkills();
};
Battler.prototype.updateMove = function() {
    if(this._player) return;
    if(this._unMovable) return;
    switch(this._aiType){
        case 1:
            if(this._dir<0 || (this._count++)%25==0) this._dir = Math.randomInt(3);
            if(this._dir==2) return;
            var speed = Math.randomInt(5)+1;
            this._sprite.slide(this._dir ? -speed : speed);
            break;
        case 2:
            if(this._dir<0 || (this._count++)%25==0) this._dir = Math.randomInt(4);
            if(this._dir==3) return;
            var px = GameScene.player().sprite().x;
            var tx = this._sprite.x;
            var speed = (Math.randomInt(5)+1)*(tx>px ? -1 : 1);
            this._sprite.slide(this._dir ? speed : -speed);
            break;
    }
};
Battler.prototype.updateSkills = function() {
    if(!this._skills) return;
    this.updateSkillCD();
    this.updateUsingSkills();
    this.updateUseSkill();
};
Battler.prototype.updateUsingSkills = function() {
    for(var i=this._activatingSkills.length-1;i>=0;i--){
        var skill = this._activatingSkills[i];
        //console.log("For:",i);
        if(skill._distroy) this._activatingSkills.splice(i,1);
        else skill.update();
        //console.log(this._activatingSkills);
    }
};
Battler.prototype.updateSkillCD = function() {
    for(var i in this._skillCD) if(this._skillCD[i]>0) this._skillCD[i]--;
};
Battler.prototype.updateUseSkill = function() {
    if(this._unSkillable || !this._shooting) return;
    if(this._player) this.updatePlayerSkill();
    else this.updateAISkill();
};
Battler.prototype.updatePlayerSkill = function() {
    if(this.skillUsable(this.skills()[this._status]))
        this.useSkill(this.skills()[this._status]);
};
Battler.prototype.updateAISkill = function() {
    if(this.skillUsable(this.skills()[0]))
        this.useSkill(this.skills()[0]);
};

Battler.prototype.outOfRange = function() {
    if(this._die) return true;
    return this._sprite.y < 0 || this._sprite.y > this._sprite.parent.height;
};


Battler.prototype.player = function() {return this._player};

Battler.prototype.name = function() {return this._name};
Battler.prototype.hp = function() {return this._hp};
Battler.prototype.mhp = function() {return this._mhp};
Battler.prototype.hpRate = function() {return this._hp / this._mhp};
Battler.prototype.tp = function() {return this._tp};
Battler.prototype.mtp = function() {return this._mtp};
Battler.prototype.tpRate = function() {return this._tp / this._mtp};
Battler.prototype.atk = function() {return this._atk};
Battler.prototype.def = function() {return this._def};
Battler.prototype.agi = function() {return this._agi};
Battler.prototype.speed = function() {return this._speed};
Battler.prototype.score = function() {return this._score};
Battler.prototype.hurtMove = function() {return this._hurtMove};

Battler.prototype.sprite = function() {return this._sprite};
Battler.prototype.skills = function() {
    return this._skills ? this._skills.map(function(s){return RJO.Skills[s];}) : [];
};
Battler.prototype.activatingSkills = function() {
    return this._activatingSkills || [];
};

Battler.prototype.status = function() {return this._status};
Battler.prototype.setStatus = function(value) {
    this._status = value;
};

Battler.prototype.visible = function() {return this._visible};
Battler.prototype.setVisible = function(value) {
    this._visible = value;
};
Battler.prototype.shooting = function() {return this._shooting};
Battler.prototype.setShooting = function(value) {
    this._shooting = value;
};

Battler.prototype.setHp = function(value) {
    this._hp = value; this.refresh();
};
Battler.prototype.setTp = function(value) {
    this._tp = value; this.refresh();
};
Battler.prototype.reduceTp = function(value) {
    this.setTp(this._tp - value);
};
Battler.prototype.hurt = function(value) {
    this.setTp(this._tp + Math.round(value*250/this._hp));
    this.setHp(this._hp - value);
    this._sprite.setupAni('hurt');
};

Battler.prototype.checkSkill = function(skill,battler) {
    var bullet = skill.checkHit(this);
    if(bullet){
        this.dealDamage(bullet.bullet(),battler);
        if(skill.skill().once) bullet.destroy();
    }
};
Battler.prototype.checkBattler = function(battler) {
    var sprite = battler.sprite();
    if(this.checkSpriteHit(sprite)){
        this.dealCollisionDamage(battler);
        sprite.destroy();
    }
};
Battler.prototype.checkSpriteHit = function(battler) {
    var sprite = this._sprite;
    var sx = sprite.x - sprite.width/2; sw = sprite.width;
    var sy = sprite.y - sprite.height/2;sh = sprite.height;
    var bx = battler.x - battler.width/2; bw = battler.width;
    var by = battler.y - battler.height/2;bh = battler.height;
    return (sx+sw>bx)&&(bx+bw>sx)&&(sy+sh>by)&&(by+bh>sy);
};
Battler.prototype.dealDamage = function(bullet,battler) {
    var value = battler.atk()*bullet.rate - this._def;
    if(value<=0) value = 1;
    this.hurt(Math.round(value));
};
Battler.prototype.dealCollisionDamage = function(battler) {
    var rate = GameScene.Setting.battlerCollisionDamageRate;
    var value = battler.atk()*rate - this._def;
    if(value<=0) value = 1;
    this.hurt(Math.round(value));
};


function BattlerSprite() {
    this.initialize.apply(this, arguments);
}

BattlerSprite.prototype = Object.create(PIXI.Sprite.prototype);
BattlerSprite.prototype.constructor = BattlerSprite;

BattlerSprite.prototype.initialize = function(texture,battler,idleAni) {
    this._battler = battler;
    PIXI.Sprite.call(this, texture);

    this._oriX = 0; this._oriY = 0;
    this._aniMode = this._idleAni = idleAni;
    this._aniCount = 0;

    this._hpShow = null;
    this._tpShow = null;
};

BattlerSprite.prototype.slide = function(deltaX) {
    this._oriX = (this.x += deltaX);
};
BattlerSprite.prototype.move = function(x, y) {
    this._oriX = this.x = x;
    this._oriY = this.y = y;
};
BattlerSprite.prototype.refreshPosition = function() {
    this._oriX = this.x;
    this._oriY = this.y;
};
BattlerSprite.prototype.resetPosition = function() {
    this.x = this._oriX;
    this.y = this._oriY;
};

BattlerSprite.prototype.setupAni = function(ani) {
    if(this._aniMode != ani){
        this.resetPosition();
        this._aniMode = ani;
        this._aniCount = 0;
        this.alpha = 1;
    } 
};
BattlerSprite.prototype.setHpShow = function(sprite) {
    this._hpShow = sprite;
};
BattlerSprite.prototype.setTpShow = function(sprite) {
    this._tpShow = sprite;
};

BattlerSprite.prototype.hurting = function() {return this._aniMode == 'hurt';};

BattlerSprite.prototype.update = function() {
    this.updateBattler();
    this.updateAni();
    this.updateChildren();
};

BattlerSprite.prototype.updateBattler = function() {
    this.visible = this._battler.visible();
};

BattlerSprite.prototype.updateAni = function() {
    this._aniCount++;
    this.processAni(this._aniMode);
};
BattlerSprite.prototype.processAni = function(ani) {
    switch(ani){
        case 'hurt': this.updateHurt(); break;
        case 'forward' : this.updateForward(); break;
        case 'idle': this.updateIdle(); break;
    }
};
BattlerSprite.prototype.updateForward = function() {
    this.y = (this._oriY += this._battler.speed());
};
BattlerSprite.prototype.updateIdle = function() {
    if(this._aniCount%3==0){
        var cnt = this._aniCount%60;
        if(cnt<30) this.y -= 1;
        else if(cnt<60) this.y += 1;
    }
};
BattlerSprite.prototype.updateHurt = function() {
    var cnt = this._aniCount%6;
    if(cnt<3) this.alpha = 0.2;
    else if(cnt<6) this.alpha = 1;

    if(this._aniCount>=42) this.setupAni(this._idleAni);

    if(this._battler.hurtMove()) this.processAni(this._idleAni);
};


BattlerSprite.prototype.updateChildren = function() {
    this.children.forEach(function(child) {
        if (child.update) child.update();
    });
    if(this._hpShow) this._hpShow.update();
    if(this._tpShow) this._tpShow.update();
};
BattlerSprite.prototype.destroy = function() {
    if(this._distroy) return;
    this._battler.die();
    this.visible = false; 
    this._distroy = true;
};


function SkillSprite() {
    this.initialize.apply(this, arguments);
}
SkillSprite.prototype = Object.create(PIXI.Sprite.prototype);
SkillSprite.prototype.constructor = SkillSprite;

SkillSprite.prototype.initialize = function(battler, skill) {
    var texture = new PIXI.Texture(new PIXI.BaseTexture());

    PIXI.Sprite.call(this, texture);

    this._battler = battler;
    this._skill = skill;
    this.createBullets();
};
SkillSprite.prototype.createBullets = function() {
    var sprite = this._battler.sprite();
    var x = sprite.x; var y = sprite.y;
    var dir = this._battler.player();
    this._bullets = [];
    this._skill.bullets.forEach(function(bullet){
        var bullet = new BulletSprite(bullet,x,y,dir);
        this._bullets.push(bullet);
        sprite.parent.addChild(bullet);
    }.bind(this));
};

SkillSprite.prototype.setParent = function(parent) {
    this._bullets.forEach(function(bullet){
       parent.addChild(bullet);
    }.bind(this));
};

SkillSprite.prototype.bullets = function() {
    return this._bullets;
};
SkillSprite.prototype.skill = function() {
    return this._skill;
};

SkillSprite.prototype.checkHit = function(enemy) {
    for(var i=0;i<this._bullets.length;i++){
        var bullet = this._bullets[i];
        if(enemy.checkSpriteHit(bullet)) return bullet;
    }
    return false;
};

SkillSprite.prototype.update = function() {
    //console.log("SkillSprite.update");
    this.updateBullets();
};

SkillSprite.prototype.updateBullets = function() {
    if(this._distroy) return;
    
    //console.log(this._bullets);
    
    for(var i=this._bullets.length-1;i>=0;i--){
        var bullet = this._bullets[i];
        //console.log("A",this._bullets.length);
        //console.log(bullet._distroy);
        if(bullet.isDestroy()) this._bullets.splice(i,1);
        else bullet.update();
        //console.log("B",this._bullets.length);
    }
    //console.log("End");
    //console.log(this._bullets);
    if(this._bullets.length<=0) this._distroy = true;
};




function BulletSprite() {
    this.initialize.apply(this, arguments);
}

BulletSprite.prototype = Object.create(PIXI.Sprite.prototype);
BulletSprite.prototype.constructor = BulletSprite;

BulletSprite.prototype.initialize = function(bullet,x,y,dir) {
    var texture = new PIXI.Texture.fromImage(bullet.pic);
    PIXI.Sprite.call(this, texture);

    this._bullet = bullet;
    this._oriX = this.x = x;
    this._oriY = this.y = y;
    this.anchor = {x:0.5,y:0.5};

    this._dir = dir;

    this._speed = bullet.speed;
    this._effects = bullet.effects;
    this.setupAngle(bullet.angle);
    this._count = 0;
};
BulletSprite.prototype.bullet = function() {return this._bullet;}

BulletSprite.prototype.setupAngle = function(angle) {
    var rad = angle/180*Math.PI;
    this._moveAngle = (this._dir ? -rad : rad);
    this.rotation = (this._dir ? rad-Math.PI/2 : rad-Math.PI*3/2);
};
BulletSprite.prototype.update = function() {
    this.updateMove();
    this.updateEffects();
    if(this.parent) this.updateOut();
};

BulletSprite.prototype.updateMove = function() {
    var d = this._speed;
    this.x += d*Math.cos(this._moveAngle);
    this.y += d*Math.sin(this._moveAngle);
};

BulletSprite.prototype.updateEffects = function() {
    this._effects.forEach(function(effect){
        this.processEffect(effect);
    }.bind(this));
};
BulletSprite.prototype.processEffect = function(effect) {
    var params = effect.params;
    switch(effect.type){
        case 'zoom': this.updateZoom(params); break;
        case 'shine': this.updateShine(params); break;
        case 'ghost': this.updateGhost(params); break;
        case 'tint': this.updateTint(params); break;
    }
};
BulletSprite.prototype.updateZoom = function(data) {
    this.scale = {x:data[0], y:data[1]};
};
BulletSprite.prototype.updateShine = function(data) {
    var min = data[0], max = data[1], spd = data[2];
    this._shineMode = this._shineMode || -1;
    if(this.alpha <= min) this._shineMode = 1;
    else if(this.alpha >= max) this._shineMode = -1;
    this.alpha += spd * this._shineMode;
};

BulletSprite.prototype.updateGhost = function(data) {
    var spd = data[0], dur = data[1];
    this._ghosts = this._ghosts || [];
    if(this._count%spd==0) this.createGhost(dur);
    for(var i=this._ghosts.length-1;i>=0;i--){
        var ghost = this._ghosts[i];
        if(ghost._distroy) this._ghosts.splice(i,1);
        else ghost.update();
    }
};
BulletSprite.prototype.createGhost = function(duration) {
    if(this.parent) this._ghosts.push(new GhostSprite(this,duration));
};
BulletSprite.prototype.updateTint = function(data) {

};


BulletSprite.prototype.outOfRange = function() {
    return this.x < -this.parent.width/2 || this.x > this.parent.width/2 || 
            this.y < 0 || this.y > this.parent.height;
};
BulletSprite.prototype.updateOut = function() {
    this._count++;
    if(this._count>=10000 || this.outOfRange()) 
        this.destroy();
};
BulletSprite.prototype.destroy = function() {
    if(this._distroy) return;
    this.parent.removeChild(this); 
    this._distroy = true;
};
BulletSprite.prototype.isDestroy = function() {
    if(!this._distroy) return false;
    if(this._ghosts && this._ghosts.length>0) return false;
    return true;
};


function GhostSprite() {
    this.initialize.apply(this, arguments);
}

GhostSprite.prototype = Object.create(PIXI.Sprite.prototype);
GhostSprite.prototype.constructor = GhostSprite;

GhostSprite.prototype.initialize = function(sprite,duration) {
    PIXI.Sprite.call(this, sprite.texture);

    this._duration = duration;
    this.setupSprite(sprite);
};
GhostSprite.prototype.setupSprite = function(sprite) {
    if(sprite.parent) sprite.parent.addChild(this);
    this.position = sprite.position;
    this.anchor = sprite.anchor;
    this.scale = sprite.scale;
    this.rotation = sprite.rotation;
    this.alpha = this._maxAlpha = sprite.alpha * 0.8;
};
GhostSprite.prototype.update = function() {
    if(this._distroy) return;
    this.updateFadeOut();
};

GhostSprite.prototype.updateFadeOut = function() {
    this.alpha -= this._maxAlpha/this._duration;
    if(this.alpha<=0) this.destroy();
};
GhostSprite.prototype.destroy = function() {
    if(this._distroy) return;
    if(this.parent) this.parent.removeChild(this); 
    this._distroy = true;
};


function BattlerHPSprite() {
    this.initialize.apply(this, arguments);
}
BattlerHPSprite.Speed = 10;

BattlerHPSprite.prototype = Object.create(PIXI.Sprite.prototype);
BattlerHPSprite.prototype.constructor = BattlerHPSprite;

BattlerHPSprite.prototype.initialize = function(battler, pic, bgPic) {
    pic = pic || GameScene.Setting.battlerHPBar;
    bgPic = bgPic || GameScene.Setting.battlerBarBackground;

    var bgtexture = new PIXI.Texture.fromImage(bgPic);
    var texture = new PIXI.Texture.fromImage(pic);
    PIXI.Sprite.call(this, bgtexture);

    this.anchor = {x:0.5,y:1};

    this._battler = battler;
    this._mainBar = new PIXI.Sprite(texture);
    this._subBar = new PIXI.Sprite(texture);
    this._mainBar.anchor = this.anchor;
    this._subBar.anchor = this.anchor;

    this._subBar.alpha = 0.3;
    this.addChild(this._mainBar);
    this.addChild(this._subBar);

    this.setRate(battler.hpRate(),true);

};
BattlerHPSprite.prototype.setRate = function(rate,force) {
    this._targetRate = rate;
    if(force) {
        this._rate = this._rate2 = rate;
        this._mainBar.scale.x = this._rate;
        this._subBar.scale.x = this._rate;
    }
};

BattlerHPSprite.prototype.setBarTexture = function(pic) {
    var texture = new PIXI.Texture.fromImage(pic);
    this._mainBar.texture = texture;
    this._subBar.texture = texture;
};
BattlerHPSprite.prototype.updateSubBar = function() {
    if(this._mainBar.texture != this._subBar.texture){
        this._subBar.texture = this._mainBar.texture;
        this._subBar.alpha = 0.3;
    }
};
BattlerHPSprite.prototype.updateRateFromSource = function() {
    this.setRate(this._battler.hpRate());
}
BattlerHPSprite.prototype.updateRate = function() {
    this.updateRateFromSource();
    if(this._targetRate != this._rate){
        var delta = this._targetRate-this._rate;
        this._rate += delta/BattlerHPSprite.Speed;
        if(Math.abs(delta)<0.005) this._rate=this._targetRate;
        this.updateFrame();
    }else if(this._targetRate != this._rate2){
        var delta = this._targetRate-this._rate2;
        this._rate2 += delta/BattlerHPSprite.Speed;
        if(Math.abs(delta)<0.005) this._rate2=this._targetRate;
        this.updateFrame();
    }
};
BattlerHPSprite.prototype.updateFrame = function() {
    if(this._targetRate<this._rate2){
        this._mainBar.scale.x = this._rate;
        this._subBar.scale.x = this._rate2;
    }else{
        this._mainBar.scale.x = this._rate2;
        this._subBar.scale.x = this._rate;
    }
};

BattlerHPSprite.prototype.update = function() {
    this.updateSubBar();
    this.updateRate();
};


function BattlerTPSprite() {
    this.initialize.apply(this, arguments);
}

BattlerTPSprite.prototype = Object.create(BattlerHPSprite.prototype);
BattlerTPSprite.prototype.constructor = BattlerTPSprite;

BattlerTPSprite.prototype.initialize = function(battler, pic, bgPic) {
    pic = pic || GameScene.Setting.battlerTPBar;
    bgPic = bgPic || GameScene.Setting.battlerBarBackground;

    var bgtexture = new PIXI.Texture.fromImage(bgPic);
    var texture = new PIXI.Texture.fromImage(pic);
    PIXI.Sprite.call(this, bgtexture);

    this.anchor = {x:0.5,y:1};

    this._battler = battler;
    this._mainBar = new PIXI.Sprite(texture);
    this._subBar = new PIXI.Sprite(texture);
    this._mainBar.anchor = this.anchor;
    this._subBar.anchor = this.anchor;

    this.alpha = 0.75;
    this._mainBar.alpha = 0.5;
    this._subBar.alpha = 0.25;
    this.addChild(this._mainBar);
    this.addChild(this._subBar);

    this.setRate(battler.tpRate(),true);

};
BattlerTPSprite.prototype.updateRateFromSource = function() {
    this.setRate(this._battler.tpRate());
}
BattlerTPSprite.prototype.updateAni = function() {
    var min = 0.5, max = 1, spd = 0.05;
    this._shineMode = this._shineMode || -1;
    if(this._mainBar.alpha <= min) this._shineMode = 1;
    else if(this._mainBar.alpha >= max) this._shineMode = -1;
    this._mainBar.alpha += spd * this._shineMode;
}
BattlerTPSprite.prototype.update = function() {
    BattlerHPSprite.prototype.update.call(this);
    if(this._rate>=0.75) this.updateAni();
    else this._mainBar.alpha = 0.5;
};