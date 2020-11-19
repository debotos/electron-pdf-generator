declare module '*.jpg' {
	const _default: string
	export default _default
}

declare module '*.png' {
	const _default: string
	export default _default
}

type PDFPageMargins = [number, number, number, number] // [left, top, right, bottom]
type PDFPageLayout = { width: number; height: number | 'auto'; margins: PDFPageMargins }
