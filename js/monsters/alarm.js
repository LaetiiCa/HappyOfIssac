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
    }
    update() {
        console.log('update alarm');
    }
    attack() {
    }
}
