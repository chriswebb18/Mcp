"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capabilitiesProvider = exports.CapabilitiesProvider = void 0;
const config_1 = __importDefault(require("../../config"));
const typespec_reader_1 = require("../utils/typespec-reader");
const logger_1 = __importDefault(require("../utils/logger"));
/**
 * MCP Capabilities provider class
 * Responsible for providing the capabilities of the MCP server
 */
class CapabilitiesProvider {
    constructor() {
        this.typeSpecReader = new typespec_reader_1.TypeSpecReader();
        this.configCapabilities = config_1.default.mcp.capabilities || [];
    }
    /**
     * Get all available capabilities
     * Combines capabilities from config and TypeSpec definitions
     * @returns Array of capabilities
     */
    getCapabilities() {
        let capabilities = [...this.configCapabilities];
        try {
            // Try to extract capabilities from TypeSpec files
            const typeSpecCapabilities = this.typeSpecReader.extractCapabilities();
            // Merge capabilities, preferring TypeSpec ones for duplicates
            const existingNames = new Set(capabilities.map(c => c.name));
            for (const capability of typeSpecCapabilities) {
                if (existingNames.has(capability.name)) {
                    // Update existing capability
                    const index = capabilities.findIndex(c => c.name === capability.name);
                    capabilities[index] = capability;
                }
                else {
                    // Add new capability
                    capabilities.push(capability);
                }
            }
        }
        catch (error) {
            logger_1.default.error('Error extracting capabilities from TypeSpec', error instanceof Error ? error : new Error('Unknown error'));
        }
        logger_1.default.debug(`Capabilities loaded: ${capabilities.length}`, {
            capabilities: capabilities.map(c => c.name).join(', '),
        });
        return capabilities;
    }
}
exports.CapabilitiesProvider = CapabilitiesProvider;
// Export singleton instance
exports.capabilitiesProvider = new CapabilitiesProvider();
exports.default = exports.capabilitiesProvider;
