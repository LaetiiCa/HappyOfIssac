class ice extends Weapon {
    constructor ( direction , player ){
        super({
            velocity : 3,
            direction : direction,
            degat : 1,
            rotationSpeed : 5,
        })
        this.sprite = null;
        this.player = player;
        this.enemyTouch = false;
        this.timeBonus = 1;
    }
    onTouchEnemy(enemy) {
        console.log('ice', enemy);
        enemy.damageReceived(this.damage);
        enemy.startBlock();
        this.enemyTouch = enemy;
        this.sprite.kill();
        this.touchTime = new Date();
        this.updateWeaponSpecial = true;
    }
    genearteSprite( position ) {
        this.sprite = game.add.sprite(position.x, this.direction == 'up' ? position.y-50 :position.y, 'foods');
        this.sprite.anchor.setTo(0.4,0.4);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.animations.add('ice', [1]);
        this.sprite.animations.play('ice', 1 , false);
        this.sprite.body.checkCollision = true;
        this.setDirection();
    }
    updateSpecial(){
        if (this.enemyTouch != false ) {
            if ( (new Date() - this.touchTime) / 1000 > this.timeBonus ){
                this.touchTime = new Date();
                this.enemyTouch.endBlock();
                this.player.destroyBallShoot(this);
            }
        }
    }
}
