/*
 * Runstant
 * 思いたったらすぐ開発. プログラミングに革命を...
 */
 const ASSETS = {
  image: {
    bg: "FFiler_BG.png",
  },
};
const SCREEN_WIDTH = window.parent.screen.availWidth;
const SCREEN_HEIGHT= window.parent.screen.availHeight;
console.log(SCREEN_WIDTH,SCREEN_HEIGHT);
let path = "C:/Users/kaoru/Pictures";
let current_files = [];
// グローバルに展開
let fs = require('fs');
fs.readdir(path, function(err,files){
  if (err) throw err;
  Array.prototype.push.apply(current_files,files);
  // console.log(files);
});
// console.log(current_files);

phina.globalize();


phina.define('BackGround',{
  superClass:'RectangleShape',
  init:function(options){
    this.superInit(options);
    // this.backgroundColor = 'transparent';
    this.circle = CircleShape({
      fill:'transparent',
      radius:200,
      stroke:"yellow",
      // alpha:0,
    }).addChildTo(this);

  },
  prerender: function(canvas) {
    canvas.beginPath();
    canvas.arc(70, 70, 60, 0, Math.PI*2-40, false);
    canvas.stroke();

  },
  update :function(canvas){
    this.circle.radius -=1;

  }

})

phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,
    });

    this.bg = Sprite("bg",SCREEN_WIDTH,SCREEN_HEIGHT).addChildTo(this);
    this.bg.origin.set(0,0);
    // // this._dirtyDraw = true;
    //
    // this.rectangle = BackGround({
    //   height:SCREEN_HEIGHT,
    //   width:SCREEN_WIDTH,
    //   x:SCREEN_WIDTH/2,
    //   y:SCREEN_HEIGHT/2,
    //   fill:'transparent',
    // }).addChildTo(this);

    this.count = 0;
    // this.circle.alpha = 0;

  },
  update:function(canvas){
    // canvas.clear();
    // this.circle._dirtyDraw = true;
    // this.circle.radius +=1;
    // if(this.count ==0){
    //   this.circle.tweener.clear()
    //   .to({
    //     alpha:1
    //   },500,"swing")
    //   .setLoop(false);
    //   this.count = 1;
    // }
  }

});

/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    startLabel: 'main', // MainScene から開始
    // backgroundColor: '#e2e2e2',
    assets:ASSETS,
    backgroundColor: 'black',
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
  });

  // app.enableStats();
  app.fps=60;
  // 実行
  app.run();
});
