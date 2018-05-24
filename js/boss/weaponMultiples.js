class weaponMultiples {

    constructor(player, params, parent) {
        this.velocity = params.velocity * 200;
        this.parent = parent;
        this.sprite = null;
        this.damage = params.damage;
        this.player = player;
        this.allBall = [];
        this.id = this.idGenerator();
        this.generateSprite(params.position, params);
        this.lastGenerate = new Date();
        this.params = params;
        this.countFire = 0;

    }
    generateSprite(position, params) {
        var obj = [
            {
                x : 0,
                y : -250
            },
            {
                x : 250,
                y : -250
            },
            {
                x : 250,
                y : 0
            },
            {
                x : 250,
                y : 250
            },
            {
                x : 0,
                y : 250
            },
            {
                x : -250,
                y : 250
            },
            {
                x : -250,
                y : 0
            },
            {
                x : -250,
                y : -250
            },
            {
                x : 250,
                y : 125
            },
            {
                x : 125,
                y : 250
            },
            {
                x : -125,
                y : 250
            },
            {
                x : -250,
                y : 125
            },
            {
                x : -250,
                y : -125
            },
            {
                x : -125,
                y : -250
            },
            {
                x : 125,
                y : -250
            },
            {
                x : 125,
                y : 250
            },
            {
                x : 250,
                y : -125
            }
        ];
        for ( var i = 0; i < obj.length; i++){
            var tmp = game.add.sprite(position.x + 50, position.y + 50, params.sprite);
            tmp.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable([tmp]);
            tmp.animations.add('candy', [0]);
            tmp.body.checkCollision = true;
            tmp.body.velocity.x  = obj[i].x;
            tmp.body.velocity.y = obj[i].y;
            this.allBall.push(tmp);
        }


    }
    update() {
        console.log(this.allBall.length);
        for (var i = 0 ; i < this.allBall.length ; i++){
            var sprite = this.allBall[i];
            if (player.player != undefined && (game.physics.arcade.collide(sprite, player.player.body) || game.physics.arcade.collide(sprite, player.player.head)) ){
                console.log('touché');
                this.player.setDamage(this.damage);
                sprite.destroy();
                this.parent.killWeapon(this.id);
            }
            if ( sprite.body != null ) {
                this.checkOutsideWorld(sprite);
            }
        }
        if((new Date() - this.lastGenerate) / 100 > 3 && this.countFire < 6) {
            this.lastGenerate = new Date();
            this.generateSprite(this.params.position, this.params);
            this.countFire++;
        }
    }
    idGenerator(){
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    checkOutsideWorld (sprite) {
        var outsidetheWorld = false;
        if (sprite.body.position.x >= game.world.bounds.width) {
            outsidetheWorld = true;
        }
        else if (sprite.body.position.x < 0) {
            outsidetheWorld = true;
        }

        if (sprite.body.position.y >= game.world.bounds.height) {
            outsidetheWorld = true;
        }
        else if (sprite.body.position.y < 0) {
            outsidetheWorld = true;
        }
        if (outsidetheWorld) {
            sprite.destroy();
            this.parent.killWeapon(this.id);
        }
    }
}
