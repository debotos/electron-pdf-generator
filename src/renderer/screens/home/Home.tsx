import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { ipcRenderer } from 'electron'
import { Button, Row, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import { isEmpty } from '@/utils/helpers'
import Header from '@components/header/Header'

const { Dragger } = Upload

class Home extends Component {
	state = { selectedFiles: [], processing: false }

	componentDidMount() {
		ipcRenderer.on('generatePDF:end', this.onPdfGenerateFinish)
	}

	componentWillUnmount() {
		ipcRenderer.removeListener('generatePDF:end', this.onPdfGenerateFinish)
	}

	onPdfGenerateFinish = (_: any, { message }: any) => {
		this.setState({ processing: false })
		console.log('Got message after PDF generate finished ->', message)
	}

	generatePDF = () => {
		this.setState({ processing: true })
		const { selectedFiles } = this.state
		const images = selectedFiles.map((image: any) => {
			// prettier-ignore
			const { id, file: { name, size, type, path } } = image
			return { path, id, name, size, type }
		})
		const data = { images }
		console.log('Sending data to generate PDF:', data)
		ipcRenderer.send('generatePDF:start', data)
	}

	handleOnChange = ({ fileList }: any) => {
		if (fileList.length === 0) return this.setState({ selectedFiles: [] })
		const selectedFiles = fileList.map((file: any) => ({ file: file.originFileObj, id: nanoid() }))
		this.setState({ selectedFiles })
	}

	render(): JSX.Element {
		const { selectedFiles, processing } = this.state

		return (
			<>
				<Header />
				<div className='container my-4'>
					<Dragger
						accept='image/*'
						name='file-picker'
						multiple={true}
						beforeUpload={() => false} /* To stop the default upload behavior */
						onChange={this.handleOnChange}
					>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>Click or drag images to this area to process💡</p>
						<p className='ant-upload-hint'></p>
					</Dragger>
				</div>

				<Row justify='center' className='my-3'>
					<Button
						type='primary'
						disabled={isEmpty(selectedFiles)}
						loading={processing}
						onClick={this.generatePDF}
					>
						Generate PDF
					</Button>
				</Row>
			</>
		)
	}
}

export default Home
