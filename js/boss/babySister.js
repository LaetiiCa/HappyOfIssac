class babySister extends boss {

    constructor() {
        super({
            name : 'babySister',
            damage : 1,
            life : 10,
            velocityArm : 2.3
        })
    }
    create() {
        this.sprite = game.add.sprite(this.generateInt(game.world.width), this.generateInt(game.world.height), this.name);
        this.sprite.animations.add('down', [1,2,1,2]);
        this.sprite.animations.add('staticDown', [0]);
        this.sprite.animations.add('up', [4,5,4,5]);
        this.sprite.animations.add('staticUp', [3]);
        this.sprite.animations.add('staticLeft', [6]);
        this.sprite.animations.add('left', [7,8,7,8]);
        this.sprite.animations.add('staticRight', [9]);
        this.sprite.animations.add('right', [10,11,10,11]);
        this.sprite.anchor.setTo(0.8, 0.8);
        this.sprite.scale.setTo(1,1);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
    }
    moveToPlayerBoss() {
        game.physics.arcade.moveToObject(this.sprite, player.player.body.body, 80);
        var tmpX = this.sprite.body.position.x - player.player.body.body.position.x;
        var tmpY = this.sprite.body.position.y - player.player.body.body.position.y;
        if (tmpX > -200 && tmpX < 200 && tmpY > -200 && tmpY < 200  ) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.sprite.animations.stop(null, true);
            this.attackPossible = true;
        }
        else {
            var tmpY = this.sprite.body.position.y - player.player.body.body.position.y;
            if (this.sprite.body.velocity.y < 0 && (tmpY > 100 || tmpY < -100)) {
                this.sprite.animations.play('up', 4, true);
            } else if (this.sprite.body.velocity.y > 0 && (tmpY > 100 || tmpY < -100)) {
                this.sprite.animations.play('down', 4, true);
            } else if (this.sprite.body.velocity.x < 0) {
                this.sprite.animations.play('left', 4, true);
            } else {
                this.sprite.animations.play('right', 4, true);
            }
            this.attackPossible = false;
        }
    }
}
