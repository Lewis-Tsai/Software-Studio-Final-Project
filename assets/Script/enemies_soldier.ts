// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
 
//const Global;
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class enemies_soldier extends cc.Component {
 
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    private bullet_enemy: cc.Prefab = null;
    @property(cc.Node)
    bloodbar: cc.Node = null;

    private player: cc.Node = null
 
    private physicManager: cc.PhysicsManager = null;
 
    private anim = null;
 
    private Living:boolean = true;

    private bullet_speed = 300;

    //private Live = 5;

    private global = null;
 
    private Speed = -50;
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2 (0, 0);
        this.anim = this.getComponent(cc.Animation);
        this.player = cc.find("Canvas/Player");
        this.node.scaleX *= -1;
        this.global = Global;
        if (this.node.scaleX > 0) this.Speed *= -1;
        //console.log(this.player.position);
        //console.log(this.player.getComponent("Player").isDead)
        //this.loadgun();
    }
 
    start () {
        //this.loadgun();
        this.schedule(this.firegun,1);
    }
    loadgun(){
        let node_b = cc.instantiate(this.bullet_enemy);
        let canvas = cc.find("Canvas");
        
        //canvas.addChild(node_b);
        //node.parent = cc.director.getScene();
        //node_b.setPosition(0,0);
        //console.log(node_b.getComponent("bullet_emeny"));
        if (this.node.scaleX > 0) node_b.setPosition(1,0);
        else node_b.setPosition(-1,0);

        this.node.addChild(node_b);
        //node_b.setPosition(this.node.position.x,this.node.position.y);
        //console.log(this.node.name);
        //this.schedule(this.firegun,1);
    }
     update (dt) {
        //console.log(this.Living);
        if (this.Living && !this.player.getComponent("Player").isDead){ // all live =>move
            //this.firegun();
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
        this.node.destroy();
        //this.node.active = false;
    }
    
    firegun(){
        //in view then can fire
        if (this.node.x - cc.find("Canvas/Main Camera").x < 960) this.loadgun();
    }
    
     onBeginContact(contact,self,other){
        if (other.node.name == "player_bullet"  ){ // bullet
            //console.log( "global:",this.global.machinegun_level)

            if (this.global.machinegun_level == 0) this.bloodbar.width -= 10;
            else if (this.global.machinegun_level == 1) this.bloodbar.width -= 12.5;
            else if (this.global.machinegun_level == 2) {
                if (this.bloodbar.width == 5) this.bloodbar.width -= 5;
                this.bloodbar.width -= 15;
            }
            else if (this.global.machinegun_level == 3) this.bloodbar.width -= 25;
            else if (this.global.machinegun_level == 4) this.bloodbar.width -= 50;

            if (this.bloodbar.width <= 0) this.Waskill();
        }else if (other.node.name == "bullet_friend" ){
            this.bloodbar.width -= 10;
            if (this.bloodbar.width <= 0) this.Waskill();
        }
        else if (other.node.name == "missile"){
            this.Waskill()
        }else if (other.node.name == "friendly_tank_missile" ||other.node.name == "bomb" ){
            this.Waskill();
        }
     }
}