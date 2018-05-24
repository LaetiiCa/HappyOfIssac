var playState = {
    create : function() {
        this.keyboard = game.input.keyboard;
        this.music_theme = game.add.audio('music_theme');
        this.player = game.player;
        game.arrayMonster = {};
        game.arrayBoss = {};
        game.add.sprite(0,-5,"sol");
        this.player.setLife(3,true);
        this.player.generateSprite();
        this.player.attachKey();
        this.player.drawAll();
        var tmp = new Alarm();
        game.arrayMonster[tmp.id] = tmp;
        var tmp = new nightmare();
        game.arrayMonster[tmp.id] = tmp;
        var tmp = new cat();
        game.arrayMonster[tmp.id] = tmp;
        var tmp = new mosquito();
        game.arrayMonster[tmp.id] = tmp;
       /* var tmp = new bird();
        game.arrayMonster[tmp.id] = tmp;
        var tmp = new phone();
        game.arrayMonster[tmp.id] = tmp;
        var tmp = new babySister();
        game.arrayBoss[tmp.id] = tmp;
        var tmp = new brother();
        game.arrayBoss[tmp.id] = tmp;
        var tmp = new grandfather();
        game.arrayBoss[tmp.id] = tmp;
        var tmp = new grandmother();
        game.arrayBoss[tmp.id] = tmp;*/
    },
    update : function() {
        if (this.player.life > 0 ){
            this.player.update();
            for(var i in game.arrayMonster){
                game.arrayMonster[i].update();
            }
            for(var i in game.arrayBoss){
                if (player.player.hasOwnProperty('body')) {
                    game.arrayBoss[i].update();
                }
            }
            this.checkcolition();
        }
    },
    checkcolition : function(){

    }
};
