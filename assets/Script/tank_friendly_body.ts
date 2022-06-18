const {ccclass, property} = cc._decorator;

@ccclass
export class tank_enemies_gun extends cc.Component {
    private anim = null; //this will use to get animation component
    private animateState = null; //this will use to record animationState
    @property(cc.Prefab)
    tank_white_bomb_Prefab: cc.Prefab = null;

    start() 
    {
        // add key down and key up event
        this.schedule(function(){
                var bullet = cc.instantiate(this.tank_white_bomb_Prefab);
                bullet.getComponent('tank_white_bomb').init(
                    this.node.x + 60, this.node.y, 300, 0, 0, 0);
                
                cc.find("Canvas").addChild(bullet);
        },4);
    }
}
