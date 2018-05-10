var playState = {
    create : function() {
        this.keyboard = game.input.keyboard;
        this.music_theme = game.add.audio('music_theme');
        this.player = game.player;
        this.arrayMonster = [];
        game.add.sprite(0,0,"sol");
        this.player.generateSprite();
    },
    update : function() {
        this.player.update();
        for(var i = 0; i < this.arrayMonster.length; i++ ){
            this.arrayMonster[i].update();
        }
        this.checkcolition();
    },
    checkcolition : function(){
    
    }
}