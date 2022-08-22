import express, { Express } from 'express'
import helmet from 'helmet'
import { errorMiddleware } from './middleware/error.middleware'

export default class Server {
	public PORT: number

	public app: Express

	constructor(port: number) {
		this.app = express()
		this.PORT = port
	}

	public initialize() {
		this.initMiddleware()
		this.initRoutes()
		this.initErrorMiddleware()
	}

	private initMiddleware() {
		this.app.use(helmet())
		this.app.use(express.json())
	}

	private initRoutes() {
		this.app.use('/', (req, res) => {
			res.json(3333)
		})
	}

	private initErrorMiddleware() {
		this.app.use(errorMiddleware)
	}
}
