var player = {

    /**Set Params */
    create : function( params ){

        this.defaultInput = {
         'up' : params.up ? params.up : 'z' ,
         'down' : params.down ? params.down : 's',
         'left' : params.left ? params.left : 'q',
         'right' : params.right ? params.right : 'd',
         'next' : params.nextCharacter ? params.nextCharacter : 'e',
         'prev': params.prevCharacter ? params.prevCharacter : 'a'
        };
        this.mouv = {up : false, down : false, left : false, right :false };
        this.allCharacter = [issac, rabbit, snail];
        this.sprite = 0;
        this.stuff = { arms : null , shoes : null , hat : null };
        this.lastFire = new Date();
        this.timeBetweenTwoShoot = 0.8;
        this.ballShoot = {};
        this.setCharacter();
        this.setLevel(params.level ? params.level : 1 );
        this.setLife(params.life ? params.life : 3 );
        this.setAllStuff( params.stuff ? params.stuff : {} );
        this.loadSprite();
    },
    setVelocity : function(velocity){
        this.velocity = velocity* 100;
    },
    setCharacter: function() {
        this.character = this.allCharacter[this.sprite];
    },
    setLevel : function(level) {
        this.level = level;
    },
    setArmor: function(armor){
        this.armor = armor;
    },
    setLife: function(life){
        this.life = life;
    },
    setAllStuff: function( stuff ){
        this.setArms(stuff.arms ? stuff.arms : null);
        this.setHat(stuff.hat ? stuff.hat : null);
        this.setShoes(stuff.shoes ? stuff.shoes : null);
    },
    setArms: function( arms ) {
        this.stuff.arms = arms;
    },
    setShoes: function( shoes ) {
        if ( shoes == null ){
            shoes = {
                velocity : 0,
            };
        }
        console.log(shoes);
        this.stuff.shoes = shoes;
    },
    setHat: function( hat ) {
        if (hat == null){
            hat = {
                armor : 0,
            }
        }
        this.stuff.hat = hat;
    },
    loadSprite: function(){
        game.load.atlas('issac', './assets/sprites/issac/issac2.png', './assets/sprites/issac/issac.json');
        game.load.atlas('rabbit', './assets/sprites/rabbit/rabbit.png', './assets/sprites/rabbit/rabbit.json');
        game.load.atlas('snail', './assets/sprites/snail/snail.png', './assets/sprites/snail/snail.json');
    },
    /** End set params */


    /** Gestion de la boucle */
    getVelocity: function(){
      return this.velocity + ( this.stuff.shoes.velocity * 100 );  
    },
    getArmor: function(){
        return this.armor + this.stuff.hat.armor;
    },
    update : function() {
        this.checkMouv();
        this.checkFire();
        for ( i in this.ballShoot){
            this.ballShoot[i].update();
        }
    },
    checkMouv: function (){
        if ( this.mouv.up ){
            this.player.body.body.velocity.y = -1 * this.getVelocity();
        }
        else if ( this.mouv.down ){
            this.player.body.body.velocity.y =  this.getVelocity();
        }
        else {
            this.player.body.body.velocity.y = 0;
        }

        if ( this.mouv.left ){
            this.player.body.body.velocity.x = -1 * this.getVelocity();
        }
        else if ( this.mouv.right ){
            this.player.body.body.velocity.x = this.getVelocity();
        }
        else {
            this.player.body.body.velocity.x = 0;
        }
    },
    checkFire : function() {
        if ( this.player.head != undefined ){
            if ( this.fireDirection.up.isDown ) {
                this.player.head.animations.play('up' ,1 , false);
                this.weaponShoot('up');
            }
            else if ( this.fireDirection.down.isDown ) {
                this.player.head.animations.play('down',1 , false);
                this.weaponShoot('down');
            }
            else if ( this.fireDirection.left.isDown ) {
                this.player.head.animations.play('left',1 , false);
                this.weaponShoot('left');
            }
            else if ( this.fireDirection.right.isDown ) {
                this.player.head.animations.play('right',1 , false);
                this.weaponShoot('right');
            }
        }
    },
    /** End Gestion de la boucle */


    /**Gestion des different character */
    getPosition: function() {
        return this.player.body.position;
    },
    nextCharacter: function() {
        this.sprite++;
        if ( this.sprite >= this.allCharacter.length ){
            this.sprite = 0;
        }
        this.setCharacter();    
    },
    prevCharacter: function() {
        this.sprite--;
        if ( this.sprite < 0 ){
            this.sprite = this.allCharacter.length - 1;
        }
        this.setCharacter();
    },
    generateSprite: function(){
        if ( this.player == undefined ){
            var position = {x : game.world.centerX, y : game.world.centerY};
        }
        else {
            var position = this.getPosition();
        }
        this.player = this.character.generateSprite(position);
        this.setArmor(this.character.armor);
        this.setVelocity(this.character.velocity);
    },
    /** End Gestion des different character */
    attachKey : function(){
        var that = this;
        game.input.keyboard.onDownCallback = function(e){
            if ( e.key == that.defaultInput.up ){
                that.mouv.up = true;
                that.player.body.animations.play('up', 5, true);
            }
            if ( e.key == that.defaultInput.down ){
                that.mouv.down = true;
                that.player.body.animations.play('down', 5, true);
            }
            if ( e.key == that.defaultInput.left ){
                that.mouv.left = true;
                that.player.body.animations.play('left', 5, true);                
            }
            if ( e.key == that.defaultInput.right ){
                that.mouv.right = true;
                that.player.body.animations.play('right', 5, true);                
            }
            if ( e.key === that.defaultInput.next ){
                that.character.killSprite();                
                that.nextCharacter();
                that.generateSprite();
            }
            else if ( e.key === that.defaultInput.prev ) {
                that.character.killSprite();                
                that.prevCharacter();
                that.generateSprite();
            }
        }

        game.input.keyboard.onUpCallback = function(e){

            if ( e.key == that.defaultInput.up ){
                that.mouv.up = false;
                that.player.body.animations.play('upStatic', that.character.animationsFrames, true);
            }
            if ( e.key == that.defaultInput.down ){
                that.mouv.down = false;
                that.player.body.animations.play('downStatic', that.character.animationsFrames, true);                
            }
            if ( e.key == that.defaultInput.left ){
                that.mouv.left = false;
                that.player.body.animations.play('leftStatic', that.character.animationsFrames, true);          
            }
            if ( e.key == that.defaultInput.right ){
                that.mouv.right = false;
                that.player.body.animations.play('rightStatic', that.character.animationsFrames, true);          
            }
        }
        this.fireDirection = game.input.keyboard.createCursorKeys();
    },

    /** Gestion de combats */
    weaponShoot: function( direction ){ 
        if ( ( new Date() - this.lastFire ) / 1000 > this.timeBetweenTwoShoot ){
            this.lastFire = new Date();

            if ( this.stuff.arms == 'ice' ){
                var ball = new ice(direction, this);
            }
            else if ( this.stuff.arms == 'sprout' ){
                var ball = new sprout(direction, this);
            }
            else if ( this.stuff.arms == 'candy'){
                var ball = new candy(direction, this);
            }
            else {
                var ball = new litleBall(direction, this);                  
            }

            ball.genearteSprite( this.getPosition() );
            this.ballShoot[ball.id] = ball;
        }
    },
    destroyBallShoot: function( ball ){
        ball.sprite.kill();
        delete this.ballShoot[ball.id];
    },
    setDamage: function ( damage ) {
        this.setLife( this.life - ( damage / this.getArmor() ) )
    }
    /** End gestion des combats */
}

