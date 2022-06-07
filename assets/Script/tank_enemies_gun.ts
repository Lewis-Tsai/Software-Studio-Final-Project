const {ccclass, property} = cc._decorator;

@ccclass
export default class tank_enemies_gun extends cc.Component {
    private anim = null; //this will use to get animation component
    private animateState = null; //this will use to record animationState
    @property(cc.Prefab)
    tank_enemy_bullet_Prefab: cc.Prefab = null;
    @property(cc.Node)
    player:cc.Node = null;

    update(dt)
    {
        this.playerMovement(dt);
        this.playerAnimation();
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
        var angle = dir.signAngle(cc.v2(1,0));
        var degree = angle / Math.PI * 180;
        this.node.rotation = degree + 160;
    }
    private playerAnimation(){
        if(this.kDown){
            //virsion 1
            /*var bullet = cc.instantiate(this.tank_enemy_bullet_Prefab);
            bullet.setPosition(this.node.x,this.node.y,0);
            let action = cc.moveBy(1,-200,0);
            bullet.runAction(action);
            cc.find("Canvas").addChild(bullet);*/
            var bullet = cc.instantiate(this.tank_enemy_bullet_Prefab);
            bullet.getComponent('tank_enemies_bullet').init(this.node);
            cc.find("Canvas").addChild(bullet);
        }
    }
}
