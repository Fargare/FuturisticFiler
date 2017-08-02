'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;

let mainWindow = null;

// console.log(window.parent.screen.width);

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  const Screen = electron.screen;
  const size = Screen.getPrimaryDisplay().workAreaSize; // ディスプレイのサイズを取得する
  console.log(size);
  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    frame:false,
    // transparent:true,
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});
// const images = [];
// for (let i = 0 ;i<3;i++){
//   images.push(new Image());
// }
// ipcMain.on('ReadPictures',(event,arg) => {
//   // arg.src = "folder.png";
//   for (let i=0;i<3;i++){
//     images[i].src = 'folder.png';
//   }
//   event.sender.send('ReadPictures_reply',images);
// })

app.on('ready', () => {
  globalShortcut.register('esc', () => {
    app.quit();
  })
  globalShortcut.register('F5', () => {
    console.log("relaunch");
    app.relaunch();
    app.exit(0);
  })
});
