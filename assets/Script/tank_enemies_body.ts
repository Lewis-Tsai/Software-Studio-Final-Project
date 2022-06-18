const {ccclass, property} = cc._decorator;

@ccclass
export default class tank_enemies_body extends cc.Component {

    @property(cc.Node)
    blood: cc.Node = null;

    @property(cc.Node)
    gun: cc.Node = null;

    private player: cc.Node = null;

    @property(cc.Node)
    explode: cc.Node = null;

    @property(cc.Prefab)
    explode_prefab: cc.Prefab = null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.player = cc.find("Canvas/Player");
    }

    onBeginContact(contact, selfCollider, otherCollider)
    {
        //var to_explode = this.explode.getComponent(cc.Animation);
        if(otherCollider.node.name == "player_bullet"){
            if(this.blood.width > 0){
                this.blood.width -= 3;
                if(this.blood.width<=0){
                    var explode = cc.instantiate(this.explode_prefab);
                    explode.getComponent('ground_explode').init(this.gun.x, this.gun.y+130);
                    cc.find("Canvas").addChild(explode);
                    this.gun.destroy();
                    this.player.getComponent("Player").score += 100;
                }
            }
        }
        // friendly tank bullet
        else if(otherCollider.tag == 100){
            if(this.blood.width > 0){
                this.blood.width -= 3;
                otherCollider.node.destroy();
                if(this.blood.width<=0){   
                    var explode = cc.instantiate(this.explode_prefab);
                    explode.getComponent('ground_explode').init(this.gun.x, this.gun.y+130);
                    cc.find("Canvas").addChild(explode);
                    this.gun.destroy();
                    this.player.getComponent("Player").score += 100;
                }
            }
        }
        else if(otherCollider.node.name == "bullet_friend"){
            if(this.blood.width > 0){
                this.blood.width -= 10;
                otherCollider.node.destroy();
                if(this.blood.width<=0){   
                    var explode = cc.instantiate(this.explode_prefab);
                    explode.getComponent('ground_explode').init(this.gun.x, this.gun.y+130);
                    cc.find("Canvas").addChild(explode);
                    this.gun.destroy();
                    this.player.getComponent("Player").score += 100;
                }
            }
        }
        else if(otherCollider.node.name == "missile"){
            if(this.blood.width > 0){
                this.blood.width -= 200;
                otherCollider.node.destroy();
                if(this.blood.width<=0){   
                    var explode = cc.instantiate(this.explode_prefab);
                    explode.getComponent('ground_explode').init(this.gun.x, this.gun.y+130);
                    cc.find("Canvas").addChild(explode);
                    this.gun.destroy();
                    this.player.getComponent("Player").score += 100;
                }
            }
        }
    }
}
