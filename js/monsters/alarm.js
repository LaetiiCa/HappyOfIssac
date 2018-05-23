class Alarm {

    constructor() {
        this.name = 'alarm';
        this.create();
    }
    create() {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, this.name);
        this.sprite.animations.add('up', [0]);
        this.sprite.animations.play('up', 5, true);
        this.sprite.scale.setTo(0.3,0.3);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.body.bounce.setTo(1,1);
        /*var tmpX = Math.random();
        var tmpY = Math.random();
        console.log(tmpX);
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
        console.log(this.sprite.body.velocity);*/
        console.log(player.sprite);
        game.physics.arcade.moveToObject(this.sprite, player.player.body.body,80);

    }
    update() {
        var tmpX = this.sprite.body.position.x  - player.player.body.body.position.x;
        var tmpY = this.sprite.body.position.y  - player.player.body.body.position.y;
        if ( tmpX > -80 && tmpX < 80 && tmpY > -80 && tmpY < 80){
            this.sprite.body.velocity.x= 0;
            this.sprite.body.velocity.y= 0;
        }
    }
    attack() {
    }
}
