const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

if (require('electron-squirrel-startup')) return;

// handle setupEvents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else {
    return;
  }
}

var BUILD_DIR = "../"

require('electron-handlebars') ({
  MODE: BUILD_DIR,
  LOG_URL: process.env.LOG_URL,
  BASE_URL: process.env.BASE_URL,
  CSRF_TOKEN: "",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
});

let win

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, './build/web/views/editor.html'), //./code.pyret.org/build/web/views/editor.html
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools()

  win.on('close', function(e) {
    e.preventDefault();
    win.destroy();
  })

  //win.loadFile('./code.pyret.org/build_experiment/web/views/editor.html')//./code.pyret.org/build/web/views/editor.html
}

ipcMain.on('openFile', (event, path) => {
  const {dialog} = require('electron')
  const fs = require('fs')
  dialog.showOpenDialog(function (fileNames) {
    if(fileNames === undefined) {
      console.log("No file selected");
    } else {
      readFile(fileNames[0]);
    }
  });

  function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if(err){
        alert("An error occurred reading the file:" + err.message)
        return
      }
      event.sender.send('fileData', data)
    })
  }
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
