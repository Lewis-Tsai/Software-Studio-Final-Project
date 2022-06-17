const {ccclass, property} = cc._decorator;

@ccclass
export default class tank_enemies_bullet extends cc.Component {

    @property(cc.Node)
    player:cc.Node = null; // can't use in a prefab?

    private anim = null;

    public init(x: number, y: number, angle_x: number, angle_y: number) 
    {
        this.anim = this.getComponent(cc.Animation);
        this.node.x = x;
        this.node.y = y;
        this.anim.play('tank_enemy_bullet');
        const body = this.getComponent(cc.RigidBody);
        body.linearVelocity = cc.v2(angle_x,angle_y);
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
