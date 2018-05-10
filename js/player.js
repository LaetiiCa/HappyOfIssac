var player = {
    create : function(){
        this.level = 1;
        this.velocity = 1;
        this.armor = 1;
        this.life = 3;
        this.sprite = 0;
        this.allCharacter = [issac, rabbit, snail];
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
    }
}
var issac = {};
var rabbit = {};
var snail = {};