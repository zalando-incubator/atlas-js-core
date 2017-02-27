import test from 'ava';
import AtlasSDK from '../../index.js';
import fetchMock from 'fetch-mock';

const fs = require('fs');
const path = require('path');
const configJson = fs.readFileSync(path.join(__dirname, 'data/config_service_response.json'), 'utf8');

test('Should configure AtlasSDK successfully', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  }).catch(error => {
    t.fail(error);
  });

  t.is(sdk.config.catalogApi.url, 'https://catalog_api.com/api');
  t.is(sdk.config.atlasCheckoutGateway.url, 'https://atlas-checkout-gateway.com');
  t.is(sdk.config.recommendation.location, 'my_app_pdp');
  t.is(sdk.config.recommendation.type, 'similar');
  t.is(sdk.config.recommendation.channel, 'myapp');

});

test('Should return current locale and language according to Sales Channel', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  }).catch(error => {
    t.fail(error);
  });

  t.is(sdk.getLocale(), 'de_DE');
  t.is(sdk.getLanguage(), 'de');
});

test.afterEach.always(() => {
  fetchMock.restore();
});
