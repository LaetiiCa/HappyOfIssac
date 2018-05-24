var game = new Phaser.Game(800, 640 ,Phaser.AUTO, 'gameDiv');

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
    for(var i = 0 ; i < game.arrayBoss.length;i++){
        game.arrayBoss[i].sprite.kill();
        game.killBoss(game.arrayBoss[i].id);
    }
    for(var i = 0 ; i < game.arrayMonster.length;i++){
        game.arrayMonster[i].sprite.kill();

        game.killMonster(game.arrayMonster[i].id);
    }
}
