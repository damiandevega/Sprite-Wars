

// EnemyJawa = function(index,game,x,y) {
//
//     this.jawa = game.add.sprite(x,y,'jawa');
//     this.jawa.anchor.setTo(0.5,0.5);
//     this.jawa.name = index.toString();
//
//     game.physics.enable(this.jawa,Phaser.Physics.ARCADE);
//     this.jawa.body.immovable = true;
//     this.jawa.body.collideWorldBounds = true;
//
//     this.jawaTween = game.add.tween(this.jawa).to({
//         y:this.jawa.y +25
//     },2000,'Linear',true,0,100,true);
// };


Game.Level1 = function() {};

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;

var drag;

// var button;
//var coin;

//var coins;
var score = 0;
var scoreText;

Game.Level1.prototype = {

    create:function(game) {


        background = this.add.tileSprite(0, 0, 600, 400, 'desertBackground');
        background.fixedToCamera = true;

        this.physics.arcade.gravity.y = 1700;

        scoreText = this.add.text(16, 15, 'Score: 0', { font: '14px Arial', fill: 'yellow' });
        scoreText.fixedToCamera = true;


        map = this.add.tilemap('map1');
        map.addTilesetImage('spritesheet_tatooine6','tatooine');
        map.addTilesetImage('spritesheet_coin','coin');


        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();


        map.setCollisionBetween(0,12);

        map.setTileIndexCallback(5,this.resetPlayer,this);


        // COINS
        coins = this.add.group();
        coins.enableBody = true;

        map.createFromObjects('Object Layer 1', 8, 'coin', 0, true, false, coins);

        coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
        coins.callAll('animations.play', 'animations', 'spin');
        coins.setAll('body.allowGravity', false);


        // PLAYER
        player = this.add.sprite(40,335,'player');
        player.anchor.setTo(0.5,0.5);

        player.animations.add('idle',[4],1,true);
        player.animations.add('jump',[10],1,true);
        player.animations.add('run',[5, 6, 7, 8],8,true);
      //  player.animations.add('slay',[14],1,false);


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

        // button = this.add.button(this.world.centerX-286, this.world.centerY - 200, 'buttons',
        //     function() {
        //     console.log('pressed');
        //     },this,2,1,0);
        //
        // button.fixedToCamera = true;


        drag = this.add.sprite(1500,336,'asteroid');
        drag.anchor.setTo(0.5,0.5);
        drag.inputEnabled = true;
        drag.input.enableDrag(true);
      //  this.physics.arcade.enable(drag);


        // new EnemyJawa(0,game,player.x+300,player.y-200);

    },

    update:function() {

        this.physics.arcade.collide(player,layer);

        // this.physics.arcade.collide(drag,layer);
        // this.physics.arcade.collide(coins, layer);

        this.physics.arcade.overlap(player, coins, collectCoin, null, this);

        function collectCoin (player, coins) {

            // Removes the star from the screen
            coins.kill();

            //  Add and update the score
            score += 10;
            scoreText.text = 'Score: ' + score;

        }



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



    resetPlayer:function() {
        player.reset(40,200);
    }





}