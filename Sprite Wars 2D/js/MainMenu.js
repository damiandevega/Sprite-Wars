Game.MainMenu = function(game) {

};

    var titlescreen;


Game.MainMenu.prototype = {
  create:function(game) {

      titlescreen = game.add.sprite(game.world.centerX,game.world.centerY,'titlescreen');
      titlescreen.anchor.setTo(0.5,0.5);

      this.createButton(game,"Play",game.world.centerX,game.world.centerY + 125, 300, 100,
          function() {
              this.state.start('Level1');
          });

      // this.createButton(game,"About",game.world.centerX,game.world.centerY + 192, 300, 100,
      //     function() {
      //         console.log('About');
      //     });

  },

  update:function(game) {

  },

  createButton:function(game,string,x,y,w,h,callback) {
      var button1 = game.add.button(x,y,'titlebuttons',callback,this,2,1,0);

      button1.anchor.setTo(0.5,0.5);
      button1.width = w;
      button1.height = h;

      var txt = game.add.text(button1.x,button1.y,string,{font:"24px Arial",fill:"white",align:"center"});
      txt.anchor.setTo(0.5,0.5);
  }
};