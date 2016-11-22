import test from 'ava';
import fetchMock from 'fetch-mock';
import AtlasSDK from '../../index.js';

const fs = require('fs');
const path = require('path');
const json = fs.readFileSync(path.join(__dirname, 'data/catalog_service_response.json'), 'utf8');
const configJson = fs.readFileSync(path.join(__dirname, 'data/config_service_response.json'), 'utf8');

test('Should fetch article successfully after configuring SDK', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);
  fetchMock.get('https://catalog_api.com/api/articles/AD112B0F6-A11?client_id=CLIENT_ID', json);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  });

  const article = await sdk.getArticle('AD112B0F6-A11');

  t.is(article.id, 'AD112B0F6-A11');
  t.is(article.name, 'LOS ANGELES - Trainers - white');
  t.is(article.attributes[0].name, 'Internal material');
  t.is(article.attributes[0].values[0], 'textile');
  t.is(article.infos[0], 'Removable cover sole');
});

test.afterEach.always(() => {
  fetchMock.restore();
});
