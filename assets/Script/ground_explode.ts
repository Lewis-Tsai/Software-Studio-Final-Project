// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ground_explode extends cc.Component {

    private anim = null;
    @property({ type: cc.AudioClip })
    ground_explode_audio: cc.AudioClip = null;

    public init(x: number, y: number) 
    {
        this.anim = this.getComponent(cc.Animation);
        this.node.x = x;
        this.node.y = y;
        this.anim.play('ground_explode');
        cc.audioEngine.play(this.ground_explode_audio, false, 1);
    }
}
