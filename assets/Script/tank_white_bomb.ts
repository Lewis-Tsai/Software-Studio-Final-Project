const {ccclass, property} = cc._decorator;

@ccclass
export default class tank_white_bomb extends cc.Component {

    @property({ type: cc.AudioClip })
    tank_shooting_audio: cc.AudioClip = null;

    private anim = null;

    public init(x: number, y: number, angle_x: number, angle_y: number, flag: number, degree: number) 
    {
        //this.anim = this.getComponent(cc.Animation);
        this.node.x = x;
        this.node.y = y;
        //this.anim.play('tank_enemy_bullet');
        if(flag==1){ // rotate the bomb
            this.node.angle = -(degree + 160);
        } 
        const body = this.getComponent(cc.RigidBody);
        cc.audioEngine.play(this.tank_shooting_audio, false, 1);
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
        if (this.timeAlive >= this.timeToLive) this.node.destroy();
    }
}