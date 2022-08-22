"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const time_utils_1 = __importDefault(require("./time.utils"));
class LoggerUtils {
    constructor() {
        this.folder = 'logs';
        this.filePath = '';
        this.filePattern = 'YYYY-MM/YYYY-MM-DD';
        this.timePattern = 'YYYY-MM-DD hh:mm:ss';
        this.hasConsole = true;
        this.hasFile = true;
        this.colorize = {
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
        };
        this.config = (options) => {
            if ('folder' in options)
                this.folder = options.folder;
            if ('filePattern' in options)
                this.filePattern = options.filePattern;
            if ('timePattern' in options)
                this.timePattern = options.timePattern;
            if ('hasConsole' in options)
                this.hasConsole = options.hasConsole;
            if ('hasFile' in options)
                this.hasFile = options.hasFile;
        };
        this.info = (message) => this.init(message, 'info');
        this.notify = (message) => this.init(message, 'notify');
        this.warn = (message) => this.init(message, 'warn');
        this.error = (e) => {
            const time = time_utils_1.default.timeToText(new Date(), this.timePattern);
            const { reset } = this.colorize;
            const color = this.colorize.red;
            const stack = this.formatStack(e.stack);
            if (this.hasConsole) {
                const labelColor = `${color}[${time}] [ERROR]: StatusCode ${e.statusCode}, ErrorCode ${e.errorCode}${reset}`;
                console.error(labelColor, `\n${stack}`);
            }
            if (this.hasFile) {
                const labelBasic = `[${time}] [ERROR]: StatusCode ${e.statusCode}, ErrorCode ${e.errorCode}`;
                this.writeFile(labelBasic, `\n${stack}`);
            }
        };
        this.fatal = (message) => this.init(message, 'fatal');
        this.init = (message, type) => {
            const time = time_utils_1.default.timeToText(new Date(), this.timePattern);
            const { bold, reset } = this.colorize;
            let color;
            if (type === 'info')
                color = this.colorize.blue;
            if (type === 'notify')
                color = this.colorize.green;
            if (type === 'warn')
                color = this.colorize.yellow;
            if (type === 'fatal')
                color = this.colorize.magenta;
            if (this.hasConsole) {
                const labelColor = `${color}[${time}] ${bold}[${type.toUpperCase()}]:${reset}`;
                console.log(labelColor, message);
            }
            if (this.hasFile) {
                const labelBasic = `[${time}] [${type.toUpperCase()}]:`;
                this.writeFile(labelBasic, message);
            }
        };
        this.writeFile = (info, message) => {
            const fileCurrent = time_utils_1.default.timeToText(new Date(), this.filePattern) + '.log';
            const filePath = path_1.default.resolve(this.folder, fileCurrent);
            const data = `${info} ${message}\n`;
            if (this.filePath !== filePath) {
                const fileDir = path_1.default.dirname(filePath);
                if (!fs_1.default.existsSync(fileDir)) {
                    fs_1.default.mkdirSync(fileDir, { recursive: true });
                }
                this.filePath = filePath;
                this.writeStream = fs_1.default.createWriteStream(this.filePath, { flags: 'a' });
            }
            this.writeStream.write(data);
        };
        this.formatStack = (stack) => {
            const lineList = stack.split('\n');
            let result = lineList[0] || '';
            for (let i = 1; i < lineList.length; i += 1) {
                if (/dist|src/.test(lineList[i])) {
                    result += '\n' + lineList[i];
                }
            }
            return result;
        };
    }
}
const Logger = new LoggerUtils();
exports.default = Logger;
