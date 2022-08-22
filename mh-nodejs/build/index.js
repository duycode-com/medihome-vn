"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("./config/env.config"));
const typeorm_config_1 = require("./config/typeorm.config");
const server_1 = __importDefault(require("./server"));
const error_utils_1 = __importDefault(require("./utils/error.utils"));
const logger_utils_1 = __importDefault(require("./utils/logger.utils"));
logger_utils_1.default.config({
    folder: 'logs',
    filePattern: 'YYYY-MM/YYYY-MM-DD',
    timePattern: 'YYYY-DD-MM hh:mm:ss',
    hasConsole: true,
    hasFile: true,
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_config_1.MySqlSource.initialize();
        logger_utils_1.default.info(`🚀 MySQL listening at: ${env_config_1.default.mySql.host}:${env_config_1.default.mySql.port}`);
    }
    catch (error) {
        logger_utils_1.default.error(new error_utils_1.default(500, 'MYSQL_CONNECT_FAIL', error.message));
    }
    const server = new server_1.default(env_config_1.default.server.PORT);
    server.initialize();
    server.app.listen(env_config_1.default.server.PORT, () => {
        logger_utils_1.default.info(`🚀 Server listening at: http://${env_config_1.default.server.ADDRESS}:${env_config_1.default.server.PORT}`);
    });
});
start();
