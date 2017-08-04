document.addEventListener("DOMContentLoaded", function(event) {

    var game = new Phaser.Game(600,400,Phaser.AUTO,'');

    game.state.add('Boot',Game.Boot);
    game.state.add('Preloader',Game.Preloader);
    game.state.add('MainMenu',Game.MainMenu);
    game.state.add('Level1',Game.Level1);


    game.state.start('Boot');

});