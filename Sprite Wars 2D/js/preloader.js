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

        this.load.tilemap('map1', 'assets/maps/tatooine.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('desertTile', 'assets/images/tile_desert.png');
        this.load.image('desertBackground', 'assets/images/background_tatooine.png')



    },

    create:function() {

        this.state.start('Level1');
    }
}