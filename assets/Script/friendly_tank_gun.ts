// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class friendly_tank_gun extends cc.Component {
    private target: cc.Node = null;
    

    public setTarget(TTarget : cc.Node){
        console.log("this is setting target for tv2 : " , TTarget.name);
        this.target = TTarget;
    }
    /*rotate(angle: number){
        this.node.angle = angle;
    }*/
    update(dt){
        let pa = this.node.parent;
        let X = -pa.position.x + this.target.position.x;
        let Y = -pa.position.y + this.target.position.y;
    
        let cos = X/Math.sqrt(X*X + Y*Y);
        let sin = Y/Math.sqrt(X*X + Y*Y);
        let temp_angle = Math.asin(sin) * 180 / Math.PI;
        if(this.target.x > pa.x) this.node.angle = temp_angle - 180;
        else if(this.target.x <= pa.x) this.node.angle = -temp_angle;
    }
}
