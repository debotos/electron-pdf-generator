import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'

import './App.less'
import { AppRoutes } from './AppRoutes'
import Body from '../components/containers/Body'

export class App extends Component {
	render(): JSX.Element {
		return (
			<Body>
				<AppRoutes />
			</Body>
		)
	}
}

export default hot(App)
