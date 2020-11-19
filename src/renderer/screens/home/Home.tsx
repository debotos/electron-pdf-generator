import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { Button, message, Row, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

// eslint-disable-next-line import/no-unresolved
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces'

import Header from '@components/header/Header'
import { isEmpty, getBase64 } from '@/utils/helpers'

interface CState {
	selectedFiles: any[]
	processing: boolean
}

type CProps = {}

const { Dragger } = Upload
const PDF_FONTS = {
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
		this.state = { selectedFiles: [], processing: false }
	}

	generatePDF = async () => {
		try {
			this.setState({ processing: true })
			const { selectedFiles } = this.state
			// console.log('Data to generate PDF:', selectedFiles)

			// Create a document definition
			const pageMargins: PDFPageMargins = [40, 60, 40, 60] // [left, top, right, bottom]
			const pageLayout: PDFPageLayout = { width: 612, height: 'auto', margins: pageMargins }
			const pdfContent: Content = []
			for (const singleFile of selectedFiles) {
				const base64Data = await getBase64(singleFile.file)
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
				.download(filePath, () => message.success('Successfully generated PDF!'))
		} catch (error) {
			console.log(error)
			message.error('Something went wrong. Try again!')
		} finally {
			this.setState({ processing: false })
		}
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
						accept='image/png, image/jpeg'
						name='file-picker'
						multiple={true}
						beforeUpload={() => false} /* To stop the default upload behavior */
						onChange={this.handleOnChange}
					>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>
							Click or drag PNG/JPEG images to this area to process💡
						</p>
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
