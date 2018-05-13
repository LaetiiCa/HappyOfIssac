var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80,150, "loading please wait ....", { font: '30px Courier', fill:'#fff'});
        this.loadTexture();
        this.loadSound();
        this.loadPerso();
        this.loadMonster();
    },
    create: function() {
        game.state.start('menuStart');
    },
    loadTexture: function(){
        game.load.image('sol', './assets/texture/sol.jpg');
        game.load.atlas('foods', './assets/texture/foods.png', './assets/texture/foods.json');
        game.load.atlas('explosion_blue', './assets/texture/explosion_blue.png', './assets/texture/explosion_blue.json');
    },
    loadSound : function() {
        game.load.audio('music_theme', './assets/sound/music_theme.mp3');
    },
    loadPerso: function() {
        game.player = player;
        game.player.create({
            stuff : {
                arms : "candy"
            }
        });
    },
    loadMonster: function() {
        game.load.atlas('alarm', './assets/sprites/alarm/alarm.png','./assets/sprites/alarm/alarm.json');
        game.load.atlas('cat', './assets/sprites/cat/cat.png','./assets/sprites/cat/cat.json')
        game.load.atlas('nightmare', './assets/sprites/nightmare/ghost.png','./assets/sprites/nightmare/nightmare.json')
        game.load.atlas('mosquito', './assets/sprites/mosquito/mosquito.png','./assets/sprites/mosquito/mosquito.json');
        game.load.atlas('bird', './assets/sprites/bird/bird.png', './assets/sprites/bird/bird.json')
        game.load.atlas('phone', './assets/sprites/phone/phone.png', './assets/sprites/phone/phone.json')
    }
}
