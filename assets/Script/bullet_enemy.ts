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

    soldier_dir = -1;

    // LIFE-CYCLE CALLBACKS:
    private tag = true;

    private global = null;
    onLoad () {

        //this.anim = this.getComponent(cc.Animation);
        this.canvas = cc.find("Canvas");
        this.node.scaleX *= 0.3;
        this.soldier_dir = this.node.position.x;
        //console.log(this.soldier_dir);
        this.global = Global;
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
            if (this.global.hostage_mode){
                if (this.global.on_helipad){ //is rescuing
                    if ( (this.canvas.children[i].active && this.canvas.children[i].name == "friendly_soldier_hostage") ||this.canvas.children[i].name == "friendly_soldier" || this.canvas.children[i].name == "friendly_tank_v2" || this.canvas.children[i].name == "friendly_tank"){
                        let X = -this.node.position.x + this.canvas.children[i].position.x; // cos
                        let Y = -this.node.position.y + this.canvas.children[i].position.y;        // sin
                        let cos = X/Math.sqrt(X*X + Y*Y);
                        let sin = Y/Math.sqrt(X*X + Y*Y);
    
                        if ( Math.abs(X)<=640 && Math.sqrt(X*X + Y*Y) < closest && sin <= 0.5 && sin>= -0.5){
                            if (this.soldier_dir == 1 && cos > 0){
                                closest = Math.sqrt(X*X + Y*Y);
                                this.target = this.canvas.children[i];
                            }
                            else if (this.soldier_dir == -1 && cos < 0){
                                closest = Math.sqrt(X*X + Y*Y);
                                this.target = this.canvas.children[i];
                            }
                        }
                    }

                }else {
                    if (this.canvas.children[i].name == "Player"){
                        let X = -this.node.position.x + this.canvas.children[i].position.x; // cos
                        let Y = -this.node.position.y + this.canvas.children[i].position.y;        // sin
                        let cos = X/Math.sqrt(X*X + Y*Y);
                        //let sin = Y/Math.sqrt(X*X + Y*Y);
                        if ( Math.abs(X)<=640 && Math.sqrt(X*X + Y*Y) < closest ){
                            if (this.soldier_dir == 1 && cos > 0.5){
                            closest = Math.sqrt(X*X + Y*Y);
                            this.target = this.canvas.children[i];
                            }
                            else if (this.soldier_dir == -1 && cos < -0.5){
                                closest = Math.sqrt(X*X + Y*Y);
                                this.target = this.canvas.children[i];
                            }
                            //console.log(this.target.name);
                        }
                    }
                }
            }else {
                if ( this.canvas.children[i].name == "friendly_soldier" || this.canvas.children[i].name == "friendly_tank_v2" || this.canvas.children[i].name == "friendly_tank"){
                    //console.log(this.canvas.children[i].name);
                    let X = -this.node.position.x + this.canvas.children[i].position.x; // cos
                    let Y = -this.node.position.y + this.canvas.children[i].position.y;        // sin
                    let cos = X/Math.sqrt(X*X + Y*Y);
                    let sin = Y/Math.sqrt(X*X + Y*Y);

                    if ( Math.abs(X)<=640 && Math.sqrt(X*X + Y*Y) < closest && sin <= 0.5 && sin>= -0.5){
                        if (this.soldier_dir == 1 && cos > 0){
                            closest = Math.sqrt(X*X + Y*Y);
                            this.target = this.canvas.children[i];
                        }
                        else if (this.soldier_dir == -1 && cos < 0){
                            closest = Math.sqrt(X*X + Y*Y);
                            this.target = this.canvas.children[i];
                        }
                    //console.log(this.target.name);
                    }
                    //this.canvas.children[i]
                }else if (this.canvas.children[i].name == "Player"){
                    let X = -this.node.position.x + this.canvas.children[i].position.x; // cos
                    let Y = -this.node.position.y + this.canvas.children[i].position.y;        // sin
                    let cos = X/Math.sqrt(X*X + Y*Y);
                    //let sin = Y/Math.sqrt(X*X + Y*Y);

                    if ( Math.abs(X)<=640 && Math.sqrt(X*X + Y*Y) < closest ){
                        if (this.soldier_dir == 1 && cos > 0.5){
                        closest = Math.sqrt(X*X + Y*Y);
                        this.target = this.canvas.children[i];
                        }
                        else if (this.soldier_dir == -1 && cos < -0.5){
                            closest = Math.sqrt(X*X + Y*Y);
                            this.target = this.canvas.children[i];
                        }

                        //console.log(this.target.name);
                    }
                }
            }
        }
    }
    
    firegun(){
        if (this.target == null) { 
            this.node.destroy();
            return
        }
        this.node.opacity = 255;
        //console.log(this.target.name/*,this.node.position*/);
        let X = -this.node.position.x + this.target.position.x;
        let Y = -this.node.position.y + this.target.position.y;
    
        let cos = X/Math.sqrt(X*X + Y*Y);
        let sin = Y/Math.sqrt(X*X + Y*Y);

        this.node.active = true;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.bullet_speed * cos, this.bullet_speed * sin);
        let temp_angle = Math.asin(sin) * 180 / Math.PI;
        //console.log(temp_angle);
        if (temp_angle >= 0 && this.soldier_dir == -1) {
            this.node.angle = 180-temp_angle;
        }else if (temp_angle >= 0 && this.soldier_dir == 1) {
            this.node.angle = temp_angle;
        }
        //else this.node.angle = 180 - temp_angle;
    }
    onBeginContact(contact,self,other){
        if (other.node.name == "friendly_soldier_hostage" || other.node.name == "friendly_soldier" || other.node.name == "Player" || other.node.name == "friendly_tank_v2" || other.node.name == "friendly_tank"){ // bullet
            //this.node
            this.node.destroy()
        }
     }
}
