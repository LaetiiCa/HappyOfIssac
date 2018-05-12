class mosquito {

    constructor() {
        this.name = 'mosquito';
        this.create();
    }
    create() {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, this.name);
        this.sprite.animations.add('left', [0,1,2,3,2]);
        this.sprite.animations.add('right', [4,5,6,7,6]);
        this.sprite.animations.play('right', 5, true);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(0.3, 0.3);
    }
    update() {
        //console.log('update mosquito');
    }
    attack() {
    }
}
