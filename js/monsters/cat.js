class cat extends monster {

    constructor()  {
        super({
            name : 'cat',
            damage : 0.1,
            life : 6
        })
        this.inAttack = false;
    }
    create() {
        this.sprite = game.add.sprite(0, game.world.centerY, this.name);
        this.sprite.animations.add('down', [0,1,2,1]);
        this.sprite.animations.add('up', [3,4,5,4]);
        this.sprite.animations.add('left', [6,7,8,7]);
        this.sprite.animations.add('right', [9,10,11,10]);
        this.sprite.animations.play('right', 5, true);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(1.8, 1.8);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(2,2);
    }
    moveToPlayer() {
        if ( !this.inAttack ) {
            game.physics.arcade.moveToObject(this.sprite, player.player.body.body, 80);
            var tmpX = this.sprite.body.position.x - player.player.body.body.position.x;
            var tmpY = this.sprite.body.position.y - player.player.body.body.position.y;
            if (this.sprite.body.velocity.y < 0 && (tmpY > 100 || tmpY < -100)) {
                this.sprite.animations.play('up', 7, true);
            } else if (this.sprite.body.velocity.y > 0 && (tmpY > 100 || tmpY < -100)) {
                this.sprite.animations.play('down', 7, true);
            } else if (this.sprite.body.velocity.x < 0) {
                this.sprite.animations.play('left', 7, true);
            } else {
                this.sprite.animations.play('right', 7, true);
            }
        }
    }
    checkAttack() {
        if ((new Date() - this.lastAttack) / 1000 > 3) {
            if (game.physics.arcade.collide(this.sprite, player.player.body) || game.physics.arcade.collide(this.sprite,player.player.head)) {
                player.setDamage(this.damage);
                this.lastAttack = new Date();
                this.inAttack = true;
            }
        } else if ((new Date() - this.lastAttack) / 1000 > 1.5) {
                this.inAttack = false;
        }
    }
}