var issac = {
    name: "issac",
    velocity : 1,
    armor : 1,
    animationsFrames : 12,
    generateSprite : function( position ){
        this.player = {};
        // Add Body
        this.player.body = game.add.sprite(position.x, position.y, this.name);
        this.player.body.anchor.setTo(0.5, 0.5);
        this.player.body.scale.setTo(1.5, 1.5);
        // Add head
        this.player.head = this.player.body.addChild(game.add.sprite(0, -13, this.name))
        this.player.head.anchor.setTo(0.5, 0.5);
        this.player.head.scale.setTo(1, 1);
        game.physics.arcade.enable([this.player.body, this.player.head]);
        
        this.player.body.body.collideWorldBounds = true;

        // Down animations
        this.player.body.animations.add('down', [0,1,2,3,4]);
        this.player.body.animations.add('downStatic', [0]);
        this.player.head.animations.add('down', [20]);

        // Up animations
        this.player.body.animations.add('up', [5,6,7,8,9]);
        this.player.body.animations.add('upStatic', [5]);
        this.player.head.animations.add('up', [22]);
        
        // Right animations
        this.player.body.animations.add('right', [10,11,12,13,14]);
        this.player.body.animations.add('rightStatic', [10]);
        this.player.head.animations.add('right', [21]);
        
        // Left animations
        this.player.body.animations.add('left', [15,16,17,18,19]);
        this.player.body.animations.add('leftStatic', [15]);
        this.player.head.animations.add('left', [23]);
        

        this.player.body.animations.play('rightStatic', this.animationsFrames, true);
        this.player.head.animations.play('up', 1,false);
        return this.player;
    },
    killSprite: function(){
        this.player.body.kill();
        this.player.head.kill();
    }
};
var rabbit = {
    name: "rabbit",
    velocity : 1.5,
    armor : 0.5,
    animationsFrames : 12,    
    generateSprite : function( position ){
        this.player = {};
        this.player.body = game.add.sprite(position.x, position.y, this.name);    
        this.player.body.anchor.setTo(0.5, 0.5);
        this.player.body.scale.setTo(1.5, 1.5);
        game.physics.arcade.enable([this.player.body]);
        this.player.body.body.collideWorldBounds = true;        
        this.player.body.animations.add('downStatic', [0]);
        this.player.body.animations.play('downStatic', 1, false);

        return this.player;
    },
    killSprite: function(){
        this.player.body.kill();
    }
};
var snail = {
    name: "snail",
    velocity : 0.5,
    armor : 1.5,
    animationsFrames : 12,    
    generateSprite : function( position ){
        this.player = {};
        this.player.body = game.add.sprite(position.x, position.y, this.name);        
        this.player.body.anchor.setTo(0.5, 0.5);
        this.player.body.scale.setTo(1, 1);
        game.physics.arcade.enable([this.player.body]);
        this.player.body.body.collideWorldBounds = true;        
        this.player.body.animations.add('downStatic', [0]);
        this.player.body.animations.play('downStatic', 1, false);
        return this.player;
    },
    killSprite: function(){
        this.player.body.kill();
    }
};