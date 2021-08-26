"use strict"

const { ipcRenderer } = require('electron')
require('electron-disable-file-drop')

ipcRenderer.once("<channel>", (event) => {

  /**
   * Show application window only when
   * application has been loaded
   */
  setTimeout(() => {
    ipcRenderer.send("browser-window-ready-to-show")
  }, 50)
  

})
