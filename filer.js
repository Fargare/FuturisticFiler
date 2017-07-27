/*
 * Runstant
 * 思いたったらすぐ開発. プログラミングに革命を...
 */
 const ASSETS = {
  image: {
    bg: "FFiler_BG.png",
    // bgm:"FF.png",
  },
};
const SCREEN_WIDTH = window.parent.screen.availWidth;
const SCREEN_HEIGHT= window.parent.screen.availHeight;
console.log(SCREEN_WIDTH,SCREEN_HEIGHT);
let path = "C:/Users/kaoru/Pictures/";
let current_files = [];
// グローバルに展開
let fs = require('fs');
fs.readdir(path, function(err,files){
  if (err) throw err;
  // for (key in files){
  //   current_files[key] = files[key];
  // }
  Array.prototype.push.apply(current_files,files);
  // console.log(files);
});
// console.log("current_files");
console.log(current_files);

// ASSETS.image.push(current_files);
// ASSETS.image.concat(current_files);
// console.log(ASSETS.image);

phina.globalize();

phina.define('FileImage',{
  superClass: 'phina.display.DisplayElement',
  init: function(image, width, height) {
    this.superInit();

    this.srcRect = phina.geom.Rect();
    this.setImage(image, width, height);
  },

  draw: function(canvas) {
    var image = this.image.domElement;

    // canvas.context.drawImage(image,
    //   0, 0, image.width, image.height,
    //   -this.width*this.origin.x, -this.height*this.origin.y, this.width, this.height
    //   );

    var srcRect = this.srcRect;
    canvas.context.drawImage(image,
      srcRect.x, srcRect.y, srcRect.width, srcRect.height,
      -this._width*this.originX, -this._height*this.originY, this._width, this._height
      );
  },

  setImage: function(image, width, height) {
    if (typeof image === 'string') {
      image = phina.asset.AssetManager.get('image', image);
    }
    this._image = image;
    this._image.src = path+current_files[0];
    // console.log(this._image,image);
    this.width = this._image.domElement.width;
    this.height = this._image.domElement.height;

    this.frameIndex = 0;

    if (width) { this.width = width; }
    if (height) { this.height = height; }

    return this;
  },

  setFrameIndex: function(index, width, height) {
    var tw  = width || this._width;      // tw
    var th  = height || this._height;    // th
    var row = ~~(this.image.domElement.width / tw);
    var col = ~~(this.image.domElement.height / th);
    var maxIndex = row*col;
    index = index%maxIndex;

    var x = index%row;
    var y = ~~(index/row);
    this.srcRect.x = x*tw;
    this.srcRect.y = y*th;
    this.srcRect.width  = tw;
    this.srcRect.height = th;

    this._frameIndex = index;

    return this;
  },

  _accessor: {
    image: {
      get: function() {return this._image;},
      set: function(v) {
        this.setImage(v);
        return this;
      }
    },
    frameIndex: {
      get: function() {return this._frameIndex;},
      set: function(idx) {
        this.setFrameIndex(idx);
        return this;
      }
    },
  },
});

phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,
    });

    this.bg = Sprite("bg",SCREEN_WIDTH,SCREEN_HEIGHT).addChildTo(this);
    this.bg.origin.set(0,0);

    this.circle = CircleShape({
      x:this.gridX.center(),
      y:this.gridY.center(),
      fill:'transparent',
      stroke:'yellow',
      strokeWidth:10,
      radius:0,
    }).addChildTo(this);

    this.circle2 = CircleShape({
      x:this.gridX.center(5),
      y:this.gridY.center(),
      fill:'transparent',
      stroke:'yellow',
      radius:0,
    }).addChildTo(this);

    this.circle3 = CircleShape({
      x:this.gridX.center(-5),
      y:this.gridY.center(),
      fill:'transparent',
      stroke:'yellow',
      radius:0,
    }).addChildTo(this);

    this.label = Label({
      text:current_files,
      x:this.gridX.center(),
      y:this.gridY.center(3),
      fill:'yellow',
    }).addChildTo(this);

    this.img = new Image();
    this.img.src = path+current_files[0];
    console.log(this.img.src);
    this.space = Sprite('bg',100,100).addChildTo(this);
    const self = this;
    this.space.draw = function(canvas){
      canvas.context.drawImage(self.img,0,0);
    }
    // console.log(current_files[0]);
    // // console.log((path+current_files[0]));
    // let image1 = FileImage('bg',200,200).addChildTo(this);
    // console.log(image1);

    // canvas
    // this._dirtyDraw = true;
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

    if(this.count ==0){
      this.circle.tweener.clear()
      .to({
        radius:300,
      },200,"swing")
      .setLoop(false);
      this.count = 1;
    }
    else if (this.count==1 && !this.circle.tweener.playing) {
      this.circle2.tweener.clear()
      .to({
        radius:100,
      },200,"swing")
      .setLoop(false);
      this.circle3.tweener.clear()
      .to({
        radius:100,
      },200,"swing")
      .setLoop(false);
      this.count = 2;
      this.img.src = path + current_files[1];
    }
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
