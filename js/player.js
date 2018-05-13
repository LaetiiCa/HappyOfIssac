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
        this.direction = 'up';
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
        console.log(this.life);
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
        game.load.atlas('issac', './assets/sprites/issac/issac.png', './assets/sprites/issac/issac.json');
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
        if ( !this.playerFixed ) {
            var allIsUp = true;
            if ( this.mouv.up ){
                this.direction = 'up';
                allIsUp = false;
                this.player.body.body.velocity.y = -1 * this.getVelocity();
                this.player.body.animations.play('up', this.character.animationsFrames, true);
            }
            else if ( this.mouv.down ){
                this.direction = 'down';
                allIsUp = false;
                this.player.body.body.velocity.y =  this.getVelocity();
                this.player.body.animations.play('down', this.character.animationsFrames, true);
            }
            else {
                this.player.body.body.velocity.y = 0;
            }

            if ( this.mouv.left ){
                this.direction = 'left';
                allIsUp = false;
                this.player.body.body.velocity.x = -1 * this.getVelocity();
                this.player.body.animations.play('left', this.character.animationsFrames, true);
            }
            else if ( this.mouv.right ){
                this.direction = 'right';
                allIsUp = false;
                this.player.body.body.velocity.x = this.getVelocity();
                this.player.body.animations.play('right', this.character.animationsFrames, true);
            }
            else {
                this.player.body.body.velocity.x = 0;
            }

            if ( allIsUp ) {
                this.player.body.animations.play(this.direction + 'Static', this.character.animationsFrames, false);
            }
        }
        else {
            this.player.body.body.velocity.x = 0;
            this.player.body.body.velocity.y = 0;
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
        this.generateExplosion();
        this.setCharacter();
    },
    prevCharacter: function() {
        this.sprite--;
        if ( this.sprite < 0 ){
            this.sprite = this.allCharacter.length - 1;
        }
        this.generateExplosion();
        this.setCharacter();
    },
    generateSprite: function(){
        if ( this.player == undefined ){
            var position = {x : game.world.centerX, y : game.world.centerY};
        }
        else {
            var position = this.getPosition();
        }
        this.player = this.character.generateSprite(position, this.direction);
        this.setArmor(this.character.armor);
        this.setVelocity(this.character.velocity);
    },
    generateExplosion: function(){
        this.playerFixed = true;
        var position = this.getPosition();
        var explosion = game.add.sprite(position.x, position.y, "explosion_blue");
        explosion.anchor.setTo(0.5, 0.5);
        explosion.scale.setTo(1, 1);
        game.physics.arcade.enable([explosion]);

        explosion.body.collideWorldBounds = true;

        // Down animations
        explosion.animations.add('down', [0,1,2,3,4]);
        explosion.animations.play('down', 20, false);
        explosion.animations.currentAnim.onComplete = {
            dispatch : () => {
                explosion.kill();
                this.playerFixed = false;
                delete explosion;
            }
        }
    },
    /** End Gestion des different character */
    attachKey : function(){
        var that = this;
        game.input.keyboard.onDownCallback = function(e){
            if ( e.key == that.defaultInput.up ){
                that.mouv.up = true;
            }
            if ( e.key == that.defaultInput.down ){
                that.mouv.down = true;
            }
            if ( e.key == that.defaultInput.left ){
                that.mouv.left = true;
            }
            if ( e.key == that.defaultInput.right ){
                that.mouv.right = true;
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
            }
            if ( e.key == that.defaultInput.down ){
                that.mouv.down = false;
            }
            if ( e.key == that.defaultInput.left ){
                that.mouv.left = false;
            }
            if ( e.key == that.defaultInput.right ){
                that.mouv.right = false;
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
