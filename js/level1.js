
Game.Level1 = function(game) {};

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;

var button;

Game.Level1.prototype = {

    create:function() {

        background = this.add.tileSprite(0, 0, 600, 400, 'desertBackground');
        background.fixedToCamera = true;

        this.physics.arcade.gravity.y = 1400;



        map = this.add.tilemap('map1');
        map.addTilesetImage('tile_desert','desertTile');

        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();


        map.setCollisionBetween(0,2);


        player = this.add.sprite(100,0,'player');
        player.anchor.setTo(0.5,0.5);

        // new game
        // player.animations.add('idle',[0,1],1,true);
        // player.animations.add('jump',[2],1,true);
        // player.animations.add('run',[3,4,5,6,7,8],7,true);

        player.animations.add('idle',[4],1,true);
        player.animations.add('jump',[10],1,true);
        player.animations.add('run',[5, 6, 7, 8],8,true);
      //  player.animations.add('slay',[14],1,false);

        // old game
        //  Our two animations, walking left and right.
        //   player.animations.add('left', [0, 1, 2, 3], 10, true);
        //   player.animations.add('right', [5, 6, 7, 8], 10, true);


        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;


        var cursors = this.input.keyboard.createCursorKeys();


        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
            spacebar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };



    },

    update:function() {

        this.physics.arcade.collide(player,layer);

        player.body.velocity.x = 0;

        // run right
        if (controls.right.isDown) {
            player.scale.setTo(1,1);
            player.body.velocity.x += playerSpeed;
            player.animations.play('run');
        }

        // run left
        if (controls.left.isDown) {
            player.animations.play('run');
            player.scale.setTo(-1,1);
            player.body.velocity.x -= playerSpeed;
        }


        // jump
        if (controls.up.isDown && player.body.onFloor() && this.time.now > jumpTimer) {
                player.body.velocity.y = -600;
                jumpTimer = this.time.now + 750;
        }

        if (controls.left.isDown && !player.body.onFloor()) {
            player.frame = 10;
            player.animations.play('jump');
        } else if (controls.right.isDown && !player.body.onFloor()) {
            player.frame = 10;
            player.animations.play('jump');
        }


        // idle
        if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
            player.animations.play('idle');
        }





    },
}