"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = __importDefault(require("./default"));
const developmentConfig = {
    ...default_1.default,
    server: {
        ...default_1.default.server,
        logLevel: 'debug',
    },
    mcp: {
        ...default_1.default.mcp,
        debugMode: true,
    },
};
exports.default = developmentConfig;
