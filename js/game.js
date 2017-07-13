(function (Phaser) {

    var game = new Phaser.Game(
            600, 400, // The width and height of the game in pixels
            Phaser.AUTO, // The type of graphic rendering to use
            // (AUTO tells Phaser to detect if WebGL is supported.
            //  If not, it will default to Canvas.)
            'phaser', // The parent element of the game
            {
                preload: preload, // The preloading function
                create: create,   // The creation function
                update: update   // The update (game-loop) function
            }
    );

    function preload() {
        // Load the spritesheet 'character.png', telling Phaser each frame is 40x64
        game.load.spritesheet('character', 'assets/images/lukeSpriteSheet.png', 32, 41);
        game.load.image('coin', "assets/images/coin.png");

        // game.load.tilemap('map', 'assets/tilemaps/maps/tatooine3.json', null, Phaser.Tilemap.TILED_JSON);
        // game.load.image('gold', 'assets/tilemaps/tiles/gold.png');
        game.load.tilemap('map', 'assets/tilemaps/maps/background_test.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('desertTile', "assets/tilemaps/tiles/desert_tile.png");
        game.load.image('bluesky', "assets/tilemaps/tiles/bluesky.png");

    }

    var player; // The player-controller sprite
    var platforms;
    var cursors;

    var coins;
    var score = 0;
    var scoreText;

    var map;
    var layer;

    function create() {

        // Start the physics system ARCADE
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Make the background color of the game's stage
        game.stage.backgroundColor = '#D3D3D3';

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        map = game.add.tilemap('map'); // 'map' needs to match the Tilemap cache-key
        map.addTilesetImage('desertTile'); // 'map' needs to match the Image cache-key
        map.addTilesetImage('bluesky');
        map.setCollisionBetween(1, 10000);
        layer = map.createLayer('GroundLayer');
        layer2 = map.createLayer('BackgroundLayer');
        layer.resizeWorld();


        // Create and add a sprite to the game at the position (2*48 x 6 *48)
        // and using, in this case, the spritesheet 'character'
        // player = game.add.sprite(2 * 48, 6 * 48, 'character');
        // The player and its settings
        player = game.add.sprite(280, 0, 'character');
        //player = game.add.sprite(7 * 64, 13 * 64, 'character');


        // By default, sprites do not have a physics 'body'
        // Before we can adjust its physics properties,
        // we need to add a 'body' by enabling
        // (As a second argument, we can specify the
        //  physics system to use too. However, since we
        //  started the Arcade system already, it will
        //  default to that.)
        game.physics.arcade.enable(player);

        // We want the player to collide with the bounds of the world
        // player.body.collideWorldBounds = true;

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;

        // Set the amount of gravity to apply to the physics body of the 'player' sprite
        player.body.gravity.y = 300;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        game.camera.follow(player);


        coins = game.add.group();

        coins.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var coin = coins.create(i * 70, 0, 'coin');

            //  Let gravity do its thing
            coin.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            coin.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

    }

    function update() {

      var cursors = game.input.keyboard.createCursorKeys();
      var hitPlatform = game.physics.arcade.collide(player, layer);

      game.physics.arcade.collide(player, layer);
      game.physics.arcade.collide(coins, layer);

      game.physics.arcade.overlap(player, coins, collectCoin, null, this);

      function collectCoin (player, coin) {

        // Removes the star from the screen
        coin.kill();

      }

      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;

      if (cursors.left.isDown)
      {
          //  Move to the left
          player.body.velocity.x = -150;

          player.animations.play('left');
      }
      else if (cursors.right.isDown)
      {
          //  Move to the right
          player.body.velocity.x = 150;

          player.animations.play('right');
      }
      else
      {
          //  Stand still
          player.animations.stop();

          player.frame = 4;
      }

      //  Allow the player to jump if they are touching the ground.
      //&& player.body.touching.down
      if (cursors.up.isDown && hitPlatform)
      {
        player.body.velocity.y = -350;

      }

      // jump left and jump right frames
      if (cursors.left.isDown && !hitPlatform) {
        player.frame = 9;
      } else if (cursors.right.isDown && !hitPlatform) {
        player.frame = 10;
      }

      // saber left and saber right (green)
      if (this.spaceKey.isDown) {
        if (cursors.left.isDown) {
          player.frame = 11;
        } else if (cursors.right.isDown) {
          player.frame = 12;
        }
      }



    }

}(Phaser));
