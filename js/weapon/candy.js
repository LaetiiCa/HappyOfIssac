class candy extends Weapon {
    constructor ( direction , player ){
        super({
            velocity : 1.5,
            direction : direction,
            degat : 2,
            rotationSpeed : 4,
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
        this.sprite.scale.setTo(0.8,0.8);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.animations.add('candy', [3]);
        this.sprite.animations.play('candy', 1 , false);
        this.sprite.body.checkCollision = true;
        this.setDirection();
    }
}
