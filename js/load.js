var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80,150, "loading please wait ....", { font: '30px Courier', fill:'#fff'});
        this.loadTexture();
        this.loadSound();
        this.loadPerso();
    },
    create: function() {
        setTimeout(function(){
            game.state.start('menuStart');            
        }, 0);
    },
    loadTexture: function(){
        game.load.image('sol', './assets/texture/sol.jpg');
    },
    loadSound : function() {
        game.load.audio('music_theme', './assets/sound/music_theme.mp3');        
    },
    loadPerso: function() {
        game.player = player;
        game.player.create({});
    }
}