export const isEmpty = (value: any) =>
	value === undefined ||
	value === 'undefined' ||
	value === null ||
	value === 'null' ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0)

export const getBase64 = (file: any) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}
