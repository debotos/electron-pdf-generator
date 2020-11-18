import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from '@screens/home/Home'

const AppRoutes = () => {
	return (
		// Not BrowserRouter
		<HashRouter>
			<Switch>
				<Route exact path='/' component={Home} />
			</Switch>
		</HashRouter>
	)
}

export default AppRoutes
