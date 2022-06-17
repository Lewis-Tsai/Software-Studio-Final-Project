// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        user_name_text:{
            type: cc.Node,
            default: null
        },
        user_data_text:{
            type: cc.Node,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var scene = cc.director.getScene();
        var total_points;
        this.user_name_text.getComponent(cc.Label).string=  '🧑🏿 ' + Global.user_name;

        if(scene.name == "Game Failed"){
            total_points = Global.score - Global.time_left * 30 - 100;

            this.user_data_text.getComponent(cc.Label).string= '\n' + '\n' + "  " + Global.score 
            + " - " + (Global.time_left * 30 + 100) + " = " + total_points;
        }
        else if (scene.name == "Game Completed"){
            total_points = Global.score + Global.time_left * 50;

            this.user_data_text.getComponent(cc.Label).string= '\n' + '\n' + "  " + Global.score 
            + " + " + Global.time_left + " X 50 = " + total_points;
        }

        Global.score = total_points;
        var ProfileRef = firebase.database().ref(Global.profile_path);
        ProfileRef.update({
            score: total_points,
        })
        .then(function () {
            console.log("profile data upload success");
        }).catch(function (error) {
            alert(error);
        });
    },

    // update (dt) {},

    Tomenu: function(){
        cc.director.loadScene("Menu");
    },

    ToLeaderboard: function(){
        cc.director.loadScene("Leaderboard");
    },
});
