var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80,150, "loading please wait ....", { font: '30px Courier', fill:'#fff'});
        game.load.audio('music_theme', './assets/sound/music_theme.mp3');
        game.player = player;
        game.player.create();
    },
    create: function() {
        setTimeout(function(){
            game.state.start('menuStart');            
        }, 1000);
    }
}