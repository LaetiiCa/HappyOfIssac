var playState = {
    create : function() {
        this.keyboard = game.input.keyboard;
        //game.world.setBounds(0,0,5000,5000);
        var c ='#acd6f5';
        game.stage.backgroundColor = c;
        
        this.player = game.player;
        game.arrayMonster = {};
        game.add.sprite(0,-5,"sol");
        var music = game.add.audio('music_theme');
        music.play();
        music.onStop = {
            dispatch: () => {
                music.play();
            }
        }
        game.arrayBoss = {};
        this.player.setLife(3,true);
        this.player.generateSprite();
        this.player.attachKey();
        this.player.drawAll();
        //game.arrayMonster.push(new Alarm());
        // var tmp = new nightmare();
        // game.arrayMonster[tmp.id] = tmp;
        // var tmp = new cat();
        // game.arrayMonster[tmp.id] = tmp;
        // //game.arrayMonster.push(new mosquito());
        // var tmp = new bird();
        // game.arrayMonster[tmp.id] = tmp;
        //game.arrayMonster.push(new phone());
        // var tmp = new babySister();
        // game.arrayBoss[tmp.id] = tmp;
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
        for ( var i = 0; i< game.AllItems.length; i++){
            if (game.AllItems[i] != null){
                if (game.physics.arcade.collide(game.AllItems[i].sprite, this.player.player.body) || game.physics.arcade.collide(game.AllItems[i].sprite, this.player.player.head)) {
                    player.setLife(player.life + game.AllItems[i].addLife);
                    game.AllItems[i].sprite.kill();
                    game.AllItems[i] = null;
                }
            }
        }
    }
};
