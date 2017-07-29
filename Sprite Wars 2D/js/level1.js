Game.Level1 = function(game) {};

var map;
var layer;

Game.Level1.prototype = {

    create:function() {

        this.add.tileSprite(0, 0, 600, 400, 'desertBackground');

        map = this.add.tilemap('map1');
        map.addTilesetImage('tile_desert','desertTile');

        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();

    },

    update:function() {

    }
}