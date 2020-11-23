import { shell } from 'electron'

export const createTemplate = (app: any) => {
	return [
		{
			label: process.platform === 'darwin' ? app.getName() : 'Menu',
			submenu: [{ label: 'Exit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }],
		},
		{
			label: 'Edit',
			submenu: [
				{ label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
				{ label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
				{ type: 'separator' },
				{ label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
				{ label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
				{ label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
				{ label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
			],
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Toggle Full Screen',
					accelerator: (() => {
						if (process.platform === 'darwin') {
							return 'Ctrl+Command+F'
						} else {
							return 'F11'
						}
					})(),
					click: (_: any, focusedWindow: any) => {
						if (focusedWindow) {
							focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
						}
					},
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: (() => {
						if (process.platform === 'darwin') {
							return 'Alt+Command+I'
						} else {
							return 'Ctrl+Shift+I'
						}
					})(),
					click: (_: any, focusedWindow: any) => {
						if (focusedWindow) {
							focusedWindow.toggleDevTools()
						}
					},
				},
				{
					type: 'separator',
				},
			],
		},
		{
			label: 'Window',
			role: 'window',
			submenu: [
				{ label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
				{ label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
				{ type: 'separator' },
				{
					label: 'Reopen Window',
					accelerator: 'CmdOrCtrl+Shift+T',
					enabled: false,
					click: () => app.emit('activate'),
				},
			],
		},
		{
			label: 'Help',
			role: 'help',
			submenu: [
				{ label: 'Learn More', click: () => shell.openExternal('http://electron.atom.io') },
			],
		},
	]
}
