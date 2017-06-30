import * as models from './models/index.js';
import { AtlasSDKClient, fetchEndpoint } from './api/atlas_sdk_client.js';
import { Config } from './models/config_models';

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
   *   is_sandBox: true
   * });
   */
  configure(options = {}) {
    const env = options.is_sandbox ? 'staging' : 'production';
    const url = `https://atlas-config-api.dc.zalan.do/api/config/${options.client_id}-${env}.json`;

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

    return fetchEndpoint(ConfigEndpoint).then(config => {
      return new AtlasSDKClient(config);
    });
  }
};

export default Object.assign({}, AtlasSDK, models);
