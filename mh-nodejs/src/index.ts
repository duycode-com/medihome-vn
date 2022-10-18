import Env from './config/env.config'
import { MySqlSource } from './config/typeorm.config'
import Server from './server'
import ErrorUtils from './utils/error.utils'
import Logger from './utils/logger.utils'

Logger.config({
	folder: 'logs',
	filePattern: 'YYYY-MM/YYYY-MM-DD',
	timePattern: 'YYYY-DD-MM hh:mm:ss',
	hasConsole: true,
	hasFile: true,
})

const start = async () => {
	try {
		await MySqlSource.initialize()
		Logger.info(`🚀 MySQL listening at: ${Env.mySql.host}:${Env.mySql.port}`)
	} catch (error) {
		Logger.error(new ErrorUtils(500, 'MYSQL_CONNECT_FAIL', error.message))
	}

	const server = new Server(Env.server.CONTAINER_PORT)
	server.initialize()

	server.app.listen(Env.server.CONTAINER_PORT, () => {
		Logger.info(`🚀 Server listening at: http://${Env.server.ADDRESS}:${Env.server.DOCKER_PORT}`)
	})
}

start()
