import * as models from './models/index.js';
import { AtlasSDKClient, fetchEndpoint } from './api/atlas_sdk_client.js';
import { Config } from './models/config_models';

const ENVIRONMENTS = ['development', 'staging', 'production'];

const isValidEnv = (type) => ENVIRONMENTS.indexOf(type) !== -1; /* eslint no-magic-numbers: [0] */

/**
 * AtlasSDK is a global namespace.
 * @namespace AtlasSDK
 * @public
 * @static
 */
const AtlasSDK = {

  /**
   * Configure AtlasSDK. This is the main entry point to use the AtlasSDK.
   *
   * @memberof AtlasSDK
   * @method configure
   * @static
   * @public
   * @param {Object} options An object containing configiration data: <br />
   *  <ul>
   *    <li>{String} client_id Client Id of a partner</li>
   *    <li>{String} sales_channel Sales Channel assigned for a partner</li>
   *    <li>{boolean} is_sandbox Indicates sandbox mode (default <i>false</i>)</li>
   *  </ul>
   * @return {Promise<AtlasSDKClient>} a promise resolving with an {@link AtlasSDKClient} object
   * @example {@lang javascript}
   * const sdk = await AtlasSDK.configure({
   *   client_id: 'CLIENT_ID',
   *   sales_channel: 'SALES_CHANNEL',
   *   environment: 'dev',
   *   mocks: mocks
   * });
   */
  configure(options = {}) {
    const env = options.environment;
    const mocks = options.mocks;

    if (!isValidEnv(env)) {
      throw new Error('Please choose one of the available environments: "development", "staging", "production"');
    }

    const url = `https://atlas-config-api.dc.zalan.do/api/config/${options.client_id}-${env}.json`;

    if (env === 'development') {
      if (!mocks) {
        throw new Error('Please provide a mocks service through "options.mocks"');
      }

      if (!mocks.fetch) {
        throw new Error('The mocks service must expose a "fetch" method');
      }

      const mockConfig = mocks.fetch('config');

      return Promise.resolve(new AtlasSDKClient(new Config(Object.assign(mockConfig, options)), { mocks }));
    }

    const ConfigEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      transform: (response) => {
        return new Config(Object.assign(response, options));
      }
    };

    return fetchEndpoint(ConfigEndpoint).then(config => {
      return new AtlasSDKClient(config);
    });
  }
};

export default Object.assign(AtlasSDK, models);
export { AtlasSDKClient };
