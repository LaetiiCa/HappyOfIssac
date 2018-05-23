var game = new Phaser.Game(800, 640,Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menuStart', menuState);
game.state.add('play', playState);
game.state.start('boot');
game.killMonster = function(id){
    delete game.arrayMonster[id];
};

