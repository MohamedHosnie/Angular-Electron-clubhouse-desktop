
(() => {
  "use strict"

  const { app, BrowserWindow, ipcMain } = require('electron');
  const electronLocalshortcut = require('electron-localshortcut');

  const args = process.argv.slice(1);
  var serve = args.some(val => val === '--serve');


  let Helper = (() => {

    let _windowConfig = {
      show: false,
      frame: false,
      /*titleBarStyle: "hidden",*/
      hasShadow: true,
      transparent: false,
      autoHideMenuBar: true,
      minimizable: true,
      maximizable: true,
      fullscreenable: false,
      thickFrame: true,
      resizable: true,
      title: 'Clubhouse Desktop',
      icon: `file://${__dirname}/dist/assets/logo.png`,
      webPreferences: {
        preload: `file://${__dirname}/preload.js`,
        nodeIntegration: true,
        contextIsolation: false,
        textAreasAreResizable: false,
        /*        allowRunningInsecureContent: (serve) ? true : false*/
      }
    };

    let _setConfigWindowSize = (_config, _mw, _w, _mh, _h) => {
      _config.width = serve ? _w + 400 : _w;
      _config.height = _h;
      _config.minWidth = serve ? _mw + 400 : _mw;
      _config.minHeight = _mh;

      return _config;
    }

    let _CreateWindow = (_windowConfig) => {
      return new BrowserWindow(_windowConfig);
    };

    let _LoadWindowContent = (_windowObj, _route = '') => {
            /**
       * If serve then run in development mode
       * refreshes on changes detected.
       */
      if (serve) {
        // This opens dev tools
        _windowObj.webContents.openDevTools();

        require('electron-reload')(__dirname, {});

        _windowObj.setAlwaysOnTop(true);

        _windowObj.loadURL('http://localhost:4200' + '/#/' + _route);
      } else {
        // Load built application if not serve
        _windowObj.loadURL(`file://${__dirname}/dist/index.html` + '#/' + _route);
      }
    };

    let _bindWindowWithEvent = (_window) => {
      ipcMain.on(`display-${_window.name()}-window`, (event, args) => {

        if (_window.windowObj() == null
          || _window.windowObj().isDestroyed()) {
          _window.create();
        }

        if (_window.windowObj().isVisible()) {
          _window.windowObj().focus();
          return;
        }

        _window.windowObj().on('maximize', (event) => {
          _window.windowObj().webContents.send(`${_window.name()}-window-maximized`);
        });

        _window.windowObj().on('unmaximize', (event) => {
          _window.windowObj().webContents.send(`${_window.name()}-window-unmaximized`);
        });

        _window.windowObj().show();

      });

      ipcMain.on(`close-${_window.name()}-window`, (event, args) => {
        _window.windowObj().close();
      });

      ipcMain.on(`minimize-${_window.name()}-window`, (event, args) => {
        _window.windowObj().minimize();
      });

      ipcMain.on(`maximize-${_window.name()}-window`, (event, args) => {
        if (args.maximized == false) {
          _window.windowObj().maximize();
        }
      });

      ipcMain.on(`restore-${_window.name()}-window`, (event, args) => {
        if (args.maximized == true) {
          _window.windowObj().unmaximize();
        }
      });

    };

    let _setChildWindowConfig = (_config, _parent) => {
      _windowConfig.maximizable = false;
      _windowConfig.minimizable = false;
      _windowConfig.skipTaskbar = true;
      _windowConfig.parent = _parent.windowObj();
      _windowConfig.modal = true;

      return _config;
    }

    let _bindWindowsWithEvents = (_windows) => {
      for (let window of _windows) {
        _bindWindowWithEvent(window);
      }
    }

    let _runDefaultCreateWindowSettings = (_windowObj) => {
      _windowObj.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
      });

      
      // Disable shortcuts 
      _windowObj.on('focus', (event) => {
        electronLocalshortcut.register(_windowObj, ['CommandOrControl+R', 'CommandOrControl+Shift+R', 'F5'], () => { });
      });

      _windowObj.on('blur', (event) => {
        electronLocalshortcut.unregisterAll(_windowObj);
      });

    }

    let _emmitWindowCreated = (_name, _windowObj) => {
      _windowObj.webContents.on('dom-ready', (event) => {
        _windowObj.webContents.send(`${_name}-window-created`, {
          name: _name,
          maximizable: _windowObj.isMaximizable(),
          minimizable: _windowObj.isMinimizable(),
          closable: _windowObj.isClosable(),
          maximized: _windowObj.isMaximized()
        }); // This is asynchronous
      });

    }


    return {
      windowConfig: () => _windowConfig,

      CreateWindow: (windowConfig) =>
        _CreateWindow(windowConfig),

      LoadWindowContent: (windowObj, route) =>
        _LoadWindowContent(windowObj, route),

      bindWindowWithEvent: (window) =>
        _bindWindowWithEvent(window),

      bindChildWindowWithEvent: (eventName, window, parent) =>
        _bindChildWindowWithEvent(eventName, window, parent),

      setConfigWindowSize: (config, mw, w, mh, h) =>
        _setConfigWindowSize(config, mw, w, mh, h),

      setChildWindowConfig: (config, parent) =>
        _setChildWindowConfig(config, parent),

      bindWindowsWithEvents: (windows) =>
        _bindWindowsWithEvents(windows),

      runDefaultCreateWindowSettings: (windowObj) =>
        _runDefaultCreateWindowSettings(windowObj),

      emmitWindowCreated: (name, windowObj) =>
        _emmitWindowCreated(name, windowObj)
    }

  })();


  let _app = (() => {
    /* Private Methods */
    let _init = (windows) => {
      app.on('ready', () => {
        windows[0].create();
      });

      // Quit when all windows are closed
      app.on('window-all-closed', function () {
        app.quit();
      });


      Helper.bindWindowsWithEvents(windows);

    }

    return {
      /* Public Methods */
      init: (windows) => {
        _init(windows);
      }
    };

  })();

  let _mainWindow = (() => {
    /* Private Members */
    let _windowObj = null;
    let _windowConfig = Helper.windowConfig();
    let _name = "main";
    
    /* Private Methods */
    let _create = () => {
      _windowConfig = Helper.setConfigWindowSize(_windowConfig, 920, 1160, 720, 720);
      _windowObj = Helper.CreateWindow(_windowConfig);
      Helper.LoadWindowContent(_windowObj);
      
      // Event when the window is closed
      _windowObj.on('closed', function () {
        _windowObj = null;
        app.quit();
      });

      Helper.runDefaultCreateWindowSettings(_windowObj);

      Helper.emmitWindowCreated(_name, _windowObj);
    };

    return {
      /* Public Members */
      windowObj: () => _windowObj,
      parent: () => null,
      name: () => _name,

      /* Public Methods */
      create: () => {
        _create();
      }
    };

  })();

  let _profileWindow = (() => {
    /* Private Members */
    let _windowObj = null;
    let _windowConfig = Helper.windowConfig();
    let _parent = _mainWindow;
    let _name = "profile";

    /* Private Methods */
    let _create = () => {
      _windowConfig = Helper.setConfigWindowSize(_windowConfig, 0, 600, 0, 680);
      _windowConfig = Helper.setChildWindowConfig(_windowConfig, _parent);

      _windowObj = Helper.CreateWindow(_windowConfig);
      Helper.LoadWindowContent(_windowObj, 'section/profile');

      Helper.runDefaultCreateWindowSettings(_windowObj);

      Helper.emmitWindowCreated(_name, _windowObj);
    };

    return {
      windowObj: () => _windowObj,
      parent: () => _parent,
      name: () => _name,

      create: () => {
        _create();
      }
    };

  })();


  /* RUN the application */
  _app.init([
    _mainWindow,
    _profileWindow
  ]);

})();
