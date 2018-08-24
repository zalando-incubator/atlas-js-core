import test from 'ava';
import fetchMock from 'fetch-mock';
import AtlasSDK from '../../index';

const fs = require('fs');
const path = require('path');
const json = fs.readFileSync(path.join(__dirname, 'data/catalog_families_response.json'), 'utf8');
const configJson = fs.readFileSync(path.join(__dirname, 'data/config_service_response.json'), 'utf8');

test('Should fetch article successfully after configuring SDK', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);
  fetchMock.get('https://catalog_api.com/api/article-families/AD112B0F6-A11?client_id=CLIENT_ID', json);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  });

  const articleFamilies = await sdk.getArticleFamilies('AD112B0F6-A11');

  t.is(articleFamilies[0].id, 'AN621D0BX-K11');
  t.is(articleFamilies[0].color, 'dunkelblau');
  t.is(articleFamilies[0].images[0].resolutions.thumbnail,
    'https://mosaic01.ztat.net/vgs/media/pdp-thumb/AN/62/1D/0B/XK/11/AN621D0BX-K11@2.png');


  t.is(articleFamilies[1].id, 'AN621D0BX-Q11');
  t.is(articleFamilies[1].color, 'schwarz');
  t.is(articleFamilies[1].images[0].resolutions.thumbnail,
    'https://mosaic01.ztat.net/vgs/media/pdp-thumb/AN/62/1D/0B/XQ/11/AN621D0BX-Q11@10.jpg');


});

test.afterEach.always(() => {
  fetchMock.restore();
});
