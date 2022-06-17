// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class tank_enemies_body extends cc.Component {

    @property(cc.Node)
    blood: cc.Node = null;

    @property(cc.Node)
    explode: cc.Node = null;

    @property(cc.Prefab)
    explode_prefab: cc.Prefab = null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        
    }

    onBeginContact(contact, selfCollider, otherCollider)
    {
        //var to_explode = this.explode.getComponent(cc.Animation);
        if(otherCollider.tag == 0){
            if(this.blood.width > 0){
                this.blood.width -= 20;
                if(this.blood.width<=0){
                    this.node.destroy();
                    //to_explode.play('ground_explode');
                    var explode = cc.instantiate(this.explode_prefab);
                    explode.getComponent('ground_explode').init(this.node.x, this.node.y+150);
                    cc.find("Canvas").addChild(explode);
                }
            }
        }
        else if(otherCollider.tag == 100){
            if(this.blood.width > 0){
                this.blood.width -= 5;
                otherCollider.node.destroy();
                if(this.blood.width<=0){   
                    this.node.destroy();
                    //to_explode.play('ground_explode');
                    var explode = cc.instantiate(this.explode_prefab);
                    explode.getComponent('ground_explode').init(this.node.x, this.node.y+150);
                    cc.find("Canvas").addChild(explode);
                }
            }
        }
    }
}
