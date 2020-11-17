import React from 'react'
import styled from 'styled-components'

const Header = (): JSX.Element => {
	return (
		<HeaderContainer>
			<h1 style={{ margin: 0 }}>👋 Welcome!</h1>
		</HeaderContainer>
	)
}

export default Header

const HeaderContainer = styled.header`
	text-align: center;
	padding: 10px 0;
	background: lightcyan;
`
