import React from 'react'
import { hot } from 'react-hot-loader/root'

import './App.less'
import AppRoutes from './AppRoutes'
import Body from '@components/containers/Body'
import ErrorBoundary from '@components/ErrorBoundary'

const App = () => {
	return (
		<ErrorBoundary>
			<Body>
				<AppRoutes />
			</Body>
		</ErrorBoundary>
	)
}

export default hot(App)
