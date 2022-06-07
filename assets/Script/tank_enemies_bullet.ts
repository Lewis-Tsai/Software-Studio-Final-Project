const {ccclass, property} = cc._decorator;

@ccclass
export default class tank_enemies_bullet extends cc.Component {

    @property(cc.Node)
    player:cc.Node = null; // can't use in a prefab?

    private anim = null;

    public init(node: cc.Node, x: number, y: number, angle_x: number, angle_y: number) 
    {
        console.log('x = ',x);
        this.anim = this.getComponent(cc.Animation);
        //this.setInitPos(node);
        this.node.x = x;
        this.node.y = y;
        this.anim.play('tank_enemy_bullet');
        let action = cc.moveBy(1, angle_x, angle_y);
        //this.node.runAction(action);
        let finished = cc.callFunc(() => {
            //this.bulletManager.put(this.node);
            this.node.destroy();
        });

        // after playing animation, the bullet move 0.8s and destroy itself(put back to the bullet manager)
        this.scheduleOnce(() => {
            this.node.runAction(cc.sequence(action, finished));
        }); 

        //this.node.destroy();
    }

    private fire_bullet(x: number, y:number){
        var dx = this.player.x - x;
        var dy = this.player.y - y;
        let action = cc.moveBy(1,dx,dy);
        this.node.runAction(action);
        console.log('gigigigiigigigigig');
    }

    setInitPos(node: cc.Node){
        //this.node.x = node.x - 50;
        //this.node.x = this.gun.bullet_x;
        this.node.y = node.y;
    }

    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(otherCollider.tag == 1 || otherCollider.tag == 2){
            console.log('here');
            this.node.destroy();
        }
    }
}
