"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const error_middleware_1 = require("./middleware/error.middleware");
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.PORT = port;
    }
    initialize() {
        this.initMiddleware();
        this.initRoutes();
        this.initErrorMiddleware();
    }
    initMiddleware() {
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
    }
    initRoutes() {
        this.app.use('/', (req, res) => {
            res.json(3333);
        });
    }
    initErrorMiddleware() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
}
exports.default = Server;
