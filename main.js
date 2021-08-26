"use strict"

const { app, BrowserWindow, ipcMain, nativeImage } = require('electron')
const Mousetrap = require('mousetrap')
const electronLocalshortcut = require('electron-localshortcut')


const image = nativeImage.createFromPath(`file://${__dirname}/dist/assets/logo.png`)

const args = process.argv.slice(1);
var serve = args.some(val => val === '--serve');

let win


/**
 * Window options
 * */
let windowConfig = {
  show: false,
  frame: false,
  hasShadow: true,
  transparent: false,
  autoHideMenuBar: true,
  minimizable: true,
  fullscreenable: false,
  thickFrame: true,
  width: serve ? 1160 + 400 : 1160,
  height: 720,
  minWidth: 720,
  minHeight: 720,
  zoomFactor: 1,
  title: 'Clubhouse Desktop',
  icon: image,
  webPreferences: {
    preload: `file://${__dirname}/preload.js`,
    nodeIntegration: true,
    contextIsolation: false,
    textAreasAreResizable: false,
    allowRunningInsecureContent: (serve) ? true : false,
  }
}


/**
 * Main window Settings and Config function
 * */
function createWindow() {
  win = new BrowserWindow(windowConfig)


  /**
   * If serve then run in development mode
   * refreshes on changes detected.
   */
  if (serve) {
    // This opens dev tools
    win.webContents.openDevTools()

    require('electron-reload')(__dirname, {})

    win.setAlwaysOnTop(true)
    win.width = win.width + 300;

    win.loadURL('http://localhost:4200')
  } else {
    // Load built application if not serve
    win.loadURL(`file://${__dirname}/dist/index.html`)
  }

  
  
  // Event when the window is closed
  win.on('closed', function () {
    win = null
  })

  win.webContents.on('new-window', function (e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });

  ipcMain.once("browser-window-ready-to-show", (event, args) => {
    win.show()
  })

   //Pass data async to the window
  win.webContents.on('dom-ready', (event) => {
    win.webContents.send("<channel>") // This is asynchronous
  })



  // Disable shortcuts 
  win.on('focus', (event) => {
    electronLocalshortcut.register(win, ['CommandOrControl+R', 'CommandOrControl+Shift+R', 'F5'], () => {  })
  })

  win.on('blur', (event) => {
    electronLocalshortcut.unregisterAll(win)
  })

  app.on('will-quit', () => {
    // Unregister a shortcut.
    electronLocalshortcut.unregister('CommandOrControl+X')

    // Unregister all shortcuts.
    electronLocalshortcut.unregisterAll()
  })

  
}


// Create window on electron initialization
app.on('ready', createWindow)

// Quit when all windows are closed
app.on('window-all-closed', function () {
  app.quit()
})

// Create window on electron activated and there's no window
app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})


