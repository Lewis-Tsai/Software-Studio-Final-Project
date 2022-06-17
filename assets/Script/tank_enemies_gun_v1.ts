const {ccclass, property} = cc._decorator;

@ccclass
export class tank_enemies_gun extends cc.Component {
    
    private anim = null; //this will use to get animation component
    private animateState = null; //this will use to record animationState
    @property(cc.Prefab)
    tank_enemy_bullet_Prefab: cc.Prefab = null;
    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Node)
    tank:cc.Node = null;

    update(dt)
    {
        this.playerMovement(dt);
        //this.playerAnimation();
        
    }
    start() 
    {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.schedule(function(){
            if(Math.abs(this.node.x - this.player.x) < 500 ){
                var dx = this.player.x - this.node.x;
                var dy = this.player.y - (this.tank.y+30);
                var dir = cc.v2(dx,dy);
                var angle = dir.signAngle(cc.v2(1,0)); //in radiant
                var degree = angle / Math.PI * 180;
                //this.node.angle = -(degree + 160);
                var bullet = cc.instantiate(this.tank_enemy_bullet_Prefab);
                bullet.getComponent('tank_enemies_bullet').init(
                    this.tank.x+92*Math.cos(angle), (this.tank.y+30)-92*Math.sin(angle)+10, 
                    this.player.x - (this.tank.x+92*Math.cos(angle)), this.player.y-((this.tank.y+30)-92*Math.sin(angle)+10));

                cc.find("Canvas").addChild(bullet);
                //console.log('x = ',this.node.x);
            }
        },2);
    }

    private playerMovement(dt)
    {
        //rotate gun
        //this.node.is3DNode = true;
        var dx = this.player.x - this.tank.x;
        var dy = this.player.y - (this.tank.y+30);
        var dir = cc.v2(dx,dy);
        var angle = dir.signAngle(cc.v2(1,0)); //in radiant
        var degree = angle / Math.PI * 180;
        //this.node.angle = -(degree + 160);
        //this.node.angle = 0; 
        this.node.eulerAngles.z = degree;
        console.log('degree: ',degree);
        console.log('z : ',this.node.eulerAngles.z);
    }
}
