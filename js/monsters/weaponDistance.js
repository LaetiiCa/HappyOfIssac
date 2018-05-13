class weaponDistance extends weaponMonsters {

    constructor(player, params, parent) {
        super(player,params,parent);
        game.physics.arcade.moveToObject(this.sprite, this.player.player.body,this.velocity);

    }

    generateSprite(position, params) {
        this.sprite = game.add.sprite(position.x, position.y, params.sprite);
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable([this.sprite]);
        this.sprite.animations.add('candy', [0]);
        this.sprite.animations.play('candy', 1, false);
        this.sprite.body.checkCollision = true;
    }
}
