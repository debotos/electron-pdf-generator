import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electron', {
	notificationApi: {
		sendNotification(message: NotificationMessage) {
			ipcRenderer.send('notify', message)
		},
	},
	appApi: {
		quitApp() {
			ipcRenderer.send('app-quit')
		},
	},
	batteryApi: {},
	fileApi: {},
})
