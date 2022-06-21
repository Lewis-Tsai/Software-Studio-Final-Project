// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        Global.hostage_mode = false;
    },

    // update (dt) {},

    desert_btn_handler: function (event) {
        if(Global.hostage_mode)
            cc.director.loadScene("Stage 4");
        else
            cc.director.loadScene("Stage 1");
    },

    grassland_btn_handler: function (event) {
        if(Global.hostage_mode)
            cc.director.loadScene("Stage 5");
        else
            cc.director.loadScene("Stage 2");
    },

    snowfield_btn_handler: function (event) {
        if(Global.hostage_mode)
            cc.director.loadScene("Stage 6");
        else
            cc.director.loadScene("Stage 3");
    },

    ToMenu : function(){
        cc.director.loadScene("Menu");
    },

    ToggleControl: function(){
        Global.hostage_mode = !Global.hostage_mode;
        console.log(Global.hostage_mode);
    }

});
