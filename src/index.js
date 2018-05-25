import * as models from './models/index.js';
import { AtlasSDKClient, fetchEndpoint } from './api/atlas_sdk_client.js';
import { Config } from './models/config_models';


/**
 * A temporary fix to handle the current high load capacity
 */
const configCache = {};

/**
 * AtlasSDK is a global namespace.
 * @module AtlasSDK
 * @public
 * @static
 */
const AtlasSDK = {

  /**
   * Configure AtlasSDK. This is the main entry point to use the AtlasSDK.
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
   * @example
   * const sdk = await AtlasSDK.configure({
   *   client_id: 'CLIENT_ID',
   *   sales_channel: 'SALES_CHANNEL',
   *   is_sandBox: true
   * });
   */
  configure(options = {}) {
    const env = options.is_sandbox ? 'staging' : 'production';
    const fileName = `${options.client_id}-${env}`;
    const url = `https://atlas-config-api.dc.zalan.do/api/config/${fileName}.json`;

    const ConfigEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      transform: (response) => {

        return new Config(Object.assign({}, response, options));
      }
    };

    if (configCache[fileName]) {
      return Promise.resolve(new AtlasSDKClient(configCache[fileName]));
    }
    return fetchEndpoint(ConfigEndpoint).then(config => {
      configCache[fileName] = config;
      return new AtlasSDKClient(config);
    });
  }
};

export default Object.assign({}, AtlasSDK, { AtlasSDKClient: AtlasSDKClient }, models);
