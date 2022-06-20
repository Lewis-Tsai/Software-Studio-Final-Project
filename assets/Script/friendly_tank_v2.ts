const {ccclass, property} = cc._decorator;

@ccclass
export class friendly_tank_v2 extends cc.Component {
    private anim = null; //this will use to get animation component
    private animateState = null; //this will use to record animationState
    private canvas: cc.Node = null;
    private tag = true;
    private target: cc.Node = null;
    private gun: cc.Node = null;
    private blood: cc.Node = null;
    private player: cc.Node = null;
    private node_b: cc.Node = null;
    private tank: cc.Node = null;

    @property(cc.Prefab)
    friendly_tank_missile_Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    smoke_Prefab: cc.Prefab = null;

    @property(cc.Prefab)
    bomb_prefab: cc.Prefab = null;

    onLoad(){
        this.canvas = cc.find("Canvas");
        this.gun = cc.find("Canvas/friendly_tank_v2/gun");
        this.blood = cc.find("Canvas/friendly_tank_v2/blood");
        this.player = cc.find("Canvas/Player");
        this.tank = cc.find("Canvas/friendly_tank_v2");
    }

    start() 
    {
        this.schedule(this.preparegun,2);
    }

    update(dt)
    {
        this.playerMovement(dt);
        //if(this.node.x - cc.find("Canvas/Main Camera").x < 960) {
           // this.node.x += 20 * dt;//can view=> moving
        //}
        if(this.player.x > this.node.x) this.node.x += 20*dt;
    }
    preparegun(){
        //in view then can fire
        if (this.node.x - cc.find("Canvas/Main Camera").x < 960) this.loadgun();
    }
    loadgun(){
        this.node_b = cc.instantiate(this.friendly_tank_missile_Prefab); 
        if (this.node.scaleX > 0) this.node_b.setPosition(1,0);
        else this.node_b.setPosition(-1,0);
        this.node.addChild(this.node_b);
    }
    public setTarget(TTarget : cc.Node){
        console.log("this is setting target for tv2 : " , TTarget.name);
        this.target = TTarget;
    }

    private playerMovement(dt)
    {
        if(this.target == null){
            console.log('isnullllllll');
        }
        else{
            var dx = this.target.position.x - this.node.position.x;
            var dy = this.target.position.y - this.node.position.y;
            var dir = cc.v2(dx,dy);
            var angle = dir.signAngle(cc.v2(1,0)); //in radiant
            var degree = angle / Math.PI * 180;
            this.gun.angle = -(degree + 175);
        }
    }
    onBeginContact(contact, selfCollider, otherCollider)
    {
        //var to_explode = this.explode.getComponent(cc.Animation);
        if(otherCollider.node.name == "bullet_enemy"){
            if(this.blood.width > 0){
                this.blood.width -= 10;
                if(this.blood.width<=0){
                    var explode = cc.instantiate(this.bomb_prefab);
                    explode.getComponent('ground_explode').init(this.gun.x, this.gun.y+130);
                    cc.find("Canvas").addChild(explode);
                    this.node.destroy();
                }
            }
        }
    }
}
