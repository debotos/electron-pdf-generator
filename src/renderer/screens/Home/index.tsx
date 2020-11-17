import React, { Component } from 'react'

import Header from '@components/header/Header'

class Home extends Component {
	render(): JSX.Element {
		return (
			<div>
				<Header />
				<p>Start developing your desktop app.</p>
			</div>
		)
	}
}

export default Home
