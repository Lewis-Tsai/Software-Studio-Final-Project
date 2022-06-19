cc.Class({
    extends: cc.Component,

    properties: {
        flyHeight: 0,
        flyDuration: 0,
        moveLength: 0,
        moveDuration: 0,
        speedX: 0,
        speedY: 0,
        speed: 200,
        speed2: 90,
        bullet_speed: 1000,
        missile_speed: 300,
        onGround: true,
        isDead: false,
        HP: 200,
        maxHP: 200,
        score: 0,
        bombs: 10,
        missiles: 10,
        enable_bomb: true,
        enable_gun: true,
        enable_missile: true,
        time: 180,
        counter: 0,
        clear_enemies: false,
        hostage_save: 0,
        successaudio:{
            type : cc.AudioClip,
            default : null
        },
        flyAudio:{
            type : cc.AudioClip,
            default : null
        },
        flyAudio:{
            type : cc.AudioClip,
            default : null
        },
        gunEffect:{
            type : cc.AudioClip,
            default : null
        },
        missileEffect:{
            type : cc.AudioClip,
            default : null
        },
        bombEffect:{
            type : cc.AudioClip,
            default : null
        },
        animator:{
            type: cc.Animation,
            default: null
        },
        animateState: null,
        camera:{
            type: cc.Node,
            default: null
        },
        background:{
            type: cc.Node,
            default: null
        },
        hp_bar:{
            type: cc.ProgressBar,
            default: null
        },
        hp_icon:{
            type: cc.Node,
            default: null
        },
        bomb_bar:{
            type: cc.Node,
            default: null
        },
        missle_bar:{
            type: cc.Node,
            default: null
        },
        bomb_num:{
            type: cc.Label,
            default: null
        },
        missile_num:{
            type: cc.Label,
            default: null
        },
        time_label:{
            type: cc.Label,
            default: null
        },
        bullet_bomb: {
            type: cc.Prefab,
            default: null
        },
        bullet_missile: {
            type: cc.Prefab,
            default: null
        },
        bullet_gun: {
            type: cc.Prefab,
            default: null
        },
        boom_effect: {
            type: cc.Prefab,
            default: null
        },
        canvas:{
            type: cc.Node,
            default: null
        }
    },

    onLoad () {
        // Add keydown event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // Add keyup event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // Add mouse down event trigger
        this.background.on('mousedown', this.onMouseDown, this);
        // Add mouse up event trigger
        this.background.on('mouseup', this.onMouseUp, this);
        // Add mouse move event trigger
        this.background.on('mousemove', this.onMouseMove, this);
        // enable physical system
        cc.director.getPhysicsManager().enabled = true;
        // Get player animator component
        this.animator = this.getComponent(cc.Animation);

        this.maxHP = Global.armor_level * 50 + 200;
        this.HP = this.maxHP;
        this.speed = Global.engine_level * 25 + 200;
        this.speed2 = Global.engine_level * 5 + 85;
        if(Global.hostage_mode)
            this.time = 360;
    },

    onDestroy () {
        // Close physical system & collision system manager
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabled = false;
        // Close key control event trigger
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start () {
        // enable collision system
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        // Record initial reborn position
        this.rebornPos = this.node.position;
        // Play player default animation
        this.animator.pause();
        this.animateState = this.animator.play();
        //Get player health
        this.score = Global.score;
        if(cc.director.getScene().name == "Game_Complete"){
            // audio
            cc.audioEngine.play(this.successaudio, false, 1);
        }
        cc.audioEngine.playEffect(this.flyAudio, true);
    },

    update (dt) {
        // Player Move
        this.move(dt);
        // Camera follow
        this.camerafollow();
        // Animation Update
        this.PlayerAnimation();
        // UI Update
        this.UpdateUI(dt);
    },

    onKeyDown: function (event) {
        var macro = cc.macro;
        if(!this.isDead){   // Player only can move when it isn't dead
            switch(event.keyCode) {
                case macro.KEY.a:
                case macro.KEY.left:
                    this.turnLeft();
                    break;
                case macro.KEY.d:
                case macro.KEY.right:
                    this.turnRight();
                    break;
                
                case macro.KEY.w:
                case macro.KEY.up:
                    this.fly(1);
                    break;
                
                case macro.KEY.s:
                case macro.KEY.down:
                    this.fly(-1);
                    break;
                
                case macro.KEY.space:
                    // throw bomb
                    if(this.bombs > 0 && this.enable_bomb && !this.isDead) {
                        this.enable_bomb = false;
                        this.bombs--;
                        cc.audioEngine.playEffect(this.bombEffect, false);
                        var new_bomb = cc.instantiate(this.bullet_bomb);
                        new_bomb.setPosition(0, -50);
                        cc.find("Canvas/Player").addChild(new_bomb);
                        new_bomb.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -200);
                        if(this.node.scaleX > 0)
                            new_bomb.angle = -this.node.angle;
                        else
                            new_bomb.angle = this.node.angle;
                    }
                    break;
                case macro.KEY.q:
                    this.Reborn();
                    break;
            }
        }
    },

    onKeyUp: function (event) {
        
        var macro = cc.macro;
        switch(event.keyCode) {
            // Reset player speed
            case macro.KEY.a:
            case macro.KEY.left:
            case macro.KEY.d:
            case macro.KEY.right:
                this.speedX = 0;
                break;
                
            case macro.KEY.w:
            case macro.KEY.up:
            case macro.KEY.s:
            case macro.KEY.down:
                this.speedY = 0;
                break;

            case macro.KEY.space:
                this.enable_bomb = true;
                break;
        }
    },

    onMouseDown: function (event) {
        // throw bomb
        switch(event.getButton()) {
            case cc.Event.EventMouse.BUTTON_LEFT:
                // fire machine gun
                if(this.enable_gun && !this.isDead) {
                    this.enable_gun = false;
                    cc.audioEngine.playEffect(this.gunEffect, false);
                    var new_bullet = cc.instantiate(this.bullet_gun);
                    new_bullet.setPosition(40, -40);
                    cc.find("Canvas/Player").addChild(new_bullet);
                    if(this.node.scaleX > 0)
                        new_bullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.bullet_speed * Math.cos(Math.PI * this.node.angle/180), this.bullet_speed * Math.sin(Math.PI * this.node.angle/180));
                    else
                        new_bullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.bullet_speed * Math.cos(Math.PI * this.node.angle/180), -this.bullet_speed * Math.sin(Math.PI * this.node.angle/180));
                }
                break;
            case cc.Event.EventMouse.BUTTON_RIGHT:
                //fire the missile
                if(this.missiles > 0 && this.enable_missile && !this.isDead) {
                    this.enable_missile = false;
                    this.missiles--;
                    cc.audioEngine.playEffect(this.missileEffect, false);
                    var new_missile = cc.instantiate(this.bullet_missile);
                    new_missile.setPosition(80, -32);
                    cc.find("Canvas/Player").addChild(new_missile);
                    if(this.node.scaleX > 0)
                        new_missile.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.missile_speed * Math.cos(Math.PI * this.node.angle/180), this.missile_speed * Math.sin(Math.PI * this.node.angle/180));
                    else
                        new_missile.getComponent(cc.RigidBody).linearVelocity = cc.v2(-this.missile_speed * Math.cos(Math.PI * this.node.angle/180), -this.missile_speed * Math.sin(Math.PI * this.node.angle/180));
                }
                break; 
        }
    },

    onMouseUp: function (event) {
        switch(event.getButton()) {
            case cc.Event.EventMouse.BUTTON_LEFT:
                // stop firing machine gun
                this.enable_gun = true;
                break;
            case cc.Event.EventMouse.BUTTON_RIGHT:
                // stop firing the missile
                this.enable_missile = true;
                break;
        }
    },

    onMouseMove: function (event) {
        // rotate the helicopter according to the mouse position
        let helicopter_x = this.node.position.x - this.camera.position.x;
        let helicopter_y = this.node.position.y - this.camera.position.y;
        let delta_x = event.getLocationX() - helicopter_x - 480;
        let delta_y = event.getLocationY() - helicopter_y - 320;
        if(this.node.scaleX > 0 && delta_x > 0) {
            this.node.angle = Math.atan(delta_y/delta_x) * 180 / Math.PI;
            if(this.node.angle > 36)
                this.node.angle = 36;
            else if(this.node.angle < -36)
                this.node.angle = -36;
        }
        else if(this.node.scaleX < 0 && delta_x < 0) {
            this.node.angle = Math.atan(delta_y/delta_x) * 180 / Math.PI;
            if(this.node.angle > 36)
                this.node.angle = 36;
            else if(this.node.angle < -36)
                this.node.angle = -36;
        }
    },

    turnLeft () {
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete"){
            this.speedX = -this.speed;
            this.node.scaleX = -1;
        }
    },

    turnRight () {
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete"){
            this.speedX = this.speed;
            this.node.scaleX = 1;
        }
    },

    fly (direction) {
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete") {
            this.speedY = this.speed2 * direction;
        }
    },


    move(dt){
        if(!this.isDead) {
            this.node.x += this.speedX * dt;
            this.node.y += this.speedY * dt;
        }
    },

    camerafollow: function() {
        var scene = cc.director.getScene();
        
        if(scene.name == "Stage 1" || scene.name == "Stage 4"){
            if(this.node.x < 0)
            {
                this.camera.x = 0;
                //this.background.x = 478;
            }
            else if(this.node.x > 16880)
            {
                this.camera.x = 16880;
            }
            else
            {
                this.camera.x = this.node.x;
                //this.background.x = (this.node.x + 490) * 500 / 2410 + 478;
            }
        }
        else if(scene.name == "Stage 2" || scene.name == "Stage 5"){
            if(this.node.x < 0)
                this.camera.x = 0;
            else if(this.node.x > 13520)
                this.camera.x = 13520;
            else {
                this.camera.x = this.node.x;
            }
        }
        else if(scene.name == "Stage 3" || scene.name == "Stage 6"){
            if(this.node.x < 0)
                this.camera.x = 0;
            else if(this.node.x > 13612)
                this.camera.x = 13612;
            else {
                this.camera.x = this.node.x;
            }
        }

        this.hp_bar.node.position = cc.v3(this.camera.position.x, this.camera.position.y + 288, 0);
        this.missle_bar.position = cc.v3(this.camera.position.x - 360, this.camera.position.y + 292, 0);
        this.bomb_bar.position = cc.v3(this.camera.position.x - 360, this.camera.position.y + 248, 0);
        this.time_label.node.position = cc.v3(this.camera.position.x + 428, this.camera.position.y + 288, 0);
    },

    PlayerAnimation: function(){
        if(this.isDead){
            // this.animator.play("helicopter_destroy");
        }
        else if(!this.animator.getAnimationState("helicopter_fly").isPlaying){
            this.animator.play("helicopter_fly");
        }
    },

    UpdateUI: function(dt) {
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete") {
            // Renew HP, score
            if(this.HP <= 0 || this.time <= 0) {
                if(!this.isDead) {
                    this.isDead = true;
                    Global.time_left = this.time;
                    Global.total_battle++;
                    var explode = cc.instantiate(this.boom_effect);
                    explode.setPosition(this.node.position.x, this.node.position.y);
                    cc.find("Canvas").addChild(explode);
                    this.scheduleOnce(function() {
                        this.node.active = false;
                        cc.director.loadScene("Game Failed");
                    }, 1.5);
                }
                this.hp_bar.getComponent(cc.ProgressBar).progress = 0;
                this.hp_icon.x = -150;
            }
            else {
                this.counter += dt;
                if(this.counter >= 1) {
                    this.counter -= 1;
                    if(this.time > 0)
                        this.time--;
                }

                this.hp_bar.getComponent(cc.ProgressBar).progress = this.HP / this.maxHP;
                this.hp_icon.x = 300 * (this.HP - this.maxHP/2) / this.maxHP;
                this.missle_bar.getComponent(cc.Sprite).fillRange = this.missiles / 10;
                this.bomb_bar.getComponent(cc.Sprite).fillRange = this.bombs / 10;
                this.missile_num.getComponent(cc.Label).string = this.missiles.toString();
                this.bomb_num.getComponent(cc.Label).string = this.bombs.toString();
                if(this.time % 60 < 10)
                    this.time_label.getComponent(cc.Label).string = Math.floor(this.time/60).toString() + ":0" + (this.time%60);
                else
                    this.time_label.getComponent(cc.Label).string = Math.floor(this.time/60).toString() + ":" + (this.time%60);

                if(!this.clear_enemies) {
                    var finish = true;
                    var hostages = 0;
                    var hostages_disappear = 0;
                    for(let i in this.canvas.children) {
                        if(this.canvas.children[i].name == "enemies_soldier" || this.canvas.children[i].name == "enemy_tank") {
                            if(this.canvas.children[i].active)
                                finish = false;
                            else if(this.canvas.children[i].name == "friendly_soldier_hostage") {
                                hostages++;
                                if(!this.canvas.children[i].active)
                                    hostages_disappear++;
                            }
                        }
                    }
                    this.clear_enemies = finish;
                    this.total_hostages = hostages;

                    if(Global.hostage_mode && hostages_disappear != this.hostage_save) {
                        //cc.director.loadScene("Game Failed");
                    }
                }

                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            }
        }
    },

    onCollisionEnter: function(other, self){
        console.log('on collision enter');
        console.log(other.tag);
        console.log(self.name);
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        // console.log(otherCollider.node.name);
        // "otherCollider.node" can get collider's node 
        if(otherCollider.node.name == "tank_white_bomb") {
            // hit by bullet from enemies
            this.HP -= 10;
            otherCollider.node.active = false;
        }
        else if(otherCollider.node.name == "bullet_enemy") {
            this.HP -= 5;
            otherCollider.node.active = false;
        }
        else if(otherCollider.node.name == "helipad_finish") {
            if(this.clear_enemies && !Global.hostage_mode) {
                Global.time_left = this.time;
                Global.total_battle++;
                Global.total_win++;
                cc.director.loadScene("Game Completed");
            }
            if(Global.hostage_mode) {
                Global.on_helipad = true;
            }
        }
        else if(otherCollider.node.name == "helipad") {
            if(Global.hostage_mode && this.hostage_save == this.total_hostages) {
                cc.director.loadScene("Game Completed");
            }
        }
        else if(otherCollider.node.name == "friendly_soldier_hostage") {
            this.hostage_save++;
        }
    },

    onEndContact: function(contact, selfCollider, otherCollider) {
        if(otherCollider.node.name == "helipad_sensor" && Global.hostage_mode) {
            Global.on_helipad = false;
        }
    }
});
