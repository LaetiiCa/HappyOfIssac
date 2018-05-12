class Weapon {
    constructor( params ){
        this.velocity = params.velocity * 150;
        this.direction = params.direction;
        this.rotationSpeed = params.rotationSpeed;
        this.id = this.idGenerator();
        this.updateWeaponSpecial = false;
    }
    update(){
        if ( this.sprite != null ) {
            this.checkCollisionMonster();
            this.checkOutsideWorld();
            this.sprite.angle += this.rotationSpeed;
            if ( this.updateWeaponSpecial ){
                this.updateSpecial();
            }
        }
    }
    checkCollisionMonster(){
        for ( var i = 0; i < game.arrayMonster.length; i++){
            game.physics.arcade.collide(this.sprite, game.arrayMonster[i].sprite , this.onTouchEnemy(game.arrayMonster[i]));
        }
    }
    checkOutsideWorld (){
        var outsidetheWorld = false;
        if ( this.sprite.body.position.x >= game.world.bounds.width ) {
            outsidetheWorld = true;
        }
        else if ( this.sprite.body.position.x < 0 ){
            outsidetheWorld = true;
        }

        if ( this.sprite.body.position.y >= game.world.bounds.height ) {
            outsidetheWorld = true;
        }
        else if ( this.sprite.body.position.y < 0 ){
            outsidetheWorld = true;
        }
        if ( outsidetheWorld ){
            this.player.destroyBallShoot(this);                
        }
    }
    onTouchEnemy(enemy){
        console.log('Weapon', enemy);
    }
    idGenerator(){
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    setDirection(){
        if ( this.direction == 'up' ) {
            this.sprite.body.velocity.y = -1 * this.velocity;                
        }
        else if ( this.direction == 'down' ){
            this.sprite.body.velocity.y = this.velocity;                
        }
        else if ( this.direction == 'left' ) {
            this.sprite.body.velocity.x = -1 * this.velocity;
        }
        else if ( this.direction == 'right' ){
            this.sprite.body.velocity.x = this.velocity;                
        }
    }
}