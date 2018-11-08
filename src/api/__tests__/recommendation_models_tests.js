/* eslint no-magic-numbers : 0 */
import test from 'ava';
import fetchMock from 'fetch-mock';
import AtlasSDK from '../../index';

const fs = require('fs');
const path = require('path');

const recommendedJSON = fs.readFileSync(path.join(__dirname, 'data/recommendation_service_response.json'), 'utf8');
const recommendedBrandJSON = fs.readFileSync(path.join(__dirname,
  'data/recommendation_service_response_for_brand.json'), 'utf8');
const recommendedBrandFilteredJSON = fs.readFileSync(path.join(__dirname,
  'data/recommendation_service_response_for_brand_filter.json'), 'utf8');
const configJson = fs.readFileSync(path.join(__dirname, 'data/config_service_response.json'), 'utf8');

test('Recommended articles should be initialized from JSON object', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);

  const url = 'https://catalog_api.com/api/articles/AD112B0F6-A11/recommendations/?client_id=CLIENT_ID&anon_id=1234';

  fetchMock.get(url, recommendedJSON);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  });

  const recommendedArticles = await sdk.getRecommendations('AD112B0F6-A11',
    {
      reco_id: '1234',
      tracking_string: 'TRACKING_STRING'
    }
  );

  const imgURL = 'https://mosaic01.ztat.net/vgs/media/large/SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg';

  t.is(recommendedArticles[0].id, 'SO254J000-C00');
  t.is(recommendedArticles[0].brand.name, 's.Oliver');
  t.is(recommendedArticles[0].name, '6 PACK - Socken - anthracite/grey');
  t.is(recommendedArticles[0].lowestPrice.amount, 15.95);
  t.is(recommendedArticles[0].lowestPrice.currency, 'EUR');
  t.is(recommendedArticles[0].images.length, 7);
  t.is(recommendedArticles[0].images[0].type, 'IMAGE_PARTNER');
  t.is(recommendedArticles[0].images[0].mediaCharacter, 'UNSPECIFIED');
  t.is(recommendedArticles[0].images[0].resolutions.large, imgURL);
  t.is(recommendedArticles[0].images[1].type, 'IMAGE');
  t.is(recommendedArticles[0].images[1].mediaCharacter, 'UNSPECIFIED');
  t.is(recommendedArticles[0].images[1].resolutions.large, imgURL);
  t.falsy(recommendedArticles[recommendedArticles.length - 1].trackingString);
});

test('Recommended same brand articles should be initialized from JSON object', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);

  const url = 'https://catalog_api.com/api/articles/AD112B0F6-A11/recommendations/?client_id=CLIENT_ID&anon_id=12345';

  fetchMock.get(url, recommendedBrandJSON);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  });

  const recommendedArticles = await sdk.getRecommendations('AD112B0F6-A11',
    {
      type: 'brand',
      reco_id: '12345',
      tracking_string: 'TRACKING_STRING'
    }
  );

  const imgURL = 'https://mosaic01.ztat.net/vgs/media/large/SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg';

  t.is(recommendedArticles[0].id, 'SO254J000-C00');
  t.is(recommendedArticles[0].brand.name, 's.Oliver');
  t.is(recommendedArticles[0].name, '6 PACK - Socken - anthracite/grey');
  t.is(recommendedArticles[0].lowestPrice.amount, 15.95);
  t.is(recommendedArticles[0].lowestPrice.currency, 'EUR');
  t.is(recommendedArticles[0].images.length, 7);
  t.is(recommendedArticles[0].images[0].type, 'IMAGE_PARTNER');
  t.is(recommendedArticles[0].images[0].mediaCharacter, 'UNSPECIFIED');
  t.is(recommendedArticles[0].images[0].resolutions.large, imgURL);
  t.is(recommendedArticles[0].images[1].type, 'IMAGE');
  t.is(recommendedArticles[0].images[1].mediaCharacter, 'UNSPECIFIED');
  t.is(recommendedArticles[0].images[1].resolutions.large, imgURL);
  t.falsy(recommendedArticles[recommendedArticles.length - 1].trackingString);
});

test('Recommended cross sell articles with brand code filter should be initialized from JSON object', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);

  const url = 'https://catalog_api.com/api/articles/AD112B0F6-A11/recommendations/?client_id=CLIENT_ID&anon_id=12345&filters=brand_code:BRAND1;BRAND2'; /* eslint max-len: 0 */

  fetchMock.get(url, recommendedBrandFilteredJSON);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  });

  const recommendedArticles = await sdk.getRecommendations('AD112B0F6-A11',
    {
      type: 'cross',
      reco_id: '12345',
      filters: {
        brand_code: ['BRAND1', 'BRAND2']
      }
    }
  );

  const imgURL = 'https://mosaic01.ztat.net/vgs/media/large/SO/25/4J/00/0C/00/SO254J000-C00@1.1.jpg';

  t.is(recommendedArticles[0].id, 'SO254J000-C00');
  t.is(recommendedArticles[0].brand.name, 'YOURTURN');
  t.is(recommendedArticles[0].name, '6 PACK - Socken - anthracite/grey');
  t.is(recommendedArticles[0].lowestPrice.amount, 15.95);
  t.is(recommendedArticles[0].lowestPrice.currency, 'EUR');
  t.is(recommendedArticles[0].images.length, 7);
  t.is(recommendedArticles[0].images[0].type, 'IMAGE_PARTNER');
  t.is(recommendedArticles[0].images[0].mediaCharacter, 'UNSPECIFIED');
  t.is(recommendedArticles[0].images[0].resolutions.large, imgURL);
  t.is(recommendedArticles[0].images[1].type, 'IMAGE');
  t.is(recommendedArticles[0].images[1].mediaCharacter, 'UNSPECIFIED');
  t.is(recommendedArticles[0].images[1].resolutions.large, imgURL);
});

