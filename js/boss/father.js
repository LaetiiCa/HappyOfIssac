class father extends boss {

    constructor() {
        super({
            name : 'father',
            damage : 2.5,
            life : 90
        })
    }
    create() {
        //add body
        this.sprite = game.add.sprite(this.generateInt(game.world.width), this.generateInt(game.world.height), this.name);
        this.sprite.anchor.setTo(0.5,0.5);
        this.sprite.scale.setTo(3,3);

        //add head
        this.sprite.head = this.sprite.addChild(game.add.sprite(0, -13, this.name));
        this.sprite.head.anchor.setTo(0.5,0.5);
        this.sprite.head.scale.setTo(0.6,0.6);
        game.physics.arcade.enable([this.sprite, this.sprite.head]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(1,1);
        this.sprite.head.checkCollision = true;
        this.sprite.head.collideWorldBounds = true;
        this.sprite.head.body.bounce.setTo(1,1);

        //down animations
        this.sprite.animations.add('down', [0,1,2,1]);
        this.sprite.head.animations.add('down', [25]);

        //up animations
        this.sprite.animations.add('up', [3,4,5,4]);
        this.sprite.head.animations.add('up', [26]);

        //right animations
        this.sprite.animations.add('right', [12,13,14,15,16]);
        this.sprite.head.animations.add('right', [27]);

        //left animations
        this.sprite.animations.add('left', [17,18,19,18]);
        this.sprite.head.animations.add('left', [28]);
    }
    moveToPlayerBoss() {
        if ( !this.inAttack ) {
            game.physics.arcade.moveToObject(this.sprite, player.player.body.body, 120);
            var tmpX = this.sprite.body.position.x - player.player.body.body.position.x;
            var tmpY = this.sprite.body.position.y - player.player.body.body.position.y;
            if (this.sprite.body.velocity.y < 0 && (tmpY > 100 || tmpY < -100)) {
                this.sprite.animations.play('up', 7, true);
                this.sprite.head.animations.play('up');
            } else if (this.sprite.body.velocity.y > 0 && (tmpY > 100 || tmpY < -100)) {
                this.sprite.animations.play('down', 7, true);
                this.sprite.head.animations.play('down');
            } else if (this.sprite.body.velocity.x < 0) {
                this.sprite.animations.play('left', 7, true);
                this.sprite.head.animations.play('left');
            } else {
                this.sprite.animations.play('right', 7, true);
                this.sprite.head.animations.play('right');
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
