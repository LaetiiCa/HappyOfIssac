class grandfather extends boss {

    constructor() {
        super({
            name : 'grandfather',
            damage : 2,
            life : 20,
        })
    }
    create() {
        //add Body
        this.sprite = game.add.sprite(this.generateInt(game.world.width), this.generateInt(game.world.height), this.name);
        this.sprite.anchor.setTo(0.5,0.5);
        this.sprite.scale.setTo(3,3);
        // Add head
        this.sprite.head = this.sprite.addChild(game.add.sprite(0, -12, this.name));
        this.sprite.head.anchor.setTo(0.5,0.5);
        this.sprite.head.scale.setTo(0.7,0.7);
        game.physics.arcade.enable([this.sprite, this.sprite.head]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(1,1);
        this.sprite.head.checkCollision = true;
        this.sprite.head.collideWorldBounds = true;
        this.sprite.head.body.bounce.setTo(1,1);

        //down animations
        this.sprite.animations.add('down', [0,1,2,3]);
        this.sprite.head.animations.add('down', [16]);
        this.sprite.animations.play('down', 5, true);
        this.sprite.head.animations.play('down');

        //up animations
        this.sprite.animations.add('up', [3,2,1,0]);
        this.sprite.head.animations.add('up', [17]);

        //right animations
        this.sprite.animations.add('right', [10,8,9]);
        this.sprite.head.animations.add('right', [18]);

        //left animations
        this.sprite.animations.add('left', [12,13,14]);
        this.sprite.head.animations.add('left', [19]);

        this.setDirection();
    }
    update() {
        this.checkAttack();
    }
    checkAttack(){
        if((new Date() - this.lastAttack) / 1000 > 5) {
            this.sprite.scale.setTo(3.8,3.8);
            this.sprite.head.scale.setTo(0.8,0.8);
            if (game.physics.arcade.collide(this.sprite, player.player.body) || game.physics.arcade.collide(this.sprite,player.player.head)) {
                player.setDamage(this.damage);
                console.log(this.damage);
            }
        }
        if((new Date() - this.lastAttack) / 1000 > 6.5) {
           this.sprite.scale.setTo(3,3);
            this.sprite.head.scale.setTo(0.7,0.7);
            this.lastAttack = new Date();
        }
    }
    setDirection() {
        var tmpX = Math.random();
        var tmpY = Math.random();
        if (tmpX > 0.5 ) {
            this.sprite.body.velocity.x = 170;
        } else {
            this.sprite.body.velocity.x = -170;
        }
        if (tmpY > 0.5 ) {
            this.sprite.body.velocity.y = 170;
        } else {
            this.sprite.body.velocity.y = -170;
        }
    }
    damageReceived(damage) {
        this.life = this.life - damage;
        if (this.life <= 0) {
            this.bossDead();
            return this.life;
        }
        this.setDirection();
        return this.life;
    }

}
