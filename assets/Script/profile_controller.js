// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        username_text:{
            type: cc.Node,
            default: null
        },
        battle_count_text:{
            type: cc.Node,
            default: null
        },
        winrate_count_text:{
            type: cc.Node,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.UpdateUI();
    },

    UpdateUI: function(){
        this.username_text.getComponent(cc.Label).string = Global.user_name;
        this.battle_count_text.getComponent(cc.Label).string = Global.total_battle;
        this.winrate_count_text.getComponent(cc.Label).string = ((100 * Global.total_win) / Global.total_battle).toFixed(2) + "%";
    },

    ToMenu : function(){
        cc.director.loadScene("Menu");
    },
});
