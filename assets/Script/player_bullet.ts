// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class player_bullet extends cc.Component {

    @property(cc.Prefab)
    explode_prefab: cc.Node = null;

    private player_angle = 0;
    private player_scale = 1;

    // onLoad () {}

    start () {
        this.player_angle = this.node.parent.angle;
        this.player_scale = this.node.parent.scaleX;
    }

    update (dt) {
        
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "ground") {
            var explode = cc.instantiate(this.explode_prefab);
            explode.setPosition(this.node.position.x , -180);
            cc.find("Canvas").addChild(explode);
            self.node.destroy();
            /*this.scheduleOnce( function() {
                explode.destroy();
            }, 0.15);*/
        }
    }
}
