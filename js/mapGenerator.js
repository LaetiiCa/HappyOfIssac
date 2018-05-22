class map {
    constructor () {
        this.max_rooms = 10;
        this.rooms_min_size = 4;
        this.rooms_max_size = 6;
        this.map = [];
    }

    getRandom(min , max){
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    createRoom (room){
     for( var x = room.x1; x < room.x2; x+=32 ) {
        for ( var y = room.y1 ; y < room.y2; y+=32 ){
            this.map.push(new Tile(x,y , false, false , 'floor') );
        }
     }   
    }
    createHTunnel(x1, x2 , y ){
        var min = Math.min(x1,x2);
        var max = Math.max(x1,x2);
        for( var x = min; x < max + 32; x += 32) {
            this.map.push(new Tile(x,y,false,false,'floor') );
        }
    }
    createVTunnel(y1, y2 , x ){
        var min = Math.min(y1,y2);
        var max = Math.max(y1,y2);
        for( var y = min; y < max + 32; y += 32) {
            this.map.push(new Tile(x,y,false,false,'floor') );
        }
    }
    makeMap(){
        for( var y = 0; y < game.world.height; y+=16){
            for( var x = 0; x < game.world.width; x += 16 ){
                this.map.push(new Tile(x,y,true,true,'wall'));
            }
        }

        this.rooms = [];

        this.numRooms = 0;

        for( var r = 0; r <  this.max_rooms; r++ ){
            var w = this.getRandom(this.rooms_min_size , this.rooms_max_size) * 32;
            var h = this.getRandom(this.rooms_min_size , this.rooms_max_size) * 32;
            
            var x = this.getRandom(this.rooms_min_size , this.rooms_max_size) * 32;
            var y = this.getRandom(this.rooms_min_size , this.rooms_max_size) * 32;

            var newRoom = new Room(x,y,w,h);

            this.createRoom(newRoom);

            if ( this.numRooms == 0 ) {
                this.player_x = newRoom.centerCoords[0];
                this.player_y = newRoom.centerCoords[1];
            }
            else {
                this.new_x = newRoom.centerCoords[0] - 16;
                this.new_y = newRoom.centerCoords[1] - 16;

                this.prev_x = this.rooms[this.numRooms - 1].centerCoords[0] - 16;
                this.prev_y = this.rooms[this.numRooms - 1].centerCoords[1] - 16;                

                this.createHTunnel( this.prev_x, this.new_x, this.prev_y);
                this.createHTunnel( this.prev_y, this.new_y, this.prev_x);
            }

            this.rooms.push(newRoom);
            this.numRooms ++;
        }
    }
}
class Tile {
    constructor ( x ,y ,moveBlock, sightBlock, image){
        this.x = x;
        this.y = y;
        this.moveBlock = moveBlock;
        this.sightBlock = sightBlock;
        this.image = image;
        this.object;
    }
}

class Room {
    constructor (x, y, w, h) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + w;
        this.y2 = y + h;

        this.centerCoords = [];
        const centerX = (this.x1 + this.x2 ) / 2;
        const centerY = (this.y1 + this.y2 ) / 2;
        this.centerCoords.push(centerX);
        this.centerCoords.push(centerY);
    }   
}

class makeMap {
    constructor(){
        for( var y = 0; y < game.world.height; y+=16){
            for( var x = 0; x < game.world.width; x += 16 ){
                this.map
            }
        }
    }
}