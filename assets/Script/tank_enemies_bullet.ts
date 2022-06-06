// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class tank_enemies_bullet extends cc.Component {

    private anim = null;
    // when created, the bullet need to be placed at correct position and play animation.
    //@property(cc.Prefab)
    //tank_enemy_bullet_Prefab: cc.Prefab = null;

    public init(node: cc.Node) 
    {
        this.anim = this.getComponent(cc.Animation);
        this.setInitPos(node);
        this.anim.play('tank_enemy_bullet');
        let action = cc.moveBy(1,-500,0);
        this.node.runAction(action);
        //cc.find("Canvas").addChild(bullet)
    }

    setInitPos(node: cc.Node){
        this.node.x = node.x - 50;
        this.node.y = node.y;
    }

    onBeginContact(contact, selfCollider, otherCollider)
    {
        if(otherCollider.tag == 1){
            this.node.destroy();
        }
    }
}
