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
        shortest_time_count_text:{
            type: cc.Node,
            default: null
        },
        register_date_text:{
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
        if(Global.shortest_time == 500)
            this.shortest_time_count_text.getComponent(cc.Label).string = "N/A";
        else{
            if(this.time % 60 < 10)
                this.time_label.getComponent(cc.Label).string = Math.floor(this.time/60).toString() + ":0" + (this.time%60);
            else
                this.time_label.getComponent(cc.Label).string = Math.floor(this.time/60).toString() + ":" + (this.time%60);
        }
        this.register_date_text.getComponent(cc.Label).string = "Registered: " + Global.register_date;
    },

    ToMenu : function(){
        cc.director.loadScene("Menu");
    },
});
