import React, { Component } from 'react'

import { Header } from '@components/Header'
import Image from '@/assets/electron.png'

class Home extends Component {
	render(): JSX.Element {
		return (
			<div>
				<Header />
				<h2>👋 Hello!</h2>
				<p>Start developing your desktop app.</p>
				<img src={Image} style={{ width: '100%' }} />
			</div>
		)
	}
}

export default Home
