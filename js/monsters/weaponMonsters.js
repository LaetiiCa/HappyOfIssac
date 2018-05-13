class weaponMonsters {

    constructor(player, params, parent) {
        this.velocity = params.velocity * 150;
        this.parent = parent;
        this.sprite = null;
        this.damage = params.damage;
        this.player = player;
        this.id = this.idGenerator();
        this.generateSprite(params.position, params);
    }
    update() {
        if (game.physics.arcade.collide(this.sprite, this.player.player.body) || game.physics.arcade.collide(this.sprite, this.player.player.head)) {
            this.player.setDamage(this.damage);
            this.sprite.destroy();
            this.parent.killWeapon(this.id);
        }
        if ( this.sprite.body != null ) {
            this.checkOutsideWorld();
        }
    }
    idGenerator(){
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    checkOutsideWorld () {
        var outsidetheWorld = false;
        if (this.sprite.body.position.x >= game.world.bounds.width) {
            outsidetheWorld = true;
        }
        else if (this.sprite.body.position.x < 0) {
            outsidetheWorld = true;
        }

        if (this.sprite.body.position.y >= game.world.bounds.height) {
            outsidetheWorld = true;
        }
        else if (this.sprite.body.position.y < 0) {
            outsidetheWorld = true;
        }
        if (outsidetheWorld) {
            this.sprite.destroy();
            this.parent.killWeapon(this.id);
        }
    }
}
