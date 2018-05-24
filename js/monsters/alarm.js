class Alarm extends monster {

    constructor() {
        super({
            name : 'alarm',
            damage : 0.6,
            life : 6
        })
    }
    create() {
        this.sprite = game.add.sprite(this.generateInt(game.world.width), this.generateInt(game.world.height), this.name);
        this.sprite.animations.add('up', [0]);
        this.sprite.animations.play('up', 5, true);
        this.sprite.scale.setTo(0.3,0.3);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.body.bounce.setTo(1,1);
        this.setDirection();
    }
    update() {
        if (this.isBlocked === true) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.sprite.animations.stop(null, true);

        } else {
            this.checkAttack();
        }
        for (var i in this.weapons) {
            this.weapons[i].update();
        }
    }
    endBlock() {
        this.isBlocked = false;
        this.sprite.animations.play('right', 7, true);
        this.setDirection();
    }
    setDirection() {
        if (this.sprite.body != undefined) {
            var tmpX = Math.random();
            var tmpY = Math.random();
            if (tmpX > 0.5 ) {
                this.sprite.body.velocity.x = 100;
            } else {
                this.sprite.body.velocity.x = -100;
            }
            if (tmpY > 0.5 ) {
                this.sprite.body.velocity.y = 100;
            } else {
                this.sprite.body.velocity.y = -100;
            }
        }
    }
    checkAttack(){
        if((new Date() - this.lastAttack) / 1000 > 5) {
            this.sprite.scale.setTo(0.7,0.7);
        }
        if (game.physics.arcade.collide(this.sprite, player.player.body) || game.physics.arcade.collide(this.sprite,player.player.head)) {
            player.setDamage(this.damage);
        }
        if((new Date() - this.lastAttack) / 1000 > 6.5) {
            this.sprite.scale.setTo(0.3, 0.3);
            this.lastAttack = new Date();
        }
    }
}
