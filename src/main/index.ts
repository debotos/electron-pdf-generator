import path from 'path'
import { app, BrowserWindow, ipcMain, Notification, Menu, Tray } from 'electron'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
const isDev = !app.isPackaged

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	// eslint-disable-line global-require
	app.quit()
}

app.setName('PDF Generator')

const dockIcon = path.join(app.getAppPath(), 'src/assets/logo.png')
const trayIcon = path.join(app.getAppPath(), 'src/assets/tray_icon.png')

const createSplashWindow = () => {
	const win = new BrowserWindow({
		width: 400,
		height: 200,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: false,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
		},
	})

	win.loadFile(path.join(app.getAppPath(), 'public/splash/index.html'))
	return win
}

const createWindow = () => {
	const win = new BrowserWindow({
		height: 800,
		width: 1000,
		icon: dockIcon,
		title: 'PDF Generator',
		backgroundColor: '#fff',
		webPreferences: {
			nodeIntegration: false,
			preload: './preload',
		},
	})

	// and load the index.html of the app.
	win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

	// Open the DevTools.
	isDev && win.webContents.openDevTools()

	return win
}

if (process.platform === 'darwin') {
	app.dock.setIcon(dockIcon)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null
app.whenReady().then(() => {
	const template = require('./menu').createTemplate(app)
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

	tray = new Tray(trayIcon)
	tray.setContextMenu(menu)

	const splash = createSplashWindow()
	const mainApp = createWindow()

	mainApp.hide()
	mainApp.once('ready-to-show', () => {
		setTimeout(() => {
			splash.destroy()
			mainApp.show()
		}, 2000)
	})
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('notify', (_, message: NotificationMessage) => {
	const { title, body } = message
	new Notification({ title, body }).show()
})

ipcMain.on('app-quit', () => {
	app.quit()
})
