var Game =  {};

Game.Boot = function(){

};

Game.Boot.prototype = {

    init:function(game) {

        this.input.maxPointers = 1;

        this.stage.disableVisibilityChange = true;
    },

    preload:function() {
        this.load.image('preloaderBar','assets/images/preloader.png');
    },

    create:function(game) {

        this.state.start('Preloader');
    }
};