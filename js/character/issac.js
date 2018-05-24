var issac = {
    name: "issac",
    velocity : 1.5,
    armor : 1,
    animationsFrames : 12,
    generateSprite : function( position, direction ){
        this.player = {};
        // Add Body
        this.player.body = game.add.sprite(position.x, position.y, this.name);
        this.player.body.anchor.setTo(0.5, 0.5);
        this.player.body.scale.setTo(1.8, 1.8);
        // Add head
        this.player.head = this.player.body.addChild(game.add.sprite(0, -13, this.name))
        this.player.head.anchor.setTo(0.5, 0.5);
        this.player.head.scale.setTo(1, 1);
        game.physics.arcade.enable([this.player.body, this.player.head]);

        this.player.body.body.collideWorldBounds = true;

        // Down animations
        this.player.body.animations.add('down', [0,1,2,3,4]);
        this.player.body.animations.add('downStatic', [0]);
        this.player.head.animations.add('down', [20]);

        // Up animations
        this.player.body.animations.add('up', [5,6,7,8,9]);
        this.player.body.animations.add('upStatic', [5]);
        this.player.head.animations.add('up', [22]);

        // Right animations
        this.player.body.animations.add('right', [10,11,12,13,14]);
        this.player.body.animations.add('rightStatic', [10]);
        this.player.head.animations.add('right', [21]);

        // Left animations
        this.player.body.animations.add('left', [15,16,17,18,19]);
        this.player.body.animations.add('leftStatic', [15]);
        this.player.head.animations.add('left', [23]);


        this.player.body.checkCollision = true;
        this.player.head.checkCollision = true;
        this.player.head.body.immovable = true;
        this.player.body.animations.play(direction + 'Static', this.animationsFrames, true);
        this.player.head.animations.play(direction, 1,false);

        return this.player;
    },
    killSprite: function(){
        this.player.body.kill();
        this.player.head.kill();
    }
};
