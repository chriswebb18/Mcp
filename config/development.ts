import { Config } from './types';
import defaultConfig from './default';

const developmentConfig: Config = {
  ...defaultConfig,
  server: {
    ...defaultConfig.server,
    logLevel: 'debug',
  },
  mcp: {
    ...defaultConfig.mcp,
    debugMode: true,
  },
};

export default developmentConfig;