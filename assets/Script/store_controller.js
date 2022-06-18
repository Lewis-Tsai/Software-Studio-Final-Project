// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        engine_level_text:{
            type: cc.Node,
            default: null
        },
        engine_button:{
            type: cc.Node,
            default: null
        },
        engine_button_text:{
            type: cc.Node,
            default: null
        },
        armor_level_text:{
            type: cc.Node,
            default: null
        },
        armor_button:{
            type: cc.Node,
            default: null
        },
        armor_button_text:{
            type: cc.Node,
            default: null
        },
        machinegun_level_text:{
            type: cc.Node,
            default: null
        },
        machinegun_button:{
            type: cc.Node,
            default: null
        },
        machinegun_button_text:{
            type: cc.Node,
            default: null
        },
        missile_level_text:{
            type: cc.Node,
            default: null
        },
        missile_button:{
            type: cc.Node,
            default: null
        },
        missile_button_text:{
            type: cc.Node,
            default: null
        },
        XP_text:{
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

    UpdateUI(){
        var engine_level_table = [-1, 0, 200, 400, 800];
        var armor_level_table = [-1, 0, 300, 700, 1100];
        var machinegun_level_table = [-1, 0, 250, 500, 1300];
        var missile_level_table = [-1, 0, 450, 900, 1500];
        if(Global.engine_level == 4)
            this.engine_button.getComponent(cc.Button).interactable = false;
        else{
            this.engine_level_text.getComponent(cc.Label).string = "LVL " + (Global.engine_level + 1);
            this.engine_button_text.getComponent(cc.Label).string = engine_level_table[Global.engine_level + 1];
        }
        if(Global.armor_level == 4)
            this.armor_button.getComponent(cc.Button).interactable = false;
        else{
            this.armor_level_text.getComponent(cc.Label).string = "LVL " + (Global.armor_level + 1);
            this.armor_button_text.getComponent(cc.Label).string = armor_level_table[Global.armor_level + 1];
        }
        if(Global.machinegun_level == 4)
            this.machinegun_button.getComponent(cc.Button).interactable = false;
        else{
            this.machinegun_level_text.getComponent(cc.Label).string = "LVL " + (Global.machinegun_level + 1);
            this.machinegun_button_text.getComponent(cc.Label).string = machinegun_level_table[Global.machinegun_level + 1];
        }
        if(Global.missile_level == 4)
            this.missile_button.getComponent(cc.Button).interactable = false;
        else{
            this.missile_level_text.getComponent(cc.Label).string = "LVL " + (Global.missile_level + 1);
            this.missile_button_text.getComponent(cc.Label).string = missile_level_table[Global.missile_level + 1];
        }
        
        this.XP_text.getComponent(cc.Label).string = Global.score;
    },

    engine_button_handler(){
        var engine_level_table = [-1, 0, 200, 400, 800];
        if(Global.engine_level < 4 && Global.score >= engine_level_table[Global.engine_level + 1]){
            Global.score -= engine_level_table[Global.engine_level + 1];
            Global.engine_level++;
        }
    },

    armor_button_handler(){
        var armor_level_table = [-1, 0, 300, 700, 1100];
        if(Global.armor_level < 4 && Global.score >= armor_level_table[Global.armor_level + 1]){
            Global.score -= armor_level_table[Global.armor_level + 1];
            Global.armor_level++;
        }
    },

    machinegun_button_handler(){
        var machinegun_level_table = [-1, 0, 250, 500, 1300];
        if(Global.machinegun_level < 4 && Global.score >= machinegun_level_table[Global.machinegun_level + 1]){
            Global.score -= machinegun_level_table[Global.machinegun_level + 1];
            Global.machinegun_level++;
        }
    },

    missile_button_handler(){
        var missile_level_table = [-1, 0, 450, 900, 1500];
        if(Global.missile_level < 4 && Global.score >= missile_level_table[Global.missile_level + 1]){
            Global.score -= missile_level_table[Global.missile_level + 1];
            Global.missile_level++;
        }
    },

    ToMenu(){
        var ProfileRef = firebase.database().ref(Global.profile_path);
        ProfileRef.update({
            score: Global.score,
            engine_level: Global.engine_level,
            armor_level: Global.armor_level,
            machinegun_level: Global.machinegun_level,
            missile_level: Global.missile_level
        })
        .then(function () {
            console.log("profile data upload success");
            cc.director.loadScene("Menu");
        }).catch(function (error) {
            alert(error);
        });
    }
});
