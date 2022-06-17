cc.Class({
    extends: cc.Component,

    properties: {
        flyHeight: 0,
        flyDuration: 0,
        moveLength: 0,
        moveDuration: 0,
        speedX: 0,
        speedY: 0,
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
        successaudio:{
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
        bomb_btn:{
            type: cc.Node,
            default: null
        },
        missle_btn:{
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
    },

    update (dt) {
        // Player Move
        this.move(dt);
        // Camera follow
        this.camerafollow();
        // Animation Update
        this.PlayerAnimation();
        // UI Update
        this.UpdateUI();
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
            this.speedX = -200;
            this.node.scaleX = -1;
        }
    },

    turnRight () {
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete"){
            this.speedX = 200;
            this.node.scaleX = 1;
        }
    },

    fly (direction) {
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete"){
            this.speedY = 75 * direction;
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
        
        if(scene.name == "Stage 1"){
            if(this.node.x < -580)
            {
                this.camera.x = -580;
                this.background.x = 478;
            }
            else if(this.node.x > 1580)
            {
                this.camera.x = 1580;
            }
            else
            {
                this.camera.x = this.node.x;
                this.background.x = (this.node.x + 490) * 500 / 2410 + 478;
            }
            // console.log(this.camera.position.x, this.camera.position.y);
            this.hp_bar.node.position = cc.v3(this.camera.position.x, this.camera.position.y + 288, 0);
            this.missle_btn.position = cc.v3(this.camera.position.x - 400, this.camera.position.y + 80, 0);
            this.bomb_btn.position = cc.v3(this.camera.position.x - 400, this.camera.position.y - 112, 0);
        }
        else if(scene.name == "Stage 2"){
            if(this.node.x < -580)
                this.camera.x = -580;
            else if(this.node.x > 645)
                this.camera.x = 645;
            else {
                this.camera.x = this.node.x;
            }
        }
    },

    PlayerAnimation: function(){
        if(this.isDead){
            // this.animator.play("helicopter_destroy");
        }
        else if(!this.animator.getAnimationState("helicopter_fly").isPlaying){
            this.animator.play("helicopter_fly");
        }
    },

    UpdateUI: function(){
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete") {
            // Renew HP, score
            if(this.HP <= 0) {
                if(!this.isDead) {
                    this.isDead = true;
                    var explode = cc.instantiate(this.boom_effect);
                    explode.setPosition(this.node.position.x, this.node.position.y);
                    cc.find("Canvas").addChild(explode);
                    this.scheduleOnce(function() {
                        this.node.active = false;
                    }, 1);
                }
                this.hp_bar.getComponent(cc.ProgressBar).progress = 0;
                this.hp_icon.x = -150;
                
            }
            else {
                this.hp_bar.getComponent(cc.ProgressBar).progress = this.HP / this.maxHP;
                this.hp_icon.x = 300 * (this.HP - this.maxHP/2) / this.maxHP;
                this.missle_btn.getComponent(cc.Sprite).fillRange = this.missiles / 10;
                this.bomb_btn.getComponent(cc.Sprite).fillRange = this.bombs / 10;
                this.missile_num.getComponent(cc.Label).string = this.missiles.toString();
                this.bomb_num.getComponent(cc.Label).string = this.bombs.toString();
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
        if(otherCollider.node.name == "bird") {
            // hit by bird
            this.HP -= 5;
            otherCollider.node.active = false;
        }
        else if(otherCollider.node.name == "tank_enemies_bullet" || otherCollider.node.name == "bullet_enemy") {
            // hit by bullet from enemies
            this.HP -= 5;
            otherCollider.node.active = false;
        }
    },   
});
