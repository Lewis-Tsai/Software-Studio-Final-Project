const {ccclass, property} = cc._decorator;

@ccclass
export default class tank_enemies_bullet extends cc.Component {

    private anim = null;

    public init(node: cc.Node) 
    {
        this.anim = this.getComponent(cc.Animation);
        this.setInitPos(node);
        this.anim.play('tank_enemy_bullet');
        //let action = cc.moveBy(1,-500,0);
        //this.node.runAction(action);
    }

    private fire_bullet(){
        //let action = cc.moveBy(1,-500,0);
    }

    setInitPos(node: cc.Node){
        this.node.x = node.x - 50;
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
