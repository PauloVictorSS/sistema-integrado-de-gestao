const { app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

function createWindow(){

    const win = new BrowserWindow({
        width: 1024,
        height: 800
    })

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {

    if(process.plataform !== 'darwin'){
        app.quit()
    }
})

app.on('active', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})