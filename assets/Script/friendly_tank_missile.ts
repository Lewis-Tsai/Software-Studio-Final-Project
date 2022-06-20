const {ccclass, property} = cc._decorator;

@ccclass
export default class friendly_tank_missile extends cc.Component {

    @property({ type: cc.AudioClip })
    tank_shooting_audio: cc.AudioClip = null;

    private canvas: cc.Node = null

    @property(cc.Prefab)
    smoke_Prefab: cc.Prefab = null;
    //private Living:boolean = true;
    private target: cc.Node = null
    private bullet_speed = 300;
    private timer = 0.0;
    private master_Speed = -100;
    // LIFE-CYCLE CALLBACKS:
    private soldier_dir = 1;

    private tag = true;
    onLoad () {

        //this.anim = this.getComponent(cc.Animation);
        this.canvas = cc.find("Canvas");
        this.node.scaleX *= 0.3;
        this.soldier_dir = this.node.position.x;
        //console.log(this.canvas.position);
    }

    start () {
        this.findtarget();

    }

    return_target(){
        return this.target;
    }

    update (dt) {
        //if(this.target.name == "enemy_tank_gun") this.node.x += 0;
        //else this.node.x += 20 * dt;
    }
    afterfindtarget(){
        if (this.tag){
            let X = this.node.position.x + this.node.parent.position.x;
            let Y = this.node.position.y + this.node.parent.position.y;
            this.node.parent = cc.find("Canvas");
            this.node.setPosition(X,Y);
            this.tag = false;
            }
        if (this.node.parent.name == "Canvas" ){
            this.firegun();
        }
    }
    findtarget(){  //target closest friend
        let closest = 100000000.0;

        for (var i = 0;i < this.canvas.childrenCount; i++){
            
            if ( this.canvas.children[i].name == "enemies_soldier" || this.canvas.children[i].name == "enemy_tank_gun"){
                //console.log(this.canvas.children[i].name);
                console.log(this.node.parent.position.x)
                let X = -(this.node.parent.position.x-this.node.position.x) + this.canvas.children[i].position.x; // cos
                let Y = -(this.node.parent.position.y-this.node.position.y) + this.canvas.children[i].position.y;        // sin
                let cos = X/Math.sqrt(X*X + Y*Y);
                let sin = Y/Math.sqrt(X*X + Y*Y);

                if ( Math.abs(X)<=960  && Math.sqrt(X*X + Y*Y) < closest && sin >=0 ){
                    closest = Math.sqrt(X*X + Y*Y);
                    this.target = this.canvas.children[i];
                }
            }
        }
        //if (this.target == null) this.node.destroy();
        console.log(this.target.name);
        this.node.parent.getComponent('friendly_tank_v2').setTarget(this.target);
        this.afterfindtarget();
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

        var smoke = cc.instantiate(this.smoke_Prefab);
        smoke.getComponent('smoke').init(
            this.node.position.x, this.node.position.y);
        cc.find("Canvas").addChild(smoke);
        let temp_angle = Math.asin(sin) * 180 / Math.PI;
        cc.audioEngine.play(this.tank_shooting_audio, false, 1);

        if (temp_angle >= 0 && this.soldier_dir == -1) {
            this.node.angle = 180-temp_angle;
        }else if (temp_angle >= 0 && this.soldier_dir == 1) {
            this.node.angle = temp_angle;
        }
    }
    onBeginContact(contact,self,other){
        if (other.node.name == "enemies_soldier" || other.node.name == "enemy_tank" ){ // bullet
            //this.node
            this.node.destroy()
        }
     }
}
