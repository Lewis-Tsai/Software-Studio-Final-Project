// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class bullet_friend extends cc.Component {

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
        this.node.scaleX *= 0.3;
        //console.log(this.canvas.position);
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
            //this.scheduleOnce(this.firegun,0.1);
            this.firegun();
            //this.schedule(this.findtarget,1);
            //this.schedule(this.firegun,1.01);
            //console.log("target");
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
            if ( this.canvas.children[i].name == "enemies_soldier" || this.canvas.children[i].name == "enemy_tank"){
                //console.log(this.canvas.children[i].name);
                let X = -this.node.position.x + this.canvas.children[i].position.x; // cos
                let Y = -this.node.position.y + this.canvas.children[i].position.y;        // sin
                let cos = X/Math.sqrt(X*X + Y*Y);
                let sin = Y/Math.sqrt(X*X + Y*Y);

                if ( Math.sqrt(X*X + Y*Y) < closest && sin <= 0.5 && sin>= -0.5 && cos >= 0){
                    
                    closest = Math.sqrt(X*X + Y*Y);
                    this.target = this.canvas.children[i];
                    console.log(this.target.name);
                }
                //this.canvas.children[i]
            }/*else if (this.canvas.children[i].name == "enemy_tank"){
                let X = -this.node.position.x + this.canvas.children[i].position.x; // cos
                let Y = -this.node.position.y + this.canvas.children[i].position.y;        // sin
                let cos = X/Math.sqrt(X*X + Y*Y);
                //let sin = Y/Math.sqrt(X*X + Y*Y);

                if ( Math.sqrt(X*X + Y*Y) < closest && cos <= -0.1){
                    
                    closest = Math.sqrt(X*X + Y*Y);
                    this.target = this.canvas.children[i];
                    //console.log(this.target.name);
                }
            }*/
        }
    }
    
    firegun(){
        if (this.target == null) { 
            this.node.destroy();
            return
        }
        this.node.opacity = 255;
        console.log(this.target.name/*,this.node.position*/);
        let X = -this.node.position.x + this.target.position.x;
        let Y = -this.node.position.y + this.target.position.y;
    
        let cos = X/Math.sqrt(X*X + Y*Y);
        let sin = Y/Math.sqrt(X*X + Y*Y);

        this.node.active = true;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.bullet_speed * cos, this.bullet_speed * sin);
        let temp_angle = Math.asin(sin) * 180 / Math.PI;
        //console.log(temp_angle);
        if (temp_angle >= 0) this.node.angle = temp_angle;
        else this.node.angle =  temp_angle;
    }
    onBeginContact(contact,self,other){
        if (other.node.name == "enemies_soldier" || other.node.name == "enemy_tank" ){ // bullet
            //this.node
            this.node.destroy()
        }
     }
}
