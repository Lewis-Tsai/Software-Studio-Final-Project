const {ccclass, property} = cc._decorator;

@ccclass
export class friendly_tank_v2 extends cc.Component {
    private anim = null; //this will use to get animation component
    private animateState = null; //this will use to record animationState
    private canvas: cc.Node = null;
    private tag = true;
    private target: cc.Node = null;
    private gun: cc.Node = null;
    private blood: cc.Node = null;
    private player: cc.Node = null;
    @property(cc.Prefab)
    friendly_tank_missile_Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    smoke_Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    bomb_prefab: cc.Prefab = null;

    onLoad(){
        this.canvas = cc.find("Canvas");
        this.gun = cc.find("Canvas/friendly_tank_v2/gun");
        this.blood = cc.find("Canvas/friendly_tank_v2/blood");
        this.player = cc.find("Canvas/Player");
    }

    start() 
    {
        if (this.tag){
            let X = this.node.position.x;
            let Y = this.node.position.y;
            this.node.parent = cc.find("Canvas");
            this.node.setPosition(X,Y);
            this.tag = false;
        }
        if (this.node.parent.name == "Canvas" ){
            this.findtarget();
            this.firegun();
            //this.rotate();
        }
    }

    update(dt)
    {
        this.playerMovement(dt);
    }

    findtarget(){  //target closest friend
        let closest = 100000000.0;
        for (var i = 0;i < this.canvas.childrenCount; i++){
            if (this.canvas.children[i].name == "enemy_tank_gun" || this.canvas.children[i].name == "enemies_soldier"){
                let X = -this.node.position.x + this.canvas.children[i].position.x; // cos
                let Y = -this.node.position.y + this.canvas.children[i].position.y;        // sin
                let cos = X/Math.sqrt(X*X + Y*Y);
                let sin = Y/Math.sqrt(X*X + Y*Y);

                if ( Math.abs(X)<=960  && Math.sqrt(X*X + Y*Y) < closest /*&& sin <= 0.5 && sin>= -0.5 && cos >= 0*/){
                    closest = Math.sqrt(X*X + Y*Y);
                    this.target = this.canvas.children[i];
                }
            }
        }
    }

    /*rotate(){
        if (this.target == null) { 
            return;
        }
        if(this.target.name == "enemy_tank_gun"){
            var dx = this.target.position.x - this.node.position.x;
            var dy = this.target.position.y - this.node.position.y;
            var dir = cc.v2(dx,dy);
            var angle = dir.signAngle(cc.v2(1,0)); //in radiant
            //console.log(angle);
            var degree = angle / Math.PI * 180;
            this.gun.angle = -(degree + 175);
        }
        else if(this.target.name == "enemies_soldier"){
            var dx = this.target.position.x - this.node.position.x;
            var dy = this.target.position.y - this.node.position.y;
            var dir = cc.v2(dx,dy);
            var angle = dir.signAngle(cc.v2(1,0)); //in radiant
            //console.log(angle);
            var degree = angle / Math.PI * 180;
            this.gun.angle = -(degree + 175);
            console.log('comecomdeasdfesgaeg')
        }
    }*/

    firegun(){
        if (this.target == null) { 
            //this.node.destroy();
            return;
        }
        
        this.schedule(function(){
            var dx = this.target.x - this.node.position.x;
            var dy = this.target.y - this.node.position.y;
            var dir = cc.v2(dx,dy);
            var angle = dir.signAngle(cc.v2(1,0)); //in radiant
            var degree = angle / Math.PI * 180;
            var bullet = cc.instantiate(this.friendly_tank_missile_Prefab);
            bullet.getComponent('friendly_tank_missile').init(
                //this.node.position.x, this.node.position.y,
                this.node.x - (this.node.position.x-84*Math.cos(angle)) - 85, 
                this.node.y + Math.abs(84*Math.sin(angle))-10,
                (this.target.x - this.node.position.x)/2,
                Math.abs(this.target.y-this.node.position.y)/2, 
                1,degree);
            cc.find("Canvas").addChild(bullet);
            
            if(this.target.x > this.node.x){
                let action = cc.sequence(cc.moveBy(0.1,-10*Math.cos(degree),0), cc.moveBy(0.1,10*Math.cos(degree),0));
                this.gun.runAction(action);
            }
            else if(this.target.x <= this.node.x){
                let action = cc.sequence(cc.moveBy(0.1,10*Math.cos(degree),0), cc.moveBy(0.1,-10*Math.cos(degree),0));
                this.gun.runAction(action);
            }
            
            var smoke = cc.instantiate(this.smoke_Prefab);
                smoke.getComponent('smoke').init(
                    this.node.x - (this.node.position.x-84*Math.cos(angle)) - 85, 
                    this.node.y + Math.abs(84*Math.sin(angle))-10,);
                cc.find("Canvas").addChild(smoke);
        },4);
    }

    private playerMovement(dt)
    {
        if(this.target == null){
            console.log('isnullllllll');
        }
        else{
            var dx = this.target.position.x - this.node.position.x;
            var dy = this.target.position.y - this.node.position.y;
            var dir = cc.v2(dx,dy);
            var angle = dir.signAngle(cc.v2(1,0)); //in radiant
            //console.log(angle);
            var degree = angle / Math.PI * 180;
            this.gun.angle = -(degree + 175);
            console.log('need to spin now!!!');
        }
    }

    onBeginContact(contact, selfCollider, otherCollider)
    {
        //var to_explode = this.explode.getComponent(cc.Animation);
        if(otherCollider.node.name == "bullet_enemy"){
            if(this.blood.width > 0){
                this.blood.width -= 10;
                if(this.blood.width<=0){
                    var explode = cc.instantiate(this.bomb_prefab);
                    explode.getComponent('ground_explode').init(this.gun.x, this.gun.y+130);
                    cc.find("Canvas").addChild(explode);
                    this.node.destroy();
                }
            }
        }
    }
}
