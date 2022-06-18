const {ccclass, property} = cc._decorator;

@ccclass
export default class ground_explode extends cc.Component {

    private anim = null;
    @property({ type: cc.AudioClip })
    ground_explode_audio: cc.AudioClip = null;

    public init(x: number, y: number) 
    {
        this.anim = this.getComponent(cc.Animation);
        //this.node.position.x = 10;
        //this.node.position.y = 10;
        this.node.x = x;
        this.node.y = y;
        this.anim.play('ground_explode');
        cc.audioEngine.play(this.ground_explode_audio, false, 1); // nothing?
    }
}
