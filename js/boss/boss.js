class boss {
    constructor(params) {
        this.name = params.name;
        this.create();
        this.attackPossible = false;
        this.lastAttack = new Date();
        this.damage = params.damage;
        this.weapons = {};
        this.life = params.life;
        this.isBlocked = false;
        this.velocityArm = params.velocityArm ? params.velocityArm : 1;
        this.id = this.idGenerator();
    }
    update() {
        if (this.isBlocked === true) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.sprite.animations.stop(null, true);

        } else {
            this.checkAttack();
            this.moveToPlayerBoss();
        }
        for (var i in this.weapons) {
            this.weapons[i].update();
        }
    }

    attack() {
        var tmp = new weaponDistance(player, {
            damage: this.damage,
            sprite: 'foods2',
            position: this.sprite.body.position,
            velocity: 1.5
        }, this);
        this.weapons[tmp.id] = tmp;
    }

    killWeapon(id) {
        delete this.weapons[id];
    }



    checkAttack() {
        if ((new Date() - this.lastAttack) / 1000 > 1 && this.attackPossible) {
            this.lastAttack = new Date();
            this.attack();
        }
    }

    damageReceived(damage) {
        this.life = this.life - damage;
        if (this.life <= 0) {
            this.bossDead();
        }
        return this.life;
    }

    startBlock() {
        this.isBlocked = true;
    }

    endBlock() {
        this.isBlocked = false;
        this.sprite.animations.play('right', 7, true);
    }

    idGenerator(){
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    bossDead() {
        if ( this.sprite.body != undefined ) {
            var explosion = game.add.sprite(this.sprite.body.position.x, this.sprite.body.position.y, "explosion");
            explosion.anchor.setTo(0.3,0.3);
            explosion.scale.setTo(0.7, 0.7);
            // Down animations
            explosion.animations.add('down', [0, 1, 2, 3, 4]);
            explosion.animations.play('down', 30, false);
            explosion.animations.currentAnim.onComplete = {
                dispatch: () => {
                    explosion.kill();
                    this.playerFixed = false;
                }
            }
        }
        game.killBoss(this.id);
        this.sprite.destroy();
        if( Object.size(game.killBoss) == 0 ) {
            player.setLevel(player.level+ 1);        
            player.nextMap();
        }
       
    }
    generateInt(max){
        return Math.floor(Math.random() * max);
    }
}
