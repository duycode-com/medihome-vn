"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorUtils extends Error {
    constructor(statusCode, errorCode, ...params) {
        super(...params);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}
exports.default = ErrorUtils;
