var playState = {
    create : function() {
        this.keyboard = game.input.keyboard;
        this.music_theme = game.add.audio('music_theme');
        this.player = game.player;
        game.arrayMonster = [];
        game.add.sprite(0,-5,"sol");
        this.player.generateSprite();
        this.player.attachKey();
        //game.arrayMonster.push(new Alarm());
        //game.arrayMonster.push(new nightmare());
        //game.arrayMonster.push(new cat());
        game.arrayMonster.push(new mosquito());
        //game.arrayMonster.push(new bird());
        //game.arrayMonster.push(new phone());
    },
    update : function() {
        this.player.update();
        for(var i = 0; i < game.arrayMonster.length; i++ ){
            game.arrayMonster[i].update();
        }
        this.checkcolition();
    },
    checkcolition : function(){

    }
}
