var menuState = {
    create : function() {
        game.add.text(80,80, "Issac is Happy", { font: '50px Arial', fill :'#fff'});
        game.add.text(80,game.world.height -80, 'press W to start a new game', { font: '25px Arial', fill :'#fff'});

        var wKey = game.input.keyboard.addKey(87);

        wKey.onDown.addOnce(this.startNewGame, this);
    },
    startNewGame: function(){
        player.create({
            stuff : {
//                arms : "ice"
            }
        });
        game.state.start('play');
    }
}