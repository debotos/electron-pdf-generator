import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'

import { AppRoutes } from './AppRoutes'

export class App extends Component {
	render(): JSX.Element {
		return <AppRoutes />
	}
}

export default hot(() => <App />)
