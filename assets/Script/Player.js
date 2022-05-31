cc.Class({
    extends: cc.Component,

    properties: {
        flyHeight: 0,
        flyDuration: 0,
        moveLength: 0,
        moveDuration: 0,
        speed: 0,
        onGround: true,
        isDead:false,
        HP : 0,
        score : 0,
        successaudio:{
            type : cc.AudioClip,
            default : null
        },
        animator:{
            type : cc.Animation,
            default : null
        },
        animateState: null,
        camera:{
            type : cc.Node,
            default : null
        },
        background:{
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
        cc.systemEvent.on(cc.SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
        // Add mouse up event trigger
        cc.systemEvent.on(cc.SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
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
                
                case macro.KEY.space:
                    // throw bomb
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
                this.speed = 0;
                break;
        }
    },

    onMouseDown: function (event) {
        // throw bomb
        var macro = cc.macro;
        switch(event.getButton()) {
            case macro.Mouse.BUTTON_LEFT:
                // fire machine gun
                break;
            case macro.Mouse.BUTTON_RIGHT:
                //fire the missile
                break; 
        }
    },

    onMouseUp: function (event) {
        var macro = cc.macro;
        switch(event.getButton()) {
            case macro.Mouse.BUTTON_LEFT:
                // stop fireing machine gun
                break;
            case macro.Mouse.BUTTON_RIGHT:
                // stop fireing the missile
                break;
        }
    },

    turnLeft () {
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete"){
            this.speed = -200;
            this.node.scaleX = -2;
        }
    },

    turnRight () {
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete"){
            this.speed = 200;
            this.node.scaleX = 2;
        }
    },


    move(dt){
        if(!this.isDead)
            this.node.x += this.speed * dt;
    },

    camerafollow:function(){
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
        }
        else if(scene.name == "Stage 2"){
            if(this.node.x < -580)
                this.camera.x = -580;
            else if(this.node.x > 645)
                this.camera.x = 645;
            else
            {
                this.camera.x = this.node.x;
            }
        }
    },

    PlayerAnimation: function(){
        if(this.isDead){

        }else{

        }
    },

    UpdateUI: function(){
        var scene = cc.director.getScene();
        
        if(scene.name != "Game_Complete"){
            // Renew HP, score
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

    },   
});
