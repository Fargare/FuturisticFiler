/*
 * Runstant
 * 思いたったらすぐ開発. プログラミングに革命を...
 */
 const ASSETS = {
  image: {
    bg: "FFiler_BG.png",
    folder:"Folder.png",
    // bgm:"FF.png",
  },
};
const SCREEN_WIDTH = window.parent.screen.availWidth;
const SCREEN_HEIGHT= window.parent.screen.availHeight;
console.log(SCREEN_WIDTH,SCREEN_HEIGHT);

let image_size = 400;

let current_path = ['C:/Users','kaoru','Pictures'];

let path = '';
let current_files = [];
let current_num = 0;
let fs = require('fs');

readDirectory();

phina.globalize();

phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,
    });

    this.bg = Sprite("bg",SCREEN_WIDTH,SCREEN_HEIGHT).addChildTo(this);
    this.bg.origin.set(0,0);

    // this.circle = CircleShape({
    //   x:this.gridX.center(),
    //   y:this.gridY.center(),
    //   fill:'transparent',
    //   stroke:'white',
    //   strokeWidth:10,
    //   radius:0,
    // }).addChildTo(this);
    //
    // this.circle2 = CircleShape({
    //   x:this.gridX.center(5),
    //   y:this.gridY.center(),
    //   fill:'transparent',
    //   stroke:'white',
    //   radius:0,
    // }).addChildTo(this);
    //
    // this.circle3 = CircleShape({
    //   x:this.gridX.center(-5),
    //   y:this.gridY.center(),
    //   fill:'transparent',
    //   stroke:'white',
    //   radius:0,
    // }).addChildTo(this);

    this.label = Label({
      text:path,
      x:this.gridX.center(),
      y:this.gridY.center(3),
      fill:'white',
      fontFamily:'Century Gothic',
      fontSize:50,
    }).addChildTo(this);

    this.img = new Image();

    // this.img.src = path+current_files[current_num];
    // console.log(this.img.src);
    this.space = Sprite('bg',image_size,image_size).addChildTo(this);
    this.folder = Label({
      text :"",
      x:this.space.width/2,
      y:this.space.height/2,
      fill:'white',
      fontFamily:'Century Gothic',
      fontSize:50,
    }).addChildTo(this.space);
    this.filename = Label({
      text :"test",
      x:this.space.width/2,
      y:this.space.height + 20,
      fill:'white',
      fontFamily:'Century Gothic',
      fontSize:30,
    }).addChildTo(this.space);

    readPicture(this);

    const self = this;
    this.space.draw = function(canvas){
      let width = image_size;
      let height = image_size;
      if (self.img.width>self.img.height){
        height = image_size * (self.img.height/self.img.width);
      }
      else{
        width = image_size * (self.img.width/self.img.height);
      }
      canvas.context.drawImage(self.img,image_size/2-width/2,image_size/2-height/2,width,height);
    }
    this.count = 2;

  },
  update:function(app){
    const self = this;
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
    }
    const key = app.keyboard;
    if (!this.space.tweener.playing){//キーボード入力はじめ
      if (key.getKey('left')){
        this.space.tweener.clear()
        .to({
          alpha:0,
        },100)
        .call(function(){
          current_num = (current_num+current_files.length-1)%current_files.length;
          readPicture(self);
        })
        .to({
          alpha:1,
        },100)
        .setLoop(false);
      };
      if (key.getKey('right')){
        this.space.tweener.clear()
        .to({
          alpha:0,
        },100)
        .call(function(){
          current_num = (current_num+1)%current_files.length;
          readPicture(self);
        })
        .to({
          alpha:1,
        },100)
        .setLoop(false);
      };
      if (key.getKey('up')){
        current_path.pop();
        readDirectory();
        this.space.tweener.clear()
        .to({
          alpha:0,
        },100)
        .call(function(){
          current_num = 0;
          readPicture(self);
          self.label.text = path;
        })
        .to({
          alpha:1,
        },100)
        .setLoop(false);
      };
      if (key.getKey('down')){
        // console.log(current_files[current_num].match(/\./));
        if(!/\./.test(current_files[current_num])){
          // console.log("Folder!!!");
          current_path.push(current_files[current_num]);
          readDirectory();
          this.space.tweener.clear()
          .to({
            alpha:0,
          },100)
          .call(function(){
            current_num = 0;
            readPicture(self);
            self.label.text = path;
          })
          .to({
            alpha:1,
          },100)
          .setLoop(false);
        }
      };
    };//キーボード入力終わり
  },

});
function readPicture(self){
  if(!/jpg|JPG|PNG|png/.test(current_files[current_num])){
    self.img.src = "folder.png";
    self.folder.text = current_files[current_num];
    self.filename.text = '';
    // current_num = (current_num+1)%current_files.length;
  }
  else{
    self.img.src = path+current_files[current_num];
    self.folder.text = "";
    self.filename.text = current_files[current_num];
  }
};
function readDirectory(){
  path = '';
  current_path.forEach(function(value){
    path += value + '/';
  });
  current_files = [];
  // console.log(path);
  fs.readdir(path, function(err,files){
    if (err) throw err;
    Array.prototype.push.apply(current_files,files);
    console.log(current_files);
    console.log(files);
  });
}

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
