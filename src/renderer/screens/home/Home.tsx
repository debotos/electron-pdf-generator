import React, { Component } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { Button, message, Row, Upload } from 'antd'
// eslint-disable-next-line import/no-unresolved
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces'

import Header from '@components/header/Header'
import { isEmpty, getBase64 } from '@/utils/helpers'
import Notification from '@/utils/notification'

interface CState {
	fileList: any[]
	processing: boolean
}

type CProps = {}

const { Dragger } = Upload
const PDF_FONTS = {
	// This if just for reference. Already available via 'pdfFonts' via base64 format
	Roboto: {
		normal: 'Roboto-Regular.ttf',
		bold: 'Roboto-Medium.ttf',
		italics: 'Roboto-Italic.ttf',
		bolditalics: 'Roboto-Italic.ttf',
	},
}

class Home extends Component<CProps, CState> {
	constructor(props: CProps) {
		super(props)
		this.state = { fileList: [], processing: false }
	}

	generatePDF = async () => {
		try {
			this.setState({ processing: true })
			const { fileList } = this.state
			// console.log('Data to generate PDF:', fileList)

			// Create a document definition
			const pageMargins: PDFPageMargins = [40, 60, 40, 60] // [left, top, right, bottom]
			const pageLayout: PDFPageLayout = { width: 612, height: 'auto', margins: pageMargins }
			const pdfContent: Content = []
			for (const singleFile of fileList) {
				const base64Data = await getBase64(singleFile.originFileObj)
				pdfContent.push({
					image: base64Data as string,
					alignment: 'center',
					width: (pageLayout.width - (pageMargins[0] + pageMargins[2])) * 0.8,
				})
				pdfContent.push({ text: '\n\n' })
			}
			const docDefinition: TDocumentDefinitions = {
				pageSize: { width: pageLayout.width, height: pageLayout.height },
				pageMargins,
				content: pdfContent,
			}
			// console.log('PDF document definition', docDefinition)
			const filePath = `${Date().substr(0, 15)}.pdf`

			pdfMake
				.createPdf(docDefinition, {}, PDF_FONTS, pdfFonts.pdfMake.vfs)
				.download(filePath, () => {
					message.success('Successfully generated PDF!')
					Notification.show({
						title: 'PDF Generator',
						body: 'Successfully generated PDF!',
					})
				})

			this.setState({ fileList: [] }) // Clear
		} catch (error) {
			console.log(error)
			message.error('Something went wrong. Try again!')
		} finally {
			this.setState({ processing: false })
		}
	}

	handleOnChange = ({ fileList }: any) => {
		if (isEmpty(fileList)) return this.setState({ fileList: [] })
		this.setState({ fileList: [...fileList] })
	}

	render(): JSX.Element {
		const { fileList, processing } = this.state

		return (
			<>
				<Header />
				<div className='container my-4'>
					<Dragger
						accept='image/png, image/jpeg'
						name='file-picker'
						multiple={true}
						beforeUpload={() => false} /* To stop the default upload behavior */
						fileList={fileList}
						onChange={this.handleOnChange}
					>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>
							Click or drag PNG/JPEG images to this area to process 💡
						</p>
						<p className='ant-upload-hint'></p>
					</Dragger>
				</div>

				<Row justify='center' className='mt-3'>
					<Button
						type='primary'
						disabled={isEmpty(fileList)}
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
