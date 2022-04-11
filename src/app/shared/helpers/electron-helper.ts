
declare var electron: any;

export class ElectronHelper {
  static displayWindow(windowName: string) {
    electron.ipcRenderer.send(`display-${windowName}-window`);
  }

  static minimizeWindow(windowName: string) {
    electron.ipcRenderer.send(`minimize-${windowName}-window`);
  }

  static maximizeWindow(windowName: string, args: any) {
    electron.ipcRenderer.send(`maximize-${windowName}-window`, args);
  }

  static restoreWindow(windowName: string, args: any) {
    electron.ipcRenderer.send(`restore-${windowName}-window`, args);
  }

  static closeWindow(windowName: string) {
    electron.ipcRenderer.send(`close-${windowName}-window`);
  }

  static onWindowCreated(windowName: string, handler: (event: any, data: any) => void) {
    electron.ipcRenderer.once(`${windowName}-window-created`, handler);
  }

  static onWindowMaximize(windowName: string, handler: (event: any) => void) {
    electron.ipcRenderer.on(`${windowName}-window-maximized`, handler);
  }

  static onWindowRestore(windowName: string, handler: (event: any) => void) {
    electron.ipcRenderer.on(`${windowName}-window-unmaximized`, handler);
  }

}
