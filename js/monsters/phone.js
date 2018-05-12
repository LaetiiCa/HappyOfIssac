class phone {

    constructor() {
        this.name = 'phone';
        this.create();
    }
    create() {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, this.name);
        this.sprite.animations.add('up', [0]);
        this.sprite.animations.play('up', 5, true);
        this.sprite.scale.setTo(0.4,0.4);
    }
    update() {
        console.log('update phone');
    }
    attack() {
    }
}
