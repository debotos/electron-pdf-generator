import React from 'react'
import { hot } from 'react-hot-loader/root'

import './App.less'
import AppRoutes from './AppRoutes'
import Body from '@components/containers/Body'
import notification from '@/utils/notification'
import ErrorBoundary from '@components/ErrorBoundary'

const App = () => {
	React.useEffect(() => {
		notification.setup()
	}, [])

	return (
		<ErrorBoundary>
			<Body>
				<AppRoutes />
			</Body>
		</ErrorBoundary>
	)
}

export default hot(App)
