// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bar: cc.Node = null;

    @property(cc.Node)
    gun: cc.Node = null;

    @property(cc.Node)
    circle: cc.Node = null;

    @property(cc.Node)
    middle: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(otherCollider.tag == 0){
            this.bar.width -= 10;
            if(this.bar.width <= 0){
                this.node.destroy();
                this.gun.destroy();
                this.circle.destroy();
                this.middle.destroy();
            }
        }
    }
}
