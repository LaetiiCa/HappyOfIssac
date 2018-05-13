class nightmare {

    constructor() {
        this.name = 'nightmare';
        this.create();
    }
    create() {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, this.name);
        this.sprite.animations.add('down', [0,1,2,1]);
        this.sprite.animations.add('up', [3,4,5,4]);
        this.sprite.animations.add('left', [6,7,8,7]);
        this.sprite.animations.add('right', [9,10,11,10]);
        this.sprite.animations.play('right', 5, true);
        this.sprite.scale.setTo(1.3, 1.3);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor.setTo(0.5, 0.5);

    }
    update() {
        console.log('update nightmare');
    }
}
