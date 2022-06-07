const {ccclass, property} = cc._decorator;

@ccclass
export class tank_enemies_gun extends cc.Component {
    private anim = null; //this will use to get animation component
    private animateState = null; //this will use to record animationState
    @property(cc.Prefab)
    tank_enemy_bullet_Prefab: cc.Prefab = null;
    @property(cc.Node)
    player:cc.Node = null;

    public bullet_x: number = 30;
    public bullet_y: number = 30;

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
    }
    onKeyDown(event) 
    {
        switch(event.keyCode) 
        {
            case cc.macro.KEY.z:
                this.zDown = true;
                this.xDown = false;
                break;

            case cc.macro.KEY.k:
                this.kDown = true;
                break;
        }
    }

    onKeyUp(event)
    {
        switch(event.keyCode) 
        {
            case cc.macro.KEY.z:
                this.zDown = false;
                break;

            case cc.macro.KEY.k:
                this.kDown = false;
                break;
        }
    }
    private playerMovement(dt)
    {
        //rotate gun
        var dx = this.player.x - this.node.x;
        var dy = this.player.y - this.node.y;
        var dir = cc.v2(dx,dy);
        var angle = dir.signAngle(cc.v2(1,0)); //in radiant
        var degree = angle / Math.PI * 180;
        this.node.rotation = degree + 160;
        //this.bullet_x = this.node.x + 67*Math.cos(angle);
        if(this.kDown){
            var bullet = cc.instantiate(this.tank_enemy_bullet_Prefab);
            bullet.getComponent('tank_enemies_bullet').init(
                this.node, this.node.x+67*Math.cos(angle), this.node.y-67*Math.sin(angle)+10, 
                this.player.x - (this.node.x+67*Math.cos(angle)), this.player.y-(this.node.y-67*Math.sin(angle)+10));
            cc.find("Canvas").addChild(bullet);
        }
        //console.log(this.bullet_x);
    }
    /*private playerAnimation(){
        if(this.kDown){
            var bullet = cc.instantiate(this.tank_enemy_bullet_Prefab);
            bullet.getComponent('tank_enemies_bullet').init(this.node,this.bullet_x);
            cc.find("Canvas").addChild(bullet);
        }
    }*/
}
