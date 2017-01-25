/* eslint no-magic-numbers : 0 */
import test from 'ava';
import fetchMock from 'fetch-mock';
import AtlasSDK from '../../index.js';

const fs = require('fs');
const path = require('path');

const RecommendedJSON = fs.readFileSync(path.join(__dirname, 'data/recommendation_service_response.json'), 'utf8');
const configJson = fs.readFileSync(path.join(__dirname, 'data/config_service_response.json'), 'utf8');

test('Article should be initialized from JSON object', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);

  const url = 'https://catalog_api.com/api/articles/AD112B0F6-A11/recommendations/?client_id=CLIENT_ID';

  fetchMock.get(url, RecommendedJSON);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  });

  const recommendedArticles = await sdk.getRecommendations('AD112B0F6-A11');

  const imgurl = 'https://i3.ztat.net/catalog/ZA/88/2F/A0/1A/11/ZA882FA01-A11@4.1.jpg';

  t.is(recommendedArticles[0].id, 'ZA882FA01-A11');
  t.is(recommendedArticles[0].brand.name, 'Zalando Essentials');
  t.is(recommendedArticles[0].name, '5 PACK - Socken - white');
  t.is(recommendedArticles[0].lowestPrice.amount, 11.95);
  t.is(recommendedArticles[0].lowestPrice.currency, 'EUR');
  t.is(recommendedArticles[0].media.images[0].catalog, imgurl);

});
