import fs from 'fs'
import path from 'path'
import ErrorUtils from './error.utils'
import TimeUtils from './time.utils'

interface LoggerOption {
	folder?: string
	filePattern?: string
	timePattern?: string
	hasConsole?: boolean
	hasFile?: boolean
}

class LoggerUtils {
	private folder = 'logs'

	private filePath = ''

	private filePattern = 'YYYY-MM/YYYY-MM-DD'

	private timePattern = 'YYYY-MM-DD hh:mm:ss'

	private hasConsole = true

	private hasFile = true

	private writeStream: fs.WriteStream

	public readonly colorize = {
		reset: '\x1b[0m',
		bold: '\x1b[1m',
		italic: '\x1b[3m',
		under: '\x1b[4m',

		black: '\x1b[30m',
		red: '\x1b[31m',
		green: '\x1b[32m',
		yellow: '\x1b[33m',
		blue: '\x1b[34m',
		magenta: '\x1b[35m',
		cyan: '\x1b[36m',
		white: '\x1b[37m',

		bgBlack: '\x1b[40m',
		bgRed: '\x1b[41m',
		bgGreen: '\x1b[42m',
		bgYellow: '\x1b[43m',
		bgBlue: '\x1b[44m',
		bgMagenta: '\x1b[45m',
		bgCyan: '\x1b[46m',
		bgWhite: '\x1b[47m',
	}

	public config = (options: LoggerOption) => {
		if ('folder' in options) this.folder = options.folder
		if ('filePattern' in options) this.filePattern = options.filePattern
		if ('timePattern' in options) this.timePattern = options.timePattern
		if ('hasConsole' in options) this.hasConsole = options.hasConsole
		if ('hasFile' in options) this.hasFile = options.hasFile
	}

	public info = (message: any): void => this.init(message, 'info')

	public notify = (message: any): void => this.init(message, 'notify')

	public warn = (message: any): void => this.init(message, 'warn')

	public error = (e: ErrorUtils): void => {
		const time = TimeUtils.timeToText(new Date(), this.timePattern)
		const { reset } = this.colorize
		const color = this.colorize.red // change color here
		const stack = this.formatStack(e.stack)

		if (this.hasConsole) {
			const labelColor = `${color}[${time}] [ERROR]: StatusCode ${e.statusCode}, ErrorCode ${e.errorCode}${reset}`
			console.error(labelColor, `\n${stack}`)
		}
		if (this.hasFile) {
			const labelBasic = `[${time}] [ERROR]: StatusCode ${e.statusCode}, ErrorCode ${e.errorCode}`
			this.writeFile(labelBasic, `\n${stack}`)
		}
	}

	public fatal = (message: any): void => this.init(message, 'fatal')

	private init = (message: any, type: 'info' | 'notify' | 'warn' | 'fatal'): void => {
		const time = TimeUtils.timeToText(new Date(), this.timePattern)
		const { bold, reset } = this.colorize

		let color: string
		if (type === 'info') color = this.colorize.blue
		if (type === 'notify') color = this.colorize.green
		if (type === 'warn') color = this.colorize.yellow
		if (type === 'fatal') color = this.colorize.magenta

		if (this.hasConsole) {
			const labelColor = `${color}[${time}] ${bold}[${type.toUpperCase()}]:${reset}`
			console.log(labelColor, message)
		}
		if (this.hasFile) {
			const labelBasic = `[${time}] [${type.toUpperCase()}]:`
			this.writeFile(labelBasic, message)
		}
	}

	private writeFile = (info: string, message: string): void => {
		const fileCurrent = TimeUtils.timeToText(new Date(), this.filePattern) + '.log'
		const filePath = path.resolve(this.folder, fileCurrent)
		const data = `${info} ${message}\n`

		if (this.filePath !== filePath) {
			const fileDir = path.dirname(filePath)
			if (!fs.existsSync(fileDir)) {
				fs.mkdirSync(fileDir, { recursive: true })
			}
			this.filePath = filePath
			// flag a: Open file for appending. The file is created if it does not exist
			this.writeStream = fs.createWriteStream(this.filePath, { flags: 'a' })
		}

		this.writeStream.write(data)
	}

	private formatStack = (stack: string) => {
		const lineList = stack.split('\n')
		let result = lineList[0] || ''
		for (let i = 1; i < lineList.length; i += 1) {
			if (/dist|src/.test(lineList[i])) {
				result += '\n' + lineList[i]
			}
		}
		return result
	}
}

const Logger = new LoggerUtils()
export default Logger
