"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const os_1 = __importDefault(require("os"));
dotenv.config();
const Env = {
    server: {
        ADDRESS: (_a = Object.values(os_1.default.networkInterfaces()).flat().find((item) => item.family === 'IPv4')) === null || _a === void 0 ? void 0 : _a.address,
        DOCKER_PORT: Number(process.env.DOCKER_PORT) || 8888,
        CONTAINER_PORT: Number(process.env.CONTAINER_PORT) || 3000,
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
};
exports.default = Env;
