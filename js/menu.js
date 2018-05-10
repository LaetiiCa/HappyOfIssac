var menuState = {
    create : function() {
        game.add.text(80,80, "Issac is Happy", { font: '50px Arial', fill :'#fff'});
        game.add.text(80,game.world.height -80, 'press w to start', { font: '25px Arial', fill :'#fff'});

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wKey.onDown.addOnce(this.start, this);
    },
    start: function(){
        console.log("Go");
        game.state.start('play');
    }
}