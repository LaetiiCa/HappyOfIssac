class Map {
    constructor () {
        this.map = [];
        this.nbCol = 3;
        this.nbLigne = 3
        this.murs = [];

        this.allRooms = [];
        this.generateAllRooms();
        this.porte = {
            up : false,
            left : false,
            right : false,
            right : false,
        }
        this.nextMap(this.allRooms[0][0]);
    }  
    generateAllRooms(){
        for( var y = 0; y < 3 ; y++){
            var linge = [];
            for( var x =0; x < 3; x++){
                linge.push(new room(x,y));
            }
            this.allRooms.push(linge);
        }
    }

    nextMap(map){
        this.actualRoom = map;
        this.murs.map( mur =>{
            mur.kill();
            mur = null;
            return mur;
        });
        this.murs = [];
        this.porte = {
            up : false,
            left : false,
            right : false,
            right : false,
        }
        this.makeMap();
        this.actualRoom.generateMonster();
    }

    makeMap(){
        var posX = -50;
        var posY = -30;
        var porte = this.actualRoom.porte;
        for(var y = 0 ; y <= 1 ; y++ ) {
            for(var x = 0 ; x < game.width; x += 50 ) {
                if ( x < (game.width / 2) - 130 || x > (game.width / 2) + 30){
                    this.murs.push(game.add.sprite(x, posY, 'nuage'));
                }
                else {
                    if( y == 0 && porte.up ){
                        this.porte.up ={
                            map : this.allRooms[this.actualRoom.y - 1][this.actualRoom.x],
                            sprite : game.add.sprite(x , posY , 'porte'),
                        };
                        game.physics.arcade.enable([this.porte.up.sprite]);
                        
                        this.porte.up.sprite.body.checkColision = true;
                        this.porte.up.sprite.body.immovable = true;
                        this.porte.up.sprite.body.setSize(120,60);
                        this.porte.up.sprite.anchor.setTo(0.6,0);
                    }
                    else if( y == 1 && porte.down ){
                        this.porte.down ={
                            map : this.allRooms[this.actualRoom.y + 1][this.actualRoom.x],
                            sprite : game.add.sprite(x , posY , 'porte'),
                        };
                        
                        game.physics.arcade.enable([this.porte.down.sprite]);
                        
                        this.porte.down.sprite.body.checkColision = true;
                        this.porte.down.sprite.body.immovable = true;
                        this.porte.down.sprite.body.setSize(120,60);
                        this.porte.down.sprite.anchor.setTo(0.6,0);
                    }
                    else{
                        this.murs.push(game.add.sprite(x, posY, 'nuage'));
                    }
                }
            }
            posY =  game.height - 50;
        }
        for(var x = 0; x <= 1 ; x++){
            for( var y = 0; y < game.height; y += 50  ) {
                if ( y < (game.height / 2) - 80 || y > (game.height / 2) + 20){
                    this.murs.push(game.add.sprite(posX, y, 'nuage'));
                }
                else {
                    if( x == 0 && porte.left ){
                        this.porte.left ={
                            map : this.allRooms[this.actualRoom.y][this.actualRoom.x -1],
                            sprite :  game.add.sprite(posX, y, 'porte'),
                        };
                        game.physics.arcade.enable([this.porte.left.sprite]);
                        
                        this.porte.left.sprite.body.checkColision = true;
                        this.porte.left.sprite.body.immovable = true;
                        this.porte.left.sprite.body.setSize(60,120);
                        this.porte.left.sprite.anchor.setTo(-0.4,0.7);
                    }
                    else if( x == 1 && porte.right ){
                        this.porte.right ={
                            map :  this.allRooms[this.actualRoom.y][this.actualRoom.x + 1],
                            sprite :  game.add.sprite(posX, y, 'porte'),
                        };
                        game.physics.arcade.enable([this.porte.right.sprite]);
                        this.porte.right.sprite.body.setSize(60,120);
                        this.porte.right.sprite.anchor.setTo(0,0.7);
                        this.porte.right.sprite.body.checkColision = true;
                        this.porte.right.sprite.body.immovable = true;
                    }
                    else{
                        this.murs.push(game.add.sprite(posX, y, 'nuage'));
                    }
                }
            }
            posX = game.width - 50;
        }
        this.murs.map( mur =>{
            game.physics.arcade.enable([mur]);
            mur.checkColision = true;
            mur.body.immovable = true;
        });
        
    }
    renderMap(){
        
    }

    update(){
        this.murs.map( mur =>{
            game.physics.arcade.collide(player.player.body,mur);
            game.physics.arcade.collide(player.player.head,mur);
        });

        if ( this.porte.right ){
            if( game.physics.arcade.collide(this.porte.right.sprite ,player.player.body) ){
                player.player.body.position = {
                    x : 100,
                    y : game.height / 2
                }
                this.nextMap(this.porte.right.map);
            }
        }
        if ( this.porte.left ){            
            if( game.physics.arcade.collide(this.porte.left.sprite ,player.player.body) ){
                player.player.body.position = {
                    x : game.width - 100,
                    y : game.height / 2
                }
                this.nextMap(this.porte.left.map);
            }
        }
        if ( this.porte.up ){
            if( game.physics.arcade.collide(this.porte.up.sprite ,player.player.body) ){
                player.player.body.position = {
                    x : game.width / 2,
                    y : game.height -100
                }
                this.nextMap(this.porte.up.map);
            }
        }
        if ( this.porte.down ){
            if( game.physics.arcade.collide(this.porte.down.sprite ,player.player.body) ){
                console.log('Hello');
                player.player.body.position = {
                    x : game.width /2,
                    y : 100
                }
                this.nextMap(this.porte.down.map);
            }
        }

    }
}

class room {
    constructor(posX , posY){
        this.x = posX;
        this.y = posY;
        this.porte = {
            up : true,
            down : true,
            left : true,
            right : true
        };
        this.monster = [ 
            cat,
            Alarm,
            bird,
            mosquito,
            nightmare,
            phone
        ];
        this.boss = [

        ]
        this.generatePort();
    }
    generatePort(){
        
        if ( this.y == 0) { 
            this.porte.up = false;
        }
        else if (this.y ==  2){
            this.porte.down = false;
        }
        if ( this.x == 0) { 
            this.porte.left = false;
        }
        else if (this.x ==  2){
            this.porte.right = false;
        }
    }
    generateInt(max){
        return Math.floor(Math.random() * max);
    }
    generateMonster(){
        var totalMonster = this.generateInt(4);
        console.log(totalMonster);  
        for(var i = 0; i < totalMonster; i++){
            var nbMonster = this.generateInt(this.monster.length);
            var tmp = new this.monster[nbMonster]();
            game.arrayMonster[tmp.id] = tmp;
        }
    }
}