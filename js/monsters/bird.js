class bird {

    constructor() {
        this.name = 'bird';
        this.create();
    }
    create() {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, this.name);
        this.sprite.animations.add('up', [3,4,5,4]);
        this.sprite.animations.add('down', [0,1,2,1]);
        this.sprite.animations.add('left', [6,7,8,7]);
        this.sprite.animations.add('right', [9,10,11,10]);
        this.sprite.animations.play('right', 7, true);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(1, 1);
    }
    update() {
        console.log('update bird');
    }
    attack() {
    }

}
