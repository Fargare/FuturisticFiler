'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {

  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame : false,
    transparent:true,
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
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
