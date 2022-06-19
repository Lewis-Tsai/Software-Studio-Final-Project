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
    private node_b: cc.Node = null;
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
        /*if (this.tag){
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
        }*/
        this.schedule(this.preparegun,2);
    }

    update(dt)
    {
        this.playerMovement(dt);
    }
    preparegun(){
        //in view then can fire
        if (this.node.x - cc.find("Canvas/Main Camera").x < 960) this.loadgun();
    }
    loadgun(){
        this.node_b = cc.instantiate(this.friendly_tank_missile_Prefab);
        
        if (this.node.scaleX > 0) this.node_b.setPosition(1,0);
        else this.node_b.setPosition(-1,0);
        this.node.addChild(this.node_b);
        //let temptarget =  this.node_b.getComponent('friendly_tank_missile').return_target();
        //if (temptarget) this.target =temptarget;
    }
    public setTarget(TTarget : cc.Node){
        this.target = TTarget;
    }
    /*
    findtarget(){  //target closest friend
        let closest = 100000000.0;
        for (var i = 0;i < this.canvas.childrenCount; i++){
            if (this.canvas.children[i].name == "enemy_tank_gun"){
                let X = -this.node.position.x + this.canvas.children[i].position.x; // cos
                let Y = -this.node.position.y + this.canvas.children[i].position.y;        // sin
                let cos = X/Math.sqrt(X*X + Y*Y);
                let sin = Y/Math.sqrt(X*X + Y*Y);

                if ( Math.abs(X)<=960  && Math.sqrt(X*X + Y*Y) < closest ){
                    closest = Math.sqrt(X*X + Y*Y);
                    this.target = this.canvas.children[i];
                }
            }
            else if (this.canvas.children[i].name == "enemies_soldier"){
                let X = -this.node.position.x + this.canvas.children[i].position.x; // cos
                let Y = -this.node.position.y + this.canvas.children[i].position.y;        // sin
                let cos = X/Math.sqrt(X*X + Y*Y);
                let sin = Y/Math.sqrt(X*X + Y*Y);

                if ( Math.abs(X)<=300  && Math.sqrt(X*X + Y*Y) < closest ){
                    closest = Math.sqrt(X*X + Y*Y);
                    this.target = this.canvas.children[i];
                    console.log('find soldier!!!!!!!!!');
                }

            }
        }
        this.firegun();
    }*/
    
    rotate(){
        if (this.target == null) { 
            //this.node.destroy();
            console.log('isNulllllllllll');
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
    }

    firegun(){
        if (this.target == null) { 
            //this.node.destroy();
            return;
        }
        var dx = this.target.x - this.node.position.x;
        var dy = this.target.y - this.node.position.y;
        var dir = cc.v2(dx,dy);
        var angle = dir.signAngle(cc.v2(1,0)); //in radiant
        var degree = angle / Math.PI * 180;
        //this.gun.angle = -(degree + 160);
        
        this.schedule(function(){
            /*if(this.target.x < this.node.x){
                var bullet = cc.instantiate(this.friendly_tank_missile_Prefab);
                bullet.getComponent('friendly_tank_missile').init(
                    this.node.position.x, this.node.position.y,
                    (this.target.x - this.node.position.x)/2,
                    Math.abs(this.target.y-this.node.position.y)/2, 
                    1,degree);
                cc.find("Canvas").addChild(bullet);
            }
            else{
                var bullet = cc.instantiate(this.friendly_tank_missile_Prefab);
                bullet.getComponent('friendly_tank_missile').init(
                    this.node.position.x, this.node.position.y, 
                    (this.target.x - this.node.position.x)/2,
                    Math.abs(this.target.y-this.node.position.y)/2, 
                    0,degree);
                cc.find("Canvas").addChild(bullet);
            }*/
            
            var smoke = cc.instantiate(this.smoke_Prefab);
                smoke.getComponent('smoke').init(
                    this.node.position.x, this.node.position.y);
                cc.find("Canvas").addChild(smoke);
        },2);
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
            console.log('need to spin now because of tank!!!');
        }
        /*else if(this.target.name == "enemy_tank_gun"){
            var dx = this.target.position.x - this.node.position.x;
            var dy = this.target.position.y - this.node.position.y;
            var dir = cc.v2(dx,dy);
            var angle = dir.signAngle(cc.v2(1,0)); //in radiant
            //console.log(angle);
            var degree = angle / Math.PI * 180;
            this.gun.angle = -(degree + 175);
            console.log('need to spin now because of tank!!!');
        }
        else if(this.target.name == "enemies_soldier"){
            var dx = this.target.position.x - this.node.position.x;
            var dy = this.target.position.y - this.node.position.y;
            var dir = cc.v2(dx,dy);
            var angle = dir.signAngle(cc.v2(1,0)); //in radiant
            //console.log(angle);
            var degree = angle / Math.PI * 180;
            this.gun.angle = -(degree + 175);
            console.log('need to spin now because of soldier');
        }*/
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
