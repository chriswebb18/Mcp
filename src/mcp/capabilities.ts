import { Capability } from './types';
import config from '../../config';
import { TypeSpecReader } from '../utils/typespec-reader';
import logger from '../utils/logger';

/**
 * MCP Capabilities provider class
 * Responsible for providing the capabilities of the MCP server
 */
export class CapabilitiesProvider {
  private typeSpecReader: TypeSpecReader;
  private configCapabilities: Capability[];
  
  constructor() {
    this.typeSpecReader = new TypeSpecReader();
    this.configCapabilities = config.mcp.capabilities || [];
  }
  
  /**
   * Get all available capabilities
   * Combines capabilities from config and TypeSpec definitions
   * @returns Array of capabilities
   */
  getCapabilities(): Capability[] {
    let capabilities: Capability[] = [...this.configCapabilities];
    
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
        } else {
          // Add new capability
          capabilities.push(capability);
        }
      }
    } catch (error) {
      logger.error('Error extracting capabilities from TypeSpec', error instanceof Error ? error : new Error('Unknown error'));
    }
    
    logger.debug(`Capabilities loaded: ${capabilities.length}`, {
      capabilities: capabilities.map(c => c.name).join(', '),
    });
    
    return capabilities;
  }
}

// Export singleton instance
export const capabilitiesProvider = new CapabilitiesProvider();

export default capabilitiesProvider;