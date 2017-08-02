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

const ipcRenderer = require('electron').ipcRenderer;

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


    // this.img.src = path+current_files[current_num];
    // console.log(this.img.src);

    //
    // this.space = Sprite('bg',image_size,image_size).addChildTo(this);
    // console.log(this.space.x,this.space.y);
    // this.space.x = this.gridX.center();
    // this.space.y = this.gridY.center(4);
    //
    // this.folder = Label({
    //   text :"",
    //   x:0,
    //   y:this.space.height/2,
    //   fill:'white',
    //   fontFamily:'Century Gothic',
    //   fontSize:40,
    // }).addChildTo(this.space);
    // this.filename = Label({
    //   text :"test",
    //   x:0,
    //   y:this.space.height + 20,
    //   fill:'white',
    //   fontFamily:'Century Gothic',
    //   fontSize:30,
    // }).addChildTo(this.space);

    // this.img = new Image();

    this.spaces = [];
    this.folders = [];
    this.filenames = [];
    this.images = [];
    const self = this;

    for (let i= 0;i<3;i++){
      console.log(i);
      this.images.push(new Image());
      this.images[i].src = "";
      this.images[i].onload = function(){
          console.log(this.src);
      };
      this.spaces.push(Sprite('bg',image_size,image_size).addChildTo(this))
      this.spaces[i].x = this.gridX.center(-4+i*4);
      this.folders.push(Label({
        text :"",
        x:0,
        y:this.spaces[i].height/2,
        fill:'white',
        fontFamily:'Century Gothic',
        fontSize:40,
      }).addChildTo(this.spaces[i]));
      this.filenames.push(Label({
        text :"test",
        x:0,
        y:this.spaces[i].height + 20,
        fill:'white',
        fontFamily:'Century Gothic',
        fontSize:30,
      }).addChildTo(this.spaces[i]));
      this.spaces[i].draw = function(canvas){
        let width = image_size;
        let height = image_size;
        if (self.images[i].width>self.images[i].height){
          height = image_size * (self.images[i].height/self.images[i].width);
        }
        else{
          width = image_size * (self.images[i].width/self.images[i].height);
        }
        canvas.context.drawImage(self.images[i],-width/2,image_size/2-height/2,width,height);
      }
    }
    //
    // this.space.draw = function(canvas){
    //   let width = image_size;
    //   let height = image_size;
    //   if (self.img.width>self.img.height){
    //     height = image_size * (self.img.height/self.img.width);
    //   }
    //   else{
    //     width = image_size * (self.img.width/self.img.height);
    //   }
    //   canvas.context.drawImage(self.img,-width/2,image_size/2-height/2,width,height);
    // }
    readPicture(this);

    this.count = 2;

  },
  update:function(app){
    // ipcRenderer.on('ReadPictures_reply', (event, arg) => {
    //   this.images = arg;
    // })
    // console.log('update');

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
    const tweener_playing = (
      this.spaces[0].tweener.playing
      ||this.spaces[1].tweener.playing
      ||this.spaces[2].tweener.playing
    )
    if (!tweener_playing){//キーボード入力はじめ
      if (key.getKey('left')){
        // ipcRenderer.send('ReadPictures',this.images[0]);
        // console.log(this.images[0].src);
        // this.images[0].src = "folder.png";

        for (let i= 0;i<3;i++){
          this.spaces[i].tweener.clear()
          .by({
            x:450,
            // alpha:-0.5,
          },200)
          .set({
            x:this.gridX.center(-4+i*4),
          })
          .call(function(){
            if (i ==0){
              current_num = (current_num+current_files.length-1)%current_files.length;
              readPicture(self);
            }
          })
          .setLoop(false);
        }
      };
      if (key.getKey('right')){
        for (let i= 0;i<3;i++){
          this.spaces[i].tweener.clear()
          .by({
            x:-450,
            // alpha:-0.5,
          },200)
          .set({
            x:this.gridX.center(-4+i*4),
          })
          .call(function(){
            if (i ==0){
              current_num = (current_num+1)%current_files.length;
              readPicture(self);
            }
          })
          .setLoop(false);
        }

      };
      if (key.getKey('up')){
        if (current_path.length !=1){
          current_path.pop();
          readDirectory();
          this.spaces[0].tweener.clear()
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
      if (key.getKey('down')){
        // console.log(current_files[current_num].match(/\./));
        if(!/\./.test(current_files[current_num])){
          // console.log("Folder!!!");
          current_path.push(current_files[current_num]);
          readDirectory();
          this.spaces[0].tweener.clear()
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
  console.log('readPicture');
  for (let i = 0;i<3;i++){
    if(!/jpg|JPG|PNG|png/.test(current_files[(current_num+current_files.length-1+i)%current_files.length])){
      self.images[i].src = "folder.png";
      self.folders[i].text = current_files[(current_num+current_files.length-1+i)%current_files.length];
      self.filenames[i].text = '';
      // current_num = (current_num+1)%current_files.length;
    }
    else{
      self.images[i].src = path+current_files[(current_num+current_files.length-1+i)%current_files.length];
      self.folders[i].text = "";
      self.filenames[i].text = current_files[(current_num+current_files.length-1+i)%current_files.length];
    }
  }
};
function readAll(self){
  for (let i =0;i<current_files.length;i++){
    self.images
  }
}
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
