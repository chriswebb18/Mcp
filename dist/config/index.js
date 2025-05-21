"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
const default_1 = __importDefault(require("./default"));
const development_1 = __importDefault(require("./development"));
const production_1 = __importDefault(require("./production"));
/**
 * Get the configuration based on the current environment
 * @returns Configuration object
 */
function getConfig() {
    const env = process.env.NODE_ENV || 'development';
    switch (env) {
        case 'production':
            return production_1.default;
        case 'development':
            return development_1.default;
        default:
            return default_1.default;
    }
}
// Export the configuration
const config = getConfig();
exports.default = config;
