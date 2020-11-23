import React from 'react'
import styled from 'styled-components'

interface CProps {
	children: React.ReactNode
}

const Body = (props: CProps): JSX.Element => {
	const { children } = props

	return <Container>{children}</Container>
}

export default Body

const Container = styled.div`
	min-height: 100vh;
	min-width: 100vw;
	background-color: #ebedef;
	padding-bottom: 30px;
`
