var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80,150, "loading please wait ....", { font: '30px Courier', fill:'#fff'});
        this.loadTexture();
        this.loadSound();
        this.loadPerso();
    },
    create: function() {
        game.state.start('menuStart');            
    },
    loadTexture: function(){
        game.load.image('sol', './assets/texture/sol.jpg');
        game.load.atlas('foods', './assets/texture/foods.png', './assets/texture/foods.json');
        
    },
    loadSound : function() {
        game.load.audio('music_theme', './assets/sound/music_theme.mp3');        
    },
    loadPerso: function() {
        game.player = player;
        game.player.create({
            // stuff : {
            //     shoes : slipper
            // }
        });
    }
}