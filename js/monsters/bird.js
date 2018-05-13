class bird {

    constructor() {
        this.name = 'bird';
        this.create();
        this.attackPossible = false;
        this.lastAttack = new Date();
        this.damage = 1;
        this.weapons = {};
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
        game.physics.arcade.enable([this.sprite]);
        this.sprite.body.checkCollision = true;
        this.sprite.body.collideWorldBounds = true;
    }
    update() {
        this.moveToPlayer();
        this.checkAttack();
        for (var i in this.weapons) {
            this.weapons[i].update();
        }
    }
    attack() {
        var tmp = new weaponDistance(player, { damage : this.damage, sprite: 'foods', position: this.sprite.body.position, velocity: 1}, this);
        this.weapons[tmp.id] = tmp;
    }
    killWeapon(id) {
        delete this.weapons[id];
    }
    moveToPlayer() {
        game.physics.arcade.moveToObject(this.sprite, player.player.body.body,80);
        var tmpX = this.sprite.body.position.x  - player.player.body.body.position.x;
        var tmpY = this.sprite.body.position.y  - player.player.body.body.position.y;
        if ( tmpX > -80 && tmpX < 80 && tmpY > -80 && tmpY < 80){
            this.sprite.body.velocity.x= 0;
            this.sprite.body.velocity.y= 0;
            this.attackPossible = true;
        }
        else {
            this.attackPossible = false;
        }
    }
    checkAttack() {
        if ((new Date() - this.lastAttack) / 1000 > 1 && this.attackPossible) {
            console.log('attack');
            this.lastAttack = new Date();
            this.attack();
        }
    }
    damageReceived(damage) {

        console.log(damage);
    }

}
