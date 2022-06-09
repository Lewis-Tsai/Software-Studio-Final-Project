const {ccclass, property} = cc._decorator;

@ccclass
export default class tank_enemies_bullet extends cc.Component {

    @property(cc.Node)
    player:cc.Node = null; // can't use in a prefab?

    private anim = null;

    public init(node: cc.Node, x: number, y: number, angle_x: number, angle_y: number) 
    {
        this.anim = this.getComponent(cc.Animation);
        this.node.x = x;
        this.node.y = y;
        this.anim.play('tank_enemy_bullet');
        const body = this.getComponent(cc.RigidBody);
        body.linearVelocity = cc.v2(angle_x,angle_y);
        /*let action = cc.moveBy(1, angle_x, angle_y);
        let finished = cc.callFunc(() => {
            this.node.destroy();
        });

        this.scheduleOnce(() => {
            this.node.runAction(cc.sequence(action, finished));
        }); */
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

    timeToLive = 4000
    
    timeAlive = 0

    update(dt) {
        if (!cc.isValid(this.node)) return

        this.timeAlive += dt * 1000
        if (this.timeAlive >= this.timeToLive) this.node.destroy()
    }
}
