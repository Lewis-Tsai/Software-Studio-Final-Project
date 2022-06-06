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
                    }
                });
            } else {
                // No user is signed in.
                //user = null;
                //curr_user_email = '';
                alert("login failed");
                cc.director.loadScene("loading");
            }
        });
    },

    // update (dt) {},

    play_btn_handler: function (event) {
        cc.director.loadScene("Map select");
    },

    profile_btn_handler: function (event) {
        alert("not available");
    },

    leader_board_btn_handler: function (event) {
        alert("not available");
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
    }
});
