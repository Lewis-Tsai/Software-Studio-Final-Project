// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
 

const {ccclass, property} = cc._decorator;
 
@ccclass
export default class friendly_soldier_hostage extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    private bullet_friend: cc.Prefab = null;
    @property(cc.Node)
    bloodbar: cc.Node = null;

    private player: cc.Node = null
 
    private physicManager: cc.PhysicsManager = null;
 
    private anim = null;
 
    private animState = null;

    private Living:boolean = true;

    private bullet_speed = 300;

    //private Live = 5;
 
    private Speed = 50;

    private move:boolean = false;

    private rescue:boolean = false;

    private global = null;
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2 (0, 0);
        this.anim = this.getComponent(cc.Animation);
        this.player = cc.find("Canvas/Player");
        //this.node.scaleX = 1;
        console.log(this.player.position);
        this.global = Global;
        //if (this.node.scale < 0) this.Speed *= -1;
        //console.log(this.player.getComponent("Player").isDead)
        //this.loadgun();
    }
 
    start () {
        //this.loadgun();
        this.schedule(this.firegun,1);
    }
    loadgun(){
        let node_b = cc.instantiate(this.bullet_friend);
        let canvas = cc.find("Canvas");
        node_b.setPosition(0,0);
        this.node.addChild(node_b);
    }
     update (dt) {
        //console.log(this.Living);
        if(!this.rescue) {
            //this.move = true;
            //need parameter
            if (this.global.on_helipad) {this.rescue = true; this.node.scaleX *= -1;this.animState =  this.anim.play("friendly_soldier_walk")}
        }
        else{
            if(this.node.x - cc.find("Canvas/Main Camera").x < 960 && !this.move) this.move = true;
            if (this.Living && !this.player.getComponent("Player").isDead){ // all live =>move
                //this.firegun();
                if(this.node.x - cc.find("Canvas/Main Camera").x < 960 && this.global.on_helipad) {
                    this.node.x += this.Speed * dt;//can view=> moving
                    if (!this.animState.isPlaying) this.anim.play("friendly_soldier_walk");
                }else if (this.node.x - cc.find("Canvas/Main Camera").x < 960 && !this.global.on_helipad){
                    if (this.animState.isPlaying) this.anim.stop("friendly_soldier_walk");
                }
                if (Math.abs(this.node.x - this.player.position.x) < 3 && this.global.on_helipad){
                    this.WasRescued();
                }
            }
        }
     }
     WasRescued(){
        this.node.active = false;
     }
     Waskill() {
        this.Living = false;
        console.log(this.Living);
        //this.node.children[0].destroy();
        this.node.destroy();
        //this.node.active = false;
    }
    
    firegun(){
        if (this.move) this.loadgun();
    }
    
     onBeginContact(contact,self,other){
        if (other.node.name == "bullet_enemy" /*|| other.node.name == ""*/ ){ // bullet
            this.bloodbar.width -= 10;
            if (this.bloodbar.width <= 0) this.Waskill();
        }else if (other.node.name == "missile"){
            //this.Waskill()
        }else if (other.node.name == "tank_enemies_bullet"){
            this.Waskill();
        }
     }
}