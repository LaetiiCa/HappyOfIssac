var menuState = {
    create : function() {
        game.add.sprite(0,0,'backgroundMenu');
        game.add.text(80,80, "Issac is Happy", { font: '50px fantasy', fill :'#000099'});
        game.add.text(80,game.world.height -80, 'press ENTER to start a new game', { font: '25px fantasy', fill :'#000099'});
        game.add.text(80,game.world.height -400, 'Monsters  (m)', { font: '25px fantasy', fill :'#000099'});
        game.add.text(80,game.world.height -360, 'Boss  (b)', { font: '25px fantasy', fill :'#000099'});
        game.add.text(80,game.world.height -320, 'Levels / Stuffs  (s)', { font: '25px fantasy', fill :'#000099'});
        game.add.text(80,game.world.height -280, 'Characters (c)', { font: '25px fantasy', fill :'#000099'});
        game.add.text(80,game.world.height -240, 'Keys (k)', { font: '25px fantasy', fill :'#000099'});

        var wKey = game.input.keyboard.addKey(13);
        var mKey = game.input.keyboard.addKey(77);
        var bKey = game.input.keyboard.addKey(66);
        var lKey = game.input.keyboard.addKey(83);
        var cKey = game.input.keyboard.addKey(67);
        var kKey = game.input.keyboard.addKey(75);

        wKey.onDown.addOnce(this.startNewGame, this);
        mKey.onDown.addOnce(this.listMonster, this);
        bKey.onDown.addOnce(this.listBoss, this);
        lKey.onDown.addOnce(this.listLevels, this);
        cKey.onDown.addOnce(this.listCharacters, this);
        kKey.onDown.addOnce(this.listKeys, this);

    },
    startNewGame: function(){
        player.create({
            stuff : {
            }
        });
        game.state.start('play');
    },
    listMonster : function () {
        game.state.start('menuMonsters');
    },
    listBoss : function () {
        game.state.start('menuBoss');
    },
    listLevels : function () {
        game.state.start('menuLevels');
    },
    listCharacters : function () {
        game.state.start('menuPersos');
    },
    listKeys : function () {
        game.state.start('menuKeys');
    }

};
var menuMonsters = {
    create : function() {
        game.add.sprite(0,0,'backgroundMenu');

        var escKey = game.input.keyboard.addKey(81);
        escKey.onDown.addOnce(this.quitMenu, this);

        game.add.text(80,80, "Menu Monsters", { font: '50px fantasy', fill :'#000099'});
        game.add.text(560,game.world.height -70, 'Quit  (q)', { font: '20px fantasy', fill :'#000099'});

        this.img = game.add.sprite(60,130,'monstersMenu');
        this.img.scale.setTo(0.8,0.8);
        game.add.text(70,game.world.height -400, 'Mosquito : Attack Touch', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -350, 'Phone : Attack Zone and Touch', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -300, 'Alarm : Attack Zone and Touch', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -250, 'Nightmare : Attack Distance', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -200, 'Brid : Attack Distance', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -150, 'Cat : Attack Touch', { font: '20px fantasy', fill :'#000099'});
    },
    quitMenu : function () {
        game.state.start('menuStart')
    }
};
var menuBoss = {
    create : function() {
        game.add.sprite(0,0,'backgroundMenu');

        var escKey = game.input.keyboard.addKey(81);
        escKey.onDown.addOnce(this.quitMenu, this);

        game.add.text(80,80, "Menu Boss", { font: '50px fantasy', fill :'#000099'});
        game.add.text(560,game.world.height -70, 'Quit  (q)', { font: '20px fantasy', fill :'#000099'});

        this.img = game.add.sprite(60,130,'bossMenu');
        this.img.scale.setTo(0.8,0.8);

        game.add.text(70,game.world.height -400, 'BabySister : Attack Distance, Life : 10', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -350, 'Brother : Attack Touch, Life : 15', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -300, 'GrandFather : Attack Zone and Touch, Life : 20', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -250, 'GrandMother : Attack Distance, Life : 25', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -200, 'Mother : Attack Distance, Life : 30', { font: '20px fantasy', fill :'#000099'});
        game.add.text(70,game.world.height -150, 'Father : Attack Touch, Life : 30', { font: '20px fantasy', fill :'#000099'});

    },
    quitMenu : function () {
        game.state.start('menuStart')
    }
};
var menuLevels = {
    create: function () {
        game.add.sprite(0, 0, 'backgroundMenu');

        var escKey = game.input.keyboard.addKey(81);
        escKey.onDown.addOnce(this.quitMenu, this);

        game.add.text(80, 80, "Menu Levels / Stuffs", {font: '50px fantasy', fill: '#000099'});
        game.add.text(560, game.world.height - 70, 'Quit  (q)', {font: '20px fantasy', fill: '#000099'});

        game.add.text(70, game.world.height - 460, 'Level 1 : No stuff', {font: '20px fantasy', fill: '#000099'});
        game.add.text(70, game.world.height - 420, 'Level 2: Slippers (+0.3 velocity)', {
            font: '20px fantasy',
            fill: '#000099'
        });
        game.add.text(70, game.world.height - 380, 'Level 3 : Ice (Enemy blocked 1s),\n                Hood (+0.3 Armor)', {
            font: '20px fantasy',
            fill: '#000099'
        });
        game.add.text(70, game.world.height - 310, 'Level 4 : SportShoes (+0.6 velocity),\n                 Sprouts (2 damages +0.1/5s),\n                 Cowboy\'Hat (+0.6 Armor)', {
            font: '20px fantasy',
            fill: '#000099'
        });
        game.add.text(70, game.world.height - 200, 'Level 5 : Princess\'s Shoes (+0.9 velocity),\n                Candy (+3 damages),\n                Princess\'s Crown (+0.9 Armor)', {
            font: '20px fantasy',
            fill: '#000099'
        });
    },
    quitMenu: function () {
        game.state.start('menuStart')
    }
};
    var menuPersos = {
        create: function () {
            game.add.sprite(0,0,'backgroundMenu');


            var escKey = game.input.keyboard.addKey(81);
            escKey.onDown.addOnce(this.quitMenu, this);

            game.add.text(80, 80, "Characters", {font: '50px fantasy', fill: '#000099'});
            game.add.text(560, game.world.height - 70, 'Quit  (q)', {font: '20px fantasy', fill: '#000099'});

            this.img = game.add.sprite(60,100,'charactersMenu');
            this.img.scale.setTo(0.8,0.8);

            game.add.text(70, game.world.height - 370, 'Issac : Life : 3, Attack : Possible, Velocity : 1.5, Armor : 1', {font: '20px fantasy', fill: '#000099'});
            game.add.text(70, game.world.height - 330, 'Snail : Life : 3, Velocity : 1, Armor : 1.5', {font: '20px fantasy', fill: '#000099'});
            game.add.text(70, game.world.height - 290, 'Rabbit : Life : 3, Velocity : 2, Armor : 0.5', {font: '20px fantasy', fill: '#000099'});
        },
        quitMenu: function () {
            game.state.start('menuStart')
        }
    };
    var menuKeys = {
    create: function () {
        game.add.sprite(0,0,'backgroundMenu');


        var escKey = game.input.keyboard.addKey(81);
        escKey.onDown.addOnce(this.quitMenu, this);

        game.add.text(80, 80, "Keys", {font: '50px fantasy', fill: '#000099'});
        game.add.text(560, game.world.height - 70, 'Quit  (q)', {font: '20px fantasy', fill: '#000099'});

        game.add.text(130, game.world.height - 300, 'MOVES', {font: '20px fantasy', fill: '#000099'});
        this.img = game.add.sprite(60,180,'zqsd');
        this.img.scale.setTo(0.8,0.8);

        game.add.text(500, game.world.height - 430  , 'CHANGE CHARACTERS', {font: '20px fantasy', fill: '#000099'});
        this.img = game.add.sprite(490,40,'keysAE');
        this.img.scale.setTo(0.8,0.8);

        game.add.text(140, game.world.height - 60, 'SHOTS', {font: '20px fantasy', fill: '#000099'});
        this.img = game.add.sprite(50,400,'keysArrows');
        this.img.scale.setTo(0.8,0.8);

    },
    quitMenu: function () {
        game.state.start('menuStart')
    }
}

