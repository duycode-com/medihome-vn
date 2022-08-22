export default class ErrorUtils extends Error {
	public statusCode: number

	public errorCode: string

	constructor(statusCode: number, errorCode: string, ...params: any) {
		super(...params)
		this.statusCode = statusCode
		this.errorCode = errorCode
	}
}
