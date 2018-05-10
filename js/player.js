var player = {
    create : function(){
        this.level = 1;
        this.velocity = 1;
        this.armor = 1;
        this.life = 3;
        this.sprite = 0;
        this.allCharacter = [issac, rabbit, snail];
        this.setCharacter();        
        this.loadSprite();
        //Set image , keyboad  
    },
    update : function() {
        // check mouv
    },
    nextCharacter: function() {
        this.sprite++;
        if ( this.sprite >= this.allCharacter.length ){
            this.sprite = 0;
        }
        this.setCharacter();    
    },
    prevCharacter: function(){
        this.sprite--;
        if ( this.sprite < 0 ){
            this.sprite = this.allCharacter.length - 1;
        }
        this.setCharacter();
    },
    setCharacter: function() {
        this.character = this.allCharacter[this.sprite];
    },
    loadSprite: function(){
        game.load.atlas('issac', './assets/sprites/issac/issac.png', './assets/sprites/issac/issac.json');
        game.load.atlas('rabbit', './assets/sprites/rabbit/rabbit.png', './assets/sprites/rabbit/rabbit.json');
        game.load.atlas('snail', './assets/sprites/snail/snail.png', './assets/sprites/snail/snail.json');
    },
    generateSprite: function(){
        this.player = this.character.generateSprite();
        console.log(this.player);
    }
}

var issac = {
    name: "issac",
    generateSprite : function(){
        console.log('Hello');
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, this.name);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(2, 2);
        this.player.annimations.add('top00');
        return this.player;
    }
};
var rabbit = {
    name: "rabbit",
    generateSprite : function(){
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, this.name);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(0.5, 0.5);
        return this.player;
    }
};
var snail = {
    name: "snail",
    generateSprite : function(){
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, this.character.name);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.scale.setTo(0.5, 0.5);
        return this.player;
    }
};