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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {

    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "background_size") {
            var explode = cc.instantiate(this.explode_prefab);
            var newX;
            if(this.node.parent.scaleX > 0) {
                var len = Math.sqrt(this.node.position.x * this.node.position.x + this.node.position.y * this.node.position.y)
                var cos = this.node.position.x / len;
                var arccos = Math.acos(cos) * 180 / Math.PI;
                arccos -= this.node.parent.angle;
                newX = len * Math.cos(arccos * Math.PI / 180);
            }
            else {
                var len = Math.sqrt(this.node.position.x * this.node.position.x + this.node.position.y * this.node.position.y)
                var cos = this.node.position.x / len;
                var arccos = Math.acos(cos) * 180 / Math.PI;
                arccos += this.node.parent.angle;
                newX = -len * Math.cos(arccos * Math.PI / 180);
            }
            explode.setPosition(newX + this.node.parent.position.x, -200);
            cc.find("Canvas").addChild(explode);
            self.node.destroy();
            /*this.scheduleOnce( function() {
                explode.destroy();
            }, 0.15);*/
        }
    }
}
