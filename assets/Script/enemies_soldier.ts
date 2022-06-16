// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
 

const {ccclass, property} = cc._decorator;
 
@ccclass
export default class enemies_soldier extends cc.Component {
 
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    private bullet: cc.Prefab = null;

    private player: cc.Node = null
 
    private physicManager: cc.PhysicsManager = null;
 
    private anim = null;
 
    private Living:boolean = true;

    private bullet_speed = 300;

    //private Live = 5;
 
    private Speed = -100;
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2 (0, 0);
        this.anim = this.getComponent(cc.Animation);
        this.player = cc.find("Canvas/Player");
        this.node.scaleX = -1;
        console.log(this.player.position);
        //console.log(this.player.getComponent("Player").isDead)
        //this.loadgun();
    }
 
    start () {
        //this.loadgun();
        //this.schedule(this.firegun,0.2);
    }
    loadgun(){
        let node_b = cc.instantiate(this.bullet);
        let canvas = cc.find("Canvas");
        canvas.addChild(node_b);
        //node.parent = cc.director.getScene();
        node_b.setPosition(this.node.position.x,this.node.position.y);
        //console.log(this.node.name);
        //this.schedule(this.firegun,1);
    }
     update (dt) {
        //console.log(this.Living);
        if (this.Living && !this.player.getComponent("Player").isDead){ // all live =>move
            this.firegun();
            if(this.node.x - cc.find("Canvas/Main Camera").x < 960) this.node.x += this.Speed * dt;//can view=> moving
        }
 
     }
 
     Waskill() {
        //cc.find("Canvas/Score").getComponent(cc.Label).string
        //this.player.score += 100;
        
        this.player.getComponent("Player").score += 100;
        console.log(this.player.getComponent("Player").score);
        //console.log(this.player.score);
        this.Living = false;
        console.log(this.Living);
        //this.node.children[0].destroy();
        //this.node.destroy();
        this.node.active = false;
    }
    
    firegun(){
        this.loadgun();
        for (var i = 0 ;i<this.node.childrenCount ;i++){
            if (this.node.children[i].name == "bullet_emeny"){
                console.log(this.node.children[i].name)
                this.node.children[i].active = true;
                //this.node.children[i].parent = cc.find("Canvas");
                break;
            }
        }
        /*let X = -this.node.position.x + this.player.position.x;
        let Y = -this.node.position.y + this.player.position.y;
    
        let cos = X/Math.sqrt(X*X + Y*Y);
        let sin = Y/Math.sqrt(X*X + Y*Y);

        this.node.children[0].active = true;
        this.node.children[0].getComponent(cc.RigidBody).linearVelocity = cc.v2(this.bullet_speed * cos, this.bullet_speed * sin);
        let temp_angle = Math.asin(sin) * 180 / Math.PI;
        console.log(temp_angle);
        if (temp_angle >= 0) this.node.children[0].angle = temp_angle;
        else this.node.children[0].angle = 180 - temp_angle;
        var that = this;
        this.scheduleOnce(function() {    
            this.node.children[0].active = false;
            this.node.children[0].position.x = that.node.position.x;
            this.node.children[0].position.y = that.node.position.y;
        }, 0.95);*/
    }
    
     onBeginContact(contact,self,other){
        if (other.node.name == "bullet_1" || other.node.name == "bullet_fs" ){ // bullet
            this.Waskill()
        }
     }
}