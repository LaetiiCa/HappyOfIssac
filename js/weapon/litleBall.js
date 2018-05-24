class litleBall extends Weapon {
    constructor ( direction , player ){
        super({
            velocity : 3,
            direction : direction,
            degat : 1,
            rotationSpeed : 8,
        })
        this.sprite = null;
        this.player = player;
    }
    onTouchEnemy(enemy) {
        enemy.damageReceived(this.damage);
        player.destroyBallShoot(this);
    }
    genearteSprite( position ) {
        this.sprite = game.add.sprite(position.x, this.direction == 'up' ? position.y-50 :position.y, 'foods');
        this.sprite.anchor.setTo(0.5,0.5);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.animations.add('ball', [0]);
        this.sprite.animations.play('ball', 1 , false);
        this.sprite.body.checkCollision = true;
        this.setDirection();
    }
}
