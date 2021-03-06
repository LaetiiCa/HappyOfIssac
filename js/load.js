var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80,150, "loading please wait ....", { font: '30px Courier', fill:'#fff'});
        this.loadTexture();
        this.loadSound();
        this.loadPerso();
        this.loadMonster();
        this.loadBoss();
        this.loadItems();
    },
    create: function() {
        game.state.start('menuStart');
    },
    loadTexture: function(){
        game.load.image('sol', './assets/texture/sol.png');
        game.load.image('floor', './assets/texture/blanc.png');
        game.load.image('nuage', './assets/texture/nuage.png');
        game.load.image('backgroundMenu', './assets/texture/backgroundMenu.png');
        game.load.image('monstersMenu', './assets/texture/monsters.png');
        game.load.image('bossMenu', './assets/texture/boss.png');
        game.load.image('charactersMenu', './assets/texture/characters.png');
        game.load.image('keysArrows', './assets/texture/keysArrows.png');
        game.load.image('keysAE', './assets/texture/ae.png');
        game.load.image('zqsd', './assets/texture/zqsd.png');
        game.load.image('charactersMenu', './assets/texture/characters.png');
        game.load.image('porte', './assets/texture/porte.png');
        game.load.atlas('foods', './assets/texture/foods.png', './assets/texture/foods.json');
        game.load.atlas('foods2', './assets/texture/foods2.png', './assets/texture/foods.json');
        game.load.atlas('life', './assets/texture/life.png', './assets/texture/life.json');
        game.load.atlas('explosion_blue', './assets/texture/explosion_blue.png', './assets/texture/explosion.json');
        game.load.atlas('explosion', './assets/texture/explosion_lit.png', './assets/texture/explosion.json');
    },
    loadSound : function() {
        game.load.audio('music_theme', './assets/sound/music_theme.mp3');
        game.load.audio('fire', './assets/sound/fire.wav');
    },
    loadPerso: function() {
        game.player = player;
        game.player.create({});
    },
    loadMonster: function() {
        game.load.atlas('alarm', './assets/sprites/alarm/alarm.png','./assets/sprites/alarm/alarm.json');
        game.load.atlas('cat', './assets/sprites/cat/cat.png','./assets/sprites/cat/cat.json')
        game.load.atlas('nightmare', './assets/sprites/nightmare/ghost.png','./assets/sprites/nightmare/nightmare.json')
        game.load.atlas('mosquito', './assets/sprites/mosquito/mosquito.png','./assets/sprites/mosquito/mosquito.json');
        game.load.atlas('bird', './assets/sprites/bird/bird.png', './assets/sprites/bird/bird.json')
        game.load.atlas('phone', './assets/sprites/phone/phone.png', './assets/sprites/phone/phone.json')
    },
    loadBoss : function () {
        game.load.atlas('babySister', './assets/sprites/babySister/babySister.png', './assets/sprites/babySister/babySister.json');
        game.load.atlas('brother', './assets/sprites/brother/brother.png', './assets/sprites/brother/brother.json');
        game.load.atlas('grandfather', './assets/sprites/grandfather/grandfather.png', './assets/sprites/grandfather/grandfather.json');
        game.load.atlas('grandmother', './assets/sprites/grandmother/grandmother.png', './assets/sprites/grandmother/grandmother.json');
        game.load.atlas('mother', './assets/sprites/mother/mother.png', './assets/sprites/mother/mother.json');
        game.load.atlas('father', './assets/sprites/father/father.png', './assets/sprites/father/father.json');
    },
    loadItems : function() {
        game.load.atlas('pillow', pillow.image, pillow.json);
        game.load.atlas('drug', drug.image, drug.json);
    }
};
