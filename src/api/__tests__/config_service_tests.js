import test from 'ava';
import AtlasSDK from '../../index';
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
  t.is(sdk.config.recommendations[0].location, 'my_app_pdp');
  t.is(sdk.config.recommendations[0].type, 'similar');
  t.is(sdk.config.recommendations[0].channel, 'myapp');

});

test('Should return current locale, language and country code according to Sales Channel', async t => {
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
  t.is(sdk.getCountryCode(), 'DE');
  t.is(sdk.getConfig().clientId, 'CLIENT_ID');
  t.is(sdk.getConfig().salesChannel, 'SALES_CHANNEL');

});

test('Should override language', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true,
    lang: 'en'
  }).catch(error => {
    t.fail(error);
  });

  t.is(sdk.getLocale(), 'de_DE');
  t.is(sdk.getLanguage(), 'en');
  t.is(sdk.getCountryCode(), 'DE');
  t.is(sdk.getConfig().clientId, 'CLIENT_ID');
  t.is(sdk.getConfig().salesChannel, 'SALES_CHANNEL');

});

test.afterEach.always(() => {
  fetchMock.restore();
});
