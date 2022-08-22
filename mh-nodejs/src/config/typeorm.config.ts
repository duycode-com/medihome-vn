import { DataSource } from 'typeorm'
import Env from './env.config'

const MySqlSource = new DataSource({
	type: 'mysql',
	host: Env.mySql.host,
	port: Env.mySql.port,
	database: Env.mySql.database,
	username: Env.mySql.username,
	password: Env.mySql.password,
	entities: ['build/mysql/entity/*.js'],
	synchronize: false,
	logging: true,
})

export { MySqlSource }
