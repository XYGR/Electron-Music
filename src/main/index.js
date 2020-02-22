import { app, BrowserWindow,ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        width: 1022,
        height: 670,
        frame: false
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    mainWindow.hookWindowMessage(278,()=>{
        // 禁用窗口
        mainWindow.setEnabled(false);

        // 延迟激活
        setTimeout(()=>{
            mainWindow.setEnabled(true)
        },100)

        return true;
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

// 迷你模式
ipcMain.on('mini',()=> {mainWindow.minimize()})
// 最小化
ipcMain.on('min', ()=> {mainWindow.minimize()})
// 最大化
ipcMain.on('max', (event)=> {
    // 判断是否最大化
    if (mainWindow.isMaximized()){
        mainWindow.unmaximize()
    }else{
        mainWindow.maximize()
    }
    event.returnValue = mainWindow.isMaximized()
})
// 关闭
ipcMain.on('close', ()=> {mainWindow.minimize()})




/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
