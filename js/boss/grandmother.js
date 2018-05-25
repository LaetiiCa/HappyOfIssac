class grandmother extends boss {

    constructor() {
        super({
            name : 'grandmother',
            damage: 2,
            life : 25
        })
    }
    create() {
        this.sprite = game.add.sprite(400, 300, this.name);
        this.sprite.anchor.setTo(0.5,0.5);
        this.sprite.scale.setTo(3,3);
        game.physics.arcade.enable([this.sprite]);


        this.sprite.animations.add('static', [0]);
        this.sprite.animations.play('static');
        this.sprite.body.checkCollision = true;
    }
    update() {
        this.checkAttack();
        this.sprite.body.immovable = true;
        for(var id in this.weapons){
            this.weapons[id].update();
        }
    }
    checkAttack(){
        if((new Date() - this.lastAttack) / 1000 > 3) {
            this.lastAttack = new Date();
            this.attackMultipe();
        }
    }
    attackMultipe(){
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
        var tmp = new weaponMultiples(player, {
            damage: this.damage,
            sprite: 'foods',
            position: this.sprite.body.position,
            velocity: 1.5
        }, this,obj);
    this.weapons[tmp.id] = tmp;
    }
}
