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
        this.user_name_text.getComponent(cc.Label).string=   Global.user_name;

        if(scene.name == "Game Failed"){
            total_points = Global.score - Global.time_left * 10 - 100;

            this.user_data_text.getComponent(cc.Label).string= '\n' + '\n' + "  " + Global.score 
            + " - " + (Global.time_left * 30 + 100) + " = " + total_points;
        }
        else if (scene.name == "Game Completed"){
            total_points = Global.score + Global.time_left * 50;

            this.user_data_text.getComponent(cc.Label).string= '\n' + '\n' + "  " + Global.score 
            + " + " + Global.time_left + " X 50 = " + total_points;

            var record_time;
            if(180 - Global.time_left > 0)
                record_time = 180 - Global.time_left;
            else
                record_time = 360 - Global.time_left;
            if(record_time < Global.shortest_time)
                Global.shortest_time = record_time;
        }

        Global.score = total_points;
    },

    // update (dt) {},

    Tomenu: function(){
        this.UpdateBeforeExit('menu');
    },

    ToLeaderboard: function(){
        this.UpdateBeforeExit('leaderboard');
    },

    UpdateBeforeExit: function(opr){
        var ProfileRef = firebase.database().ref(Global.profile_path);
        ProfileRef.update({
            score: Global.score,
            total_battle: Global.total_battle,
            total_win: Global.total_win,
            shortest_time: Global.shortest_time,
        })
        .then(function () {
            console.log("profile data upload success");
            if(opr == "menu")
                cc.director.loadScene("Menu");
            else if(opr == "leaderboard")
                cc.director.loadScene("Leaderboard");
        }).catch(function (error) {
            alert(error);
        });
    }
});
