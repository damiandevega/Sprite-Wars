Game.Preloader = function(game) {

    this.preloadBar = null;

};

Game.Preloader.prototype = {

    preload:function() {

        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        this.preloadBar.anchor.setTo(0.5,0.5);

        this.time.advancedTiming = true;

        this.load.setPreloadSprite(this.preloadBar);

        // LOAD ALL ASSETS

        this.load.spritesheet('buttons','assets/images/number-buttons-90x90.png');


        // Load the spritesheet 'character.png', telling Phaser each frame is 40x64
        this.load.spritesheet('player', 'assets/images/spritesheet_luke.png', 32, 41);
        this.load.spritesheet('coin', "assets/images/spritesheet_coin.png", 32, 32);

        this.load.tilemap('map1', 'assets/maps/tatooine.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('desertTile', 'assets/images/tile_desert.png');
        this.load.image('desertBackground', 'assets/images/tatooine.png');



    },

    create:function() {

        this.state.start('Level1');
    }
}