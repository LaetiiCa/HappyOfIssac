class mosquito extends monster {

    constructor() {
        super({
            name : 'mosquito',
            damage : 0.4,
            life : 2
        })
        this.inAttack = false;
    }
    create() {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, this.name);
        this.sprite.animations.add('left', [0,1,2,3,2]);
        this.sprite.animations.add('right', [4,5,6,7,6]);
        this.sprite.animations.play('right', 5, true);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(0.3, 0.3);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(2,2);
    }
    moveToPlayer() {
        if ( !this.inAttack ) {
            game.physics.arcade.moveToObject(this.sprite, player.player.body.body, 95);
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
        console.log((new Date() - this.lastAttack) / 1000);
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
