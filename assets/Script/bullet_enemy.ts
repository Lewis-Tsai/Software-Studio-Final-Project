// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;

@ccclass
export default class bullet_emeny extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    private canvas: cc.Node = null
 
 
    //private anim = null;
 
    //private Living:boolean = true;
    private target: cc.Node = null

    private bullet_speed = 300;

    private timer = 0.0;

    private master_Speed = -100;

    // LIFE-CYCLE CALLBACKS:
    private tag = true;
    onLoad () {

        //this.anim = this.getComponent(cc.Animation);
        this.canvas = cc.find("Canvas");
        //this.node.scaleX = -1;
        console.log(this.canvas.position);
    }

    start () {
        if (this.tag){
            let X = this.node.position.x + this.node.parent.position.x;
            let Y = this.node.position.y + this.node.parent.position.y;
            this.node.parent = cc.find("Canvas");
            this.node.setPosition(X,Y);
            this.tag = false;
            }
        if (this.node.parent.name == "Canvas" ){
            //this.tag = false;
            this.findtarget();
            this.scheduleOnce(this.firegun,0.1);
            //this.schedule(this.findtarget,1);
            //this.schedule(this.firegun,1.01);
            console.log("target");
        }
    }



    update (dt) {
        //this.timer += dt;
        //console.log("bu_e");


        //if (timer >=) this.findtarget();
    }

    findtarget(){  //target closest friend
        let closest = 100000000.0;
        for (var i = 0;i < this.canvas.childrenCount; i++){
            if ( this.canvas.children[i].name == "friendly_soldier" || this.canvas.children[i].name == "Player"){
                console.log(this.canvas.children[i].name);
                let X = -this.node.position.x + this.canvas.children[i].position.x;
                let Y = -this.node.position.y + this.canvas.children[i].position.y;            
                if ( Math.sqrt(X*X + Y*Y) < closest){
                    console.log(this.target);
                    closest = Math.sqrt(X*X + Y*Y);
                    this.target = this.canvas.children[i];
                }
                //this.canvas.children[i]
            }
        }
    }
    
    firegun(){
        if (this.target == null) return
        console.log(this.target,this.node.position);
        let X = -this.node.position.x + this.target.position.x;
        let Y = -this.node.position.y + this.target.position.y;
    
        let cos = X/Math.sqrt(X*X + Y*Y);
        let sin = Y/Math.sqrt(X*X + Y*Y);

        this.node.active = true;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.bullet_speed * cos, this.bullet_speed * sin);
        let temp_angle = Math.asin(sin) * 180 / Math.PI;
        console.log(temp_angle);
        if (temp_angle >= 0) this.node.angle = 180-temp_angle;
        else this.node.angle = 180 - temp_angle;
    }
    onBeginContact(contact,self,other){
        if (other.node.name == "friendly_soldier" || other.node.name == "Player" ){ // bullet
            //this.node
            this.node.destroy()
        }
     }
}
