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
        this.stuff = { arms : null , shoes : null , hat : null };
        this.allCharacter = [issac, rabbit, snail];
        this.lifeSprite = null;
        this.sprite = 0;
        this.lastFire = new Date();
        this.timeBetweenTwoShoot = 0.3;
        this.ballShoot = {};
        this.monsterKill = 0;
        this.monsterKillSprite = game.add.text(game.width - 80 ,80, this.monsterKill, { font: '30px Courier',fontWeight : 'bold', fill:'#000'});
        this.direction = 'up';
        this.setCharacter();
        this.setLevel(params.level ? params.level : 1);
        this.maxLife = 2.50 + (0.5 * this.level);
        this.setLife(params.life ? params.life : 3 , true );
        this.setAllStuff( params.stuff ? params.stuff : {} );
        //this.setLevel(params.level ? params.level : 5 );
        
        this.loadSprite();
    },
    setVelocity : function(velocity){
        this.velocity = velocity* 100;
    },
    setCharacter: function() {
        this.character = this.allCharacter[this.sprite];
    },
    setLevel : function(level) {
        console.log(level);
        this.level = level;
        var loadingLabel = game.add.text(80,150, "Level next : " + this.level, { font: '30px Courier', fill:'#fff'});
        if (game.state.current != 'load'){
            this.maxLife = 2.50 + (0.5 * this.level);
            this.setLife(this.life + 1 , false);
        }
        switch (this.level) {
            case 2 :
                this.setShoes(slipper);
                break;
            case 3 :
                this.setArms('ice');
                this.setHat(hood);
                break;
            case 4 : 
                this.setShoes(sportsShoes);
                this.setArms('sprout');
                this.setHat(hatCowBoy);
                break;
            case 5 : 
                this.setShoes(princessShoes);
                this.setArms('candy');
                this.setHat(princessCrown);
                break;
            
        }
        setTimeout(function(){
            loadingLabel.kill();
        },5000);
    },
    setArmor: function(armor){
        this.armor = armor;
    },
    setLife: function(life, first){
        if ( first ){
            life = this.maxLife;
        }
        this.life = life;
        if (game.state.current != 'load'){
            this.drawAll();
        }
        if ( this.life <= 0 ){
            this.playerIdDead();
        }
    },
    playerIdDead: function (){
        var textDead = game.add.text(game.world.centerX, 100, "You are wake ...", { font: '70px Arial', fill :'#000'});
        textDead.anchor.setTo(0.5,0.5);
        var imDead = game.add.sprite(game.world.centerX, game.world.centerY, 'issac');
        imDead.anchor.setTo(0.5,0.5);
        imDead.scale.setTo(2,2);
        imDead.animations.add('dead', [24]);
        imDead.animations.play('dead',1,false);

        for ( var i in this.ballShoot ){
            this.destroyBallShoot(this.ballShoot[i]);
        }
        for ( var i in this.allCharacter){
            if ( this.allCharacter[i].player != undefined ){
                    this.allCharacter[i].killSprite();
            }
        }
        game.killAll();
        this.player = undefined;

        game.add.text(80,game.world.height -80, 'press w to menu', { font: '25px Arial', fill :'#000'});

        var wKey = game.input.keyboard.addKey(87);

        wKey.onDown.addOnce(this.goToMenu, this);
    },
    goToMenu : function(){
        game.state.start('menuStart');
    },
    setAllStuff: function( stuff ){
        console.log(stuff);
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
    /** Viewing element */
    drawLife : function(){
        if (this.lifeSprite != null){
            //this.lifeSprite.callAll('kill');
            for( var i = 0; i < this.lifeSprite.children.length ; i++){
                this.lifeSprite.children[i].kill();
            }
            this.lifeSprite.children = [];
        }
        this.lifeSprite =  game.add.group();
        var tmpCountLife = this.life + 1;
        for ( var i = 0 ; i < this.maxLife ; i++){
            tmpCountLife -= 1;
            var tmp = game.add.sprite((i * 60) + 10 ,10, 'life');
            tmp.scale.setTo(0.3, 0.3);
            tmp.animations.add('100', [0]);
            tmp.animations.add('75', [1]);
            tmp.animations.add('50', [2]);
            tmp.animations.add('25', [3]);
            tmp.animations.add('00', [4]);
            if ( tmpCountLife >= 1 ){
                tmp.animations.play('100', 1 , false);
            }
            else {
                if ( tmpCountLife >= 0.75 ){
                    tmp.animations.play('75', 1 , false);
                }
                else if ( tmpCountLife >= 0.50 ){
                    tmp.animations.play('50', 1 , false);
                }
                else if ( tmpCountLife >= 0.1){
                    tmp.animations.play('25', 1 , false);
                }
                else {
                    tmp.animations.play('00', 1 , false);
                }
            }

            this.lifeSprite.add(tmp);
        }
        this.lifeSprite.fixedToCamera = true;
    },
    drawChara: function(){

    },
    drawStuff: function(){

    },
    drawAll : function(){
        this.drawLife();
    },
    /** Gestion de la boucle */
    getVelocity: function(){
      return this.velocity + ( this.stuff.shoes.velocity * 100 );
    },
    getArmor: function(){
        return this.armor + this.stuff.hat.armor;
    },
    update : function() {
        game.world.bringToTop(this.lifeSprite);
        this.checkMouv();
        this.checkFire();
        for ( i in this.ballShoot){
            this.ballShoot[i].update();
        }
        if ( this.map != undefined ){
            this.map.update();            
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
                this.player.body.body.velocity.x = 0;

            }
            else if ( this.mouv.down ){
                this.direction = 'down';
                allIsUp = false;
                this.player.body.body.velocity.y =  this.getVelocity();
                this.player.body.animations.play('down', this.character.animationsFrames, true);
                this.player.body.body.velocity.x = 0;

            }
            else if ( this.mouv.left ){
                this.direction = 'left';
                allIsUp = false;
                this.player.body.body.velocity.x = -1 * this.getVelocity();
                this.player.body.animations.play('left', this.character.animationsFrames, true);
                this.player.body.body.velocity.y = 0;
            }
            else if ( this.mouv.right ){
                this.direction = 'right';
                allIsUp = false;
                this.player.body.body.velocity.x = this.getVelocity();
                this.player.body.animations.play('right', this.character.animationsFrames, true);
                this.player.body.body.velocity.y = 0;
            }
            else {
                this.player.body.body.velocity.x = 0;
                this.player.body.body.velocity.y = 0;

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
        var isFirst = false;
        if ( this.player == undefined ){
            var position = {x : 100, y : 100};
            isFirst = true;
        }
        else {
            var position = this.getPosition();
        }
        this.player = this.character.generateSprite(position, this.direction);
      
      //  game.camera.follow(this.player.body);
        if ( isFirst ) {
            this.map = new Map();      
        }
        this.setArmor(this.character.armor);
        this.setVelocity(this.character.velocity);
    },
    nextMap(){
        this.map.killMap();
        this.map = new Map();
    },
    goToMap: function(map){
        console.log(game.width);
        game.camera.position = {
            x : map.position.x + 10 ,
            y : map.position.y +10,
        };
    },
    generateExplosion: function(){
        this.playerFixed = true;
        var position = this.getPosition();
        var explosion = game.add.sprite(position.x, position.y, "explosion_blue");
        explosion.anchor.setTo(0.5, 0.5);
        explosion.scale.setTo(1, 1);
        game.physics.arcade.enable([explosion]);

        //explosion.body.collideWorldBounds = true;

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
            if ( e.key.toLowerCase() == that.defaultInput.up ){
                that.mouv.up = true;
            }
            if ( e.key.toLowerCase() == that.defaultInput.down ){
                that.mouv.down = true;
            }
            if ( e.key.toLowerCase() == that.defaultInput.left ){
                that.mouv.left = true;
            }
            if ( e.key.toLowerCase() == that.defaultInput.right ){
                that.mouv.right = true;
            }

            if ( e.key.toLowerCase() === that.defaultInput.next ){
                that.character.killSprite()
                that.nextCharacter();
                that.generateSprite();
            }
            else if ( e.key.toLowerCase() === that.defaultInput.prev ) {
                that.character.killSprite()
                that.prevCharacter();
                that.generateSprite();
            }
        }

        game.input.keyboard.onUpCallback = function(e){
            if ( e.key.toLowerCase() == that.defaultInput.up ){
                that.mouv.up = false;
            }
            if ( e.key.toLowerCase() == that.defaultInput.down ){
                that.mouv.down = false;
            }
            if ( e.key.toLowerCase() == that.defaultInput.left ){
                that.mouv.left = false;
            }
            if ( e.key.toLowerCase() == that.defaultInput.right ){
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
        ball.sprite.animations.stop(null,true);
        ball.sprite.kill();
        delete this.ballShoot[ball.id];
    },
    setDamage: function ( damage ) {
        this.setLife( this.life - ( damage / this.getArmor() ) )
    }
    /** End gestion des combats */
}
