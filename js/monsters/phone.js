class phone extends monster {

    constructor() {
        super({
            name : 'phone',
            damage : 0.4,
            life : 4
        });
    }
    create() {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, this.name);
        this.sprite.animations.add('up', [0]);
        this.sprite.animations.play('up', 5, true);
        this.sprite.scale.setTo(0.5,0.5);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.body.bounce.setTo(1,1);

        var tmpX = Math.random();
        var tmpY = Math.random();
        console.log(tmpX);
        if (tmpX > 0.5 ) {
            this.sprite.body.velocity.x = 150;
        } else {
            this.sprite.body.velocity.x = -150;
        }
        if (tmpY > 0.5 ) {
            this.sprite.body.velocity.y = 150;
        } else {
            this.sprite.body.velocity.y = -150;
        }
    }
    update() {
        this.checkAttack();
    }
    checkAttack(){
        if((new Date() - this.lastAttack) / 1000 > 5) {
            this.sprite.scale.setTo(0.7,0.7);
            if (game.physics.arcade.collide(this.sprite, player.player.body) || game.physics.arcade.collide(this.sprite,player.player.head)) {
                player.setDamage(this.damage);
            }
            console.log('ATTACK');
        }
        if((new Date() - this.lastAttack) / 1000 > 7) {
            this.sprite.scale.setTo(0.5, 0.5);
            this.lastAttack = new Date();
        }
    }
}
