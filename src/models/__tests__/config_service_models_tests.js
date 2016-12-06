import test from 'ava';
import { SalesChannel, Config } from '../config_models.js';

test('SalesChannel should be initialized from JSON object', t => {
  const json = {
    locale: 'de_DE',
    'sales-channel': '11111111-1111-1111-1111-111111111111',
    toc_url: 'https://m.zalando.de/agb/'
  };
  const salesChannel = new SalesChannel(json);

  t.is(salesChannel.locale, 'de_DE');
  t.is(salesChannel.channel, '11111111-1111-1111-1111-111111111111');
  t.is(salesChannel.tocURL, 'https://m.zalando.de/agb/');
});

test('SalesChannel should fail type validation', (t) => {
  const json = {
    locale: 1,
    'sales-channel': '11111111-1111-1111-1111-111111111111',
    toc_url: 'https://m.zalando.de/agb/'
  };

  t.throws(() => new SalesChannel(json));
});

test('Config should be initialized from JSON object', t => {
  const json = {
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true,
    'atlas-catalog-api': {
      url: 'https://catalog_api.com/api'
    },
    'atlas-checkout-api': {
      payment: {
        'selection-callback': 'http://atlas.atlasDemo/redirect',
        'third-party-callback': 'http://atlas.atlasDemo/redirect'
      },
      url: 'https://checkout_api.com/api'
    },
    'atlas-checkout-gateway': {
      url: 'https://atlas-checkout-gateway.com'
    },
    'oauth2-provider': {
      url: 'https://oauth2_provider.com/api'
    },
    'sales-channels': [{
      locale: 'de_DE',
      'sales-channel': '11111111-1111-1111-1111-111111111111',
      toc_url: 'https://m.zalando.de/agb/'
    }]
  };

  const config = new Config(json);

  t.is(config.clientId, 'CLIENT_ID');
  t.is(config.salesChannel, 'SALES_CHANNEL');
  t.is(config.isSandbox, true);
  t.is(config.catalogApi.url, 'https://catalog_api.com/api');
  t.is(config.atlasCheckoutGateway.url, 'https://atlas-checkout-gateway.com');
  t.is(config.salesChannels[0].locale, 'de_DE');
  t.is(config.salesChannels[0].channel, '11111111-1111-1111-1111-111111111111');
  t.is(config.salesChannels[0].tocURL, 'https://m.zalando.de/agb/');
});
