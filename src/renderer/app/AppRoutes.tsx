import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from '@screens/Home'

export const AppRoutes: React.FC<{}> = (): JSX.Element => {
	return (
		// Not BrowserRouter
		<HashRouter>
			<Switch>
				<Route exact path='/' component={Home} />
			</Switch>
		</HashRouter>
	)
}
