Game.Preloader = function() {

    this.preloadBar = null;

};

Game.Preloader.prototype = {

    preload:function() {

        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        this.preloadBar.anchor.setTo(0.5,0.5);

        this.time.advancedTiming = true;

        this.load.setPreloadSprite(this.preloadBar);

        // LOAD ALL ASSETS

        // Load the spritesheet 'character.png', telling Phaser each frame is 40x64
        this.load.spritesheet('player', 'assets/images/spritesheet_luke.png', 32, 41);
     //   this.load.spritesheet('coin', "assets/images/spritesheet_coin.png", 32, 32);


        this.load.spritesheet('tatooine','assets/images/spritesheet_tatooine6.png',68,68);
           //tatooine_spritesheet_1.png


        this.load.tilemap('map1', 'assets/maps/tatooine.json', null, Phaser.Tilemap.TILED_JSON);
    //    this.load.image('desertTile', 'assets/images/tile_desert.png');
    //    this.load.image('desertSpikes', 'assets/images/spikes.png');
        this.load.image('desertBackground', 'assets/images/tatooine.png');

        this.load.spritesheet('buttons','assets/images/button_sprite_sheet2.png',80,40);


        this.load.image('asteroid','assets/images/asteroid.png');

        this.load.image('jawa','assets/images/JawaFront.png');

        this.load.image('titlescreen','assets/images/title-screen.png');
        this.load.image('titlebuttons','assets/images/number-buttons-90x90.png');


    },

    create:function(game) {

        this.state.start('MainMenu');
    }
}