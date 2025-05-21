import { Config } from './types';
import defaultConfig from './default';
import developmentConfig from './development';
import productionConfig from './production';

/**
 * Get the configuration based on the current environment
 * @returns Configuration object
 */
export function getConfig(): Config {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return productionConfig;
    case 'development':
      return developmentConfig;
    default:
      return defaultConfig;
  }
}

// Export the configuration
const config = getConfig();
export default config;