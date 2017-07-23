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

    var w = 600, h = 400;

    function preload() {
        // Load the spritesheet 'character.png', telling Phaser each frame is 40x64
        game.load.spritesheet('character', 'assets/images/spritesheet_luke.png', 32, 41);
        game.load.spritesheet('coin', "assets/images/spritesheet_coin.png", 32, 32);

        // game.load.tilemap('map', 'assets/tilemaps/maps/tatooine3.json', null, Phaser.Tilemap.TILED_JSON);
        // game.load.image('gold', 'assets/tilemaps/tiles/gold.png');
        game.load.tilemap('map', 'assets/tilemaps/maps/background_test.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('desertTile', "assets/tilemaps/tiles/desert_tile.png");
        game.load.image('bluesky', "assets/tilemaps/tiles/bluesky.png");

        game.load.image('ice', 'assets/images/block-ice.png');
        game.load.image('menu', 'assets/images/number-buttons-90x90.png', 270, 180);

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

            coin.animations.add('coin',[0,1,2,3,4,5], 15, true);

            coin.animations.play('coin');
        }

        /*
            Code from example diamond burst
        */
        game.stage.backgroundColor = '#337799';
        emitter = game.add.emitter(game.world.centerX, 100, 200);
        emitter.makeParticles('ice');
        emitter.start(false, 5000, 20);

        scoreText = game.add.text(16, 15, 'score: 0', { font: '14px Arial', fill: 'black' });
        scoreText.fixedToCamera = true;


        /*
            Code for the pause menu
        */

        // Create a label to use as a button
        pause_label = game.add.text(w - 80, 15, 'Pause', { font: '16px Arial', fill: '#fff' });
        pause_label.fixedToCamera = true;
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function () {
            // When the pause button is pressed, we pause the game
            game.paused = true;

            // Then add the menu
            menu = game.add.sprite(w/2, h/2, 'menu');
            menu.anchor.setTo(0.5, 0.5);


            // And a label to illustrate which menu item was chosen. (This is not necessary)
            choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
            choiseLabel.anchor.setTo(0.5, 0.5);

        });

        // Add a input listener that can help us return from being paused
        game.input.onDown.add(unpause, self);

        // And finally the method that handels the pause menu
        function unpause(event){
            // Only act if paused
            if(game.paused){
                // Calculate the corners of the menu
                var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                    y1 = h/2 - 180/2, y2 = h/2 + 180/2;

                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                    // The choicemap is an array that will help us see which item was clicked
                    var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                    // Get menu local coordinates for the click
                    var x = event.x - x1,
                        y = event.y - y1;

                    // Calculate the choice
                    var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                    // Display the choice
                    choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
                }
                else{
                    // Remove the menu and the label
                    menu.destroy();
                    choiseLabel.destroy();

                    // Unpause the game
                    game.paused = false;
                }
            }
        };




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

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;

        console.log(score);

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
