// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        text:{
            type: cc.Node,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var info_array = [];
        var ProfileRef = firebase.database().ref('profile/');
        var show_string = '';

        ProfileRef.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childshot) {
                console.log(childshot.val().score, childshot.val().user_name);
                info_array.push([childshot.val().score, childshot.val().user_name]);
            });
            info_array.sort(function(a,b){
                console.log('h');
                return b[0]-a[0];
            });
            console.log(info_array);
            for(var i = 0; i < info_array.length; i++)
                show_string += '🧑🏿 ' + info_array[i][1]  + "    " + info_array[i][0] + '\n' + '\n';
        }).catch(function (error) {
            alert(error);
        });
        //this.text.getComponent(cc.Label).string = show_string;
        this.schedule(function() {
            console.log('here');
            this.text.getComponent(cc.Label).string = show_string;
        }, 0.5, 0);
    },

    // update (dt) {},

    sortFunction: function(a, b) {
        console.log(a[0], b[0]);
        return a[0] - b[0];
    },
    
    ToMenu : function(){
        cc.director.loadScene("Menu");
    },
});
