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
        xpvalue_text:{
            type: cc.Node,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                Global.user_email = user.email;
                curr_user_email = user.email;
                
                profile_path = curr_user_email.replace('.', '_');
                Global.profile_path = 'profile/' + profile_path;
                
                //profile_path = profile_path.replace('.', '_');
                console.log(curr_user_email)
                //--------------------
                var ProfileRef = firebase.database().ref('profile/' + profile_path);
                ProfileRef.once('value', function(snapshot) {
                    if(snapshot.val() == null){
                        console.log('data is missing');
                    }  
                    else{
                        //console.log(snapshot.val());
                        Global.user_name = snapshot.val().user_name;
                        Global.score = snapshot.val().score;
                        Global.total_battle = snapshot.val().total_battle;
                        Global.total_win = snapshot.val().total_win;
                        Global.engine_level = snapshot.val().engine_level;
                        Global.armor_level = snapshot.val().armor_level;
                        Global.machinegun_level = snapshot.val().machinegun_level;
                        Global.missile_level = snapshot.val().missile_level;
                        Global.shortest_time = snapshot.val().shortest_time;
                        Global.register_date = snapshot.val().register_date;
                    }
                });
            } else {
                // No user is signed in.
                //user = null;
                //curr_user_email = '';
                console.log("login failed");
                cc.director.loadScene("loading");
            }
            
        });
    },

    update (dt) {
        this.UpdateUI();
    },

    UpdateUI: function(){
        this.username_text.getComponent(cc.Label).string = Global.user_name;
        this.xpvalue_text.getComponent(cc.Label).string = " " + Global.score;
    },

    play_btn_handler: function (event) {
        cc.director.loadScene("Map select");
    },

    profile_btn_handler: function (event) {
        cc.director.loadScene("Profile");
    },

    leader_board_btn_handler: function (event) {
        cc.director.loadScene("Leaderboard");
    },

    credit_btn_handler: function (event) {
        alert("not available");
    },

    logout_btn_handler: function (event) {
        if(curr_user_email == ''){
            alert('How dare you log out when you are not logged in! DUMB ASS!');
            cc.director.loadScene("loading");
        }  
        else{
            firebase.auth().signOut().then(function() {
                alert("User log out success!");
            }).catch(function(error) {
                alert("User log out failed!", error);
            })
        }
    },

    ToStore: function(){
        cc.director.loadScene("Store");
    },
});
