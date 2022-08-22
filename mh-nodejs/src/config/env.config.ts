import * as dotenv from 'dotenv'
import os from 'os'

dotenv.config()

const Env = {
	server: {
		ADDRESS: Object.values(os.networkInterfaces()).flat().find((item) => item.family === 'IPv4')?.address,
		PORT: Number(process.env.PORT) || 8888,
	},
	mySql: {
		host: process.env.MYSQL_HOST,
		port: Number(process.env.MYSQL_PORT),
		database: process.env.MYSQL_DATABASE,
		username: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD || '',
	},
	email: {
		service: process.env.EMAIL_SERVICE,
		username: process.env.EMAIL_USERNAME,
		password: process.env.EMAIL_PASSWORD,
	},
	jwt: {
		accessKey: process.env.JWT_ACCESS_KEY,
		refreshKey: process.env.JWT_REFRESH_KEY,
		accessTime: Number(process.env.JWT_ACCESS_TIME),
		refreshTime: Number(process.env.JWT_REFRESH_TIME),
	},
}

export default Env
