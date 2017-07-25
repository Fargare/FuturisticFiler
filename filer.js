/*
 * Runstant
 * 思いたったらすぐ開発. プログラミングに革命を...
 */
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
//
// phina.define('Clock', {
//   superClass: 'phina.display.Shape',
//
//   init: function(options) {
//     options = ({}).$safe(options, {
//       backgroundColor: 'transparent',
//       fill: 'white',
//       stroke: 'black',
//       strokeWidth: 8,
//       radius: 256,
//       colorList: [
//         'hsl(0, 80%, 60%)',
//         'hsl(230, 100%, 50%)',
//         'hsl(50, 100%, 60%)',
//         'hsl(200, 80%, 60%)',
//       ],
//     });
//     this.superInit(options);
//     this.setBoundingType('circle');
//
//     this.colorList = options.colorList;
//   },
//
//   update: function() {
//     // this._dirtyDraw = true;
//   },
//   //
//   postrender: function(canvas) {
//     this._renderFrame();
//   //   this._renderNumber();
//   //   this._renderClockHand();
//   },
//
//   _renderFrame: function() {
//     var radius = this.radius;
//     var canvas = this.canvas;
//     canvas.shadowBlur = 8;
//     canvas.shadowColor = '#aaa';
//     canvas.fillCircle(0, 0, this.radius);
//     canvas.restore();
//
//     canvas.save();
//     var grad = canvas.context.createRadialGradient(-this.radius*0.5, -this.radius*0.5, 0, 0, 0, this.radius);
//     grad.addColorStop(0, "rgba(255, 255, 255, 0.05)");
//     grad.addColorStop(0.7, "rgba(255, 255, 255, 0.05)");
//     grad.addColorStop(1, "rgba(120, 120, 120, 0.05)");
//     canvas.fillStyle = grad;
//     canvas.fillCircle(0, 0, this.radius);
//     canvas.restore();
//   },

  // _renderNumber: function() {
  //   var canvas = this.canvas;
  //   var radius = this.radius;
  //   var colorList = this.colorList;
  //
  //   (12).times(function(i) {
  //     var index = i+1;
  //     var rad = (360/12 * index - 90).toRadian();
  //     var x = Math.cos(rad) * this.radius*0.8;
  //     var y = Math.sin(rad) * this.radius*0.8;
  //
  //     canvas.save();
  //     canvas.textAlign = 'center';
  //     canvas.textBaseline = 'middle';
  //     canvas.font = "{0}px 'HiraKakuProN-W3'".format(radius*0.2);
  //     canvas.fillStyle = colorList.at(i);
  //     canvas.shadowBlur = 4;
  //     canvas.shadowColor = '#888';
  //     canvas.shadowOffsetX = 2;
  //     canvas.shadowOffsetY = 2;
  //     canvas.context.fillText(index, x, y);
  //     canvas.restore();
  //   }, this);
  // },
  //
  // _renderClockHand: function() {
  //   var canvas = this.canvas;
  //   var date = new Date();
  //   var radius = this.radius;
  //
  //   var drawClockHand = function(len, angle) {
  //     var width = (radius-len)*0.1;
  //     canvas.save();
  //     canvas.shadowBlur = 4;
  //     canvas.shadowColor = '#888';
  //     canvas.shadowOffsetX = 1;
  //     canvas.shadowOffsetY = 1;
  //     canvas.fillStyle = 'silver';
  //     canvas.rotate((angle+180).toRadian());
  //     canvas.fillLines(width/2, 0, -width/2, 0, 0, len);
  //     canvas.restore();
  //   };
  //
  //   var hourAngle = (date.getHours()+date.getMinutes()/60) * 30;
  //   drawClockHand(radius*0.5, hourAngle);
  //   var minutesAngle = date.getMinutes() * 6;
  //   drawClockHand(radius*0.7, minutesAngle);
  //   // 秒針
  //   var angle = (date.getSeconds() + date.getMilliseconds()/1000) * 6;
  //   drawClockHand(radius*0.9, angle);
  //
  //   canvas.shadowBlur = 4;
  //   canvas.shadowColor = '#888';
  //   canvas.shadowOffsetX = 1;
  //   canvas.shadowOffsetY = 1;
  //   canvas.fillStyle = 'silver';
  //   canvas.fillCircle(0, 0, radius*0.05);
  // },
// });

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
    this._dirtyDraw = true;
    //
    // const clock =  Clock({
    //   x: 320,
    //   y: 480,
    //   radius: 256,
    //   colorList: (12).map(function(i) {
    //     return 'hsl({0}, 80%, 50%)'.format(360/12*i);
    //   }),
    // });
    // clock.addChildTo(this);
    this.rectangle = BackGround({
      height:SCREEN_HEIGHT,
      width:SCREEN_WIDTH,
      x:SCREEN_WIDTH/2,
      y:SCREEN_HEIGHT/2,
      fill:'transparent',
    }).addChildTo(this);

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
    backgroundColor: 'transparent',
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
  });

  // app.enableStats();
  app.fps=60;
  // 実行
  app.run();
});


// // phina.js をグローバル領域に展開
// phina.globalize();
//
// // MainScene クラスを定義
// phina.define('MainScene', {
//   superClass: 'CanvasScene',
//   init: function() {
//     this.superInit();
//     // 背景色を指定
//     this.backgroundColor = '#444';
//     // ラベルを生成
//     this.label = Label('Hello, phina.js!').addChildTo(this);
//     this.label.x = this.gridX.center(); // x 座標
//     this.label.y = this.gridY.center(); // y 座標
//     this.label.fill = 'white'; // 塗りつぶし色
//   },
// });
//
// // メイン処理
// phina.main(function() {
//   // アプリケーション生成
//   var app = GameApp({
//     startLabel: 'main', // メインシーンから開始する
//   });
//   // アプリケーション実行
//   app.run();
// });
