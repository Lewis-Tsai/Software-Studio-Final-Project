const {ccclass, property} = cc._decorator;

@ccclass
export default class smoke extends cc.Component {

    private anim = null;

    public init(x: number, y: number) 
    {
        this.anim = this.getComponent(cc.Animation);
        this.node.x = x;
        this.node.y = y;
        this.anim.play('smoke');
        let action = cc.moveBy(6,0,200);
        this.node.runAction(action);
        let action_1 = cc.fadeTo(6,0);
        this.node.runAction(action_1);
        this.schedule(function(){
            this.node.destroy();
        },6);
    }
}
