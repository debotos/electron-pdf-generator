import React from 'react'
import { Result, Button, Row } from 'antd'

const Apology = () => {
	return (
		<Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
			<Result
				status='500'
				title='500'
				subTitle={`Sorry, Something went wrong. Please try again.`}
				extra={
					<Button type='dashed' onClick={() => window.location.reload()}>
						<b>Try Again</b>
					</Button>
				}
			/>
		</Row>
	)
}

export default React.memo(Apology)
