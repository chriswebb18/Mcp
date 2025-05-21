import { Config } from './types';
import defaultConfig from './default';

const productionConfig: Config = {
  ...defaultConfig,
  server: {
    ...defaultConfig.server,
    logLevel: 'info',
  },
  mcp: {
    ...defaultConfig.mcp,
    debugMode: false,
  },
};

export default productionConfig;