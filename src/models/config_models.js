import createModel from './base_model';

/**
* @class SalesChannel class struct
* @param source {Object} - Initialisation object for SalesChannel
*/
const SalesChannel = createModel({
  locale: { key: 'locale', type: 'string' },
  channel: { key: 'sales-channel', type: 'string' },
  tocURL: { key: 'toc_url', type: 'string' }
});

/**
 * @class Recommendations class struct
 * @param source {Object} - Initialisation object for Recommendations
 */
const Recommendations = createModel({
  location: { key: 'location', type: 'string' },
  type: { key: 'type', type: 'string' },
  channel: { key: 'channel', type: 'string' }
});

/**
* @class Config class struct
* @param source {Object} - Initialisation object for Config
* @example {@lang javascript}
const source = {
  catalog_api_url: 'https://catalog_api.com/api',
  checkout_api_url: 'https://checkout_api.com/api',
  oauth2_provider_url: 'https://oauth2_provider.com/api',
  sales_channel: {
    locale: 'de_DE',
    channel: '11111111-1111-1111-1111-111111111111',
    toc_url: 'https://m.zalando.de/agb/'
  },
  recommendations: {
    location: 'my_app_pdp',
    type: 'similar',
    channel: 'myapp'
  }
};

const config = new Config(source);
*/
const Config = createModel({
  catalogApi: { key: 'atlas-catalog-api', type: 'object' },
  atlasCheckoutGateway: { key: 'atlas-checkout-gateway', type: 'object' },
  atlasCheckoutApi: { key: 'atlas-checkout-api', type: 'object' },
  salesChannels: { key: 'sales-channels', type: 'object', model: SalesChannel },
  clientId: { key: 'client_id', type: 'string' },
  salesChannel: { key: 'sales_channel', type: 'string' },
  recommendations: { key: 'recommendations', type: 'object', model: Recommendations },
  isSandbox: { key: 'is_sandbox', type: 'boolean' }
});

export { SalesChannel, Config };
