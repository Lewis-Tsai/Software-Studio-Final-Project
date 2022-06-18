const {ccclass, property} = cc._decorator;

@ccclass
export class tank_enemies_gun extends cc.Component {
    private anim = null; //this will use to get animation component
    private animateState = null; //this will use to record animationState
    @property(cc.Prefab)
    tank_white_bomb_Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    smoke_Prefab: cc.Prefab = null;

    //@property(cc.Node)
    //player:cc.Node = null;
    private player: cc.Node = null;

    @property(cc.Node)
    tank:cc.Node = null;
    onLoad(){
        this.player = cc.find("Canvas/Player");
    }
    update(dt)
    {
        this.playerMovement(dt);
    }
    /*start() 
    {
        // add key down and key up event
        this.schedule(function(){
            if(Math.abs(this.tank.x - this.player.x) < 500 ){
                var dx = this.player.x - this.tank.x;
                var dy = this.player.y - this.tank.y;
                var dir = cc.v2(dx,dy);
                var angle = dir.signAngle(cc.v2(1,0)); //in radiant
                var degree = angle / Math.PI * 180;
                this.node.angle = -(degree + 160);
                var bullet = cc.instantiate(this.tank_enemy_bullet_Prefab);
                bullet.getComponent('tank_enemies_bullet').init(
                    this.tank.x+105*Math.cos(angle), this.tank.y-105*Math.sin(angle)-50, 
                    this.player.x - (this.tank.x-50*Math.cos(angle)), this.player.y-(this.tank.y+50*Math.sin(angle)));
                cc.find("Canvas").addChild(bullet);
            }
        },2);
    }*/
    start() 
    {
        // add key down and key up event
        this.schedule(function(){
            if(Math.abs(this.node.position.x - this.player.x) < 500 ){
                var dx = this.player.x - this.node.position.x;
                var dy = this.player.y - this.node.position.y;
                var dir = cc.v2(dx,dy);
                var angle = dir.signAngle(cc.v2(1,0)); //in radiant
                var degree = angle / Math.PI * 180;
                this.node.angle = -(degree + 160);
                var bullet = cc.instantiate(this.tank_white_bomb_Prefab);
                if(this.node.angle > -90){
                    bullet.getComponent('tank_white_bomb').init(
                        this.node.position.x+105*Math.cos(angle), this.node.position.y-105*Math.sin(angle)-50, 
                        (this.player.x - (this.node.position.x-105*Math.cos(angle)))/2, 
                        Math.abs(this.player.y-(this.node.position.y+105*Math.sin(angle)))/2,
                        1,degree);
                    cc.find("Canvas").addChild(bullet);
                    console.log('degree: ',-(degree + 160));
                    console.log('angle_x: ',(this.player.x - (this.node.position.x-105*Math.cos(angle)))/2);
                    console.log('angle_y: ',Math.abs(this.player.y-(this.node.position.y+105*Math.sin(angle)))/2);
                }
                else if(this.node.angle <= -90){
                    bullet.getComponent('tank_white_bomb').init(
                        this.node.position.x+105*Math.cos(angle)-50, this.node.position.y-105*Math.sin(angle)-20, 
                        (this.player.x - (this.node.position.x-105*Math.cos(angle)-50))/2, 
                        Math.abs(this.player.y-(this.node.position.y+105*Math.sin(angle)-20))/2,
                        1,degree);
                    cc.find("Canvas").addChild(bullet);
                }

                var smoke = cc.instantiate(this.smoke_Prefab);
                smoke.getComponent('smoke').init(
                    this.node.position.x+105*Math.cos(angle), this.node.position.y-105*Math.sin(angle)-50);
                cc.find("Canvas").addChild(smoke);
                
            }
        },2);
    }
    private playerMovement(dt)
    {
        //var dx = this.player.position.x - this.node.position.x;
        //var dy = this.player.position.y - this.node.position.y;
        var dx = this.player.position.x - this.node.position.x;
        var dy = this.player.position.y - this.node.position.y;
        var dir = cc.v2(dx,dy);
        var angle = dir.signAngle(cc.v2(1,0)); //in radiant
        console.log(angle);
        var degree = angle / Math.PI * 180;
        this.node.angle = -(degree + 160);
        console.log(this.player.position);
    }
}
