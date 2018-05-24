class sprout extends Weapon {
    constructor ( direction , player ){
        super({
            velocity : 3,
            direction : direction,
            degat : 1,
            rotationSpeed : 7,
        })
        this.sprite = null;
        this.player = player;
        this.enemyTouch = false;
        this.timeBonus = 5;
    }
    onTouchEnemy(enemy) {
        this.enemyTouch = enemy;
        this.sprite.kill();
        this.touchTime = new Date();
        this.updateWeaponSpecial = true;
    }
    genearteSprite( position ) {
        this.sprite = game.add.sprite(position.x, this.direction == 'up' ? position.y-50 :position.y, 'foods');
        this.sprite.anchor.setTo(0.5,0.5);
        this.sprite.scale.setTo(0.8,0.8);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.animations.add('sprout', [2]);
        this.sprite.animations.play('sprout', 1 , false);
        this.sprite.body.checkCollision = true;
        this.setDirection();
    }
    updateSpecial(){
        if (this.enemyTouch != false ) {
            if ( (new Date() - this.touchTime) / 1000 > this.timeBonus ){
                this.touchTime = new Date();
                 if( this.enemyTouch.damageReceived(0.1) < 0 ) {
                     this.player.destroyBallShoot(this);
                 }
            }
        }
    }
}
