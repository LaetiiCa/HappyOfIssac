var game = new Phaser.Game(800, 640,Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menuStart', menuState);
game.state.add('play', playState);
game.state.start('boot');
game.killMonster = function(id){
    delete game.arrayMonster[id];
};
game.killBoss = function(id){
    delete game.arrayBoss[id];
};
game.killAll = function(){
    for(var i in  game.arrayBoss){
        game.arrayBoss[i].sprite.kill();
        game.killBoss(game.arrayBoss[i].id);
    }
    for(var i in  game.arrayMonster){
        game.arrayMonster[i].sprite.kill();
        game.killMonster(game.arrayMonster[i].id);
    }
    for ( var i = 0; i < game.AllItems.length; i++){
        if (game.AllItems[i] != null){
            game.AllItems[i].sprite.kill();            
        }
    }
    game.AllItems = [];
}
game.AllItems = [];
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};