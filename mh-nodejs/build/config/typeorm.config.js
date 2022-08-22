"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlSource = void 0;
const typeorm_1 = require("typeorm");
const env_config_1 = __importDefault(require("./env.config"));
const MySqlSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: env_config_1.default.mySql.host,
    port: env_config_1.default.mySql.port,
    database: env_config_1.default.mySql.database,
    username: env_config_1.default.mySql.username,
    password: env_config_1.default.mySql.password,
    entities: ['build/mysql/entity/*.js'],
    synchronize: false,
    logging: true,
});
exports.MySqlSource = MySqlSource;
