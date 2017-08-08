import test from 'ava';
import AtlasSDK from '../../index';
import AtlasMocks from 'atlas-mocks';

/* eslint no-magic-numbers: 0 */

test('Should load config', async t => {
  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    environment: 'development',
    mocks: AtlasMocks
  });

  const config = sdk.config;

  t.truthy(config.catalogApi);
  t.truthy(config.atlasCheckoutGateway);
  t.truthy(config.salesChannels);
  t.truthy(config.recommendations);
  t.is(config.clientId, 'CLIENT_ID');
  t.is(config.salesChannel, 'SALES_CHANNEL');
  t.is(config.environment, 'development');
});

test('Should get article', async t => {
  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    environment: 'development',
    mocks: AtlasMocks
  });

  const article = await sdk.getArticle('DP521C129-Q11');

  const thumbnail = 'https://mosaic01.ztat.net/vgs/media/pdp-thumb/DP/52/1C/12/9Q/11/DP521C129-Q11@10.jpg';

  t.is(article.id, 'DP521C129-Q11');
  t.is(article.name, 'Jerseykleid - black');
  t.is(article.brand.name, 'Dorothy Perkins');
  t.is(article.attributes[0].name, 'Material Oberstoff');
  t.is(article.attributes[0].values[0], '96% Baumwolle, 4% Elasthan');
  t.is(article.images[0].mediaCharacter, 'NON_MODEL');
  t.is(article.images[0].resolutions.thumbnail, thumbnail);
});

test('Should get recommendations', async t => {
  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    environment: 'development',
    mocks: AtlasMocks
  });

  const recos = await sdk.getRecommendations('DP521C129-Q11');

  const firstReco = recos[0];

  t.is(recos.length, 10);

  t.is(firstReco.id, 'DP521C0XN-A11');
  t.is(firstReco.name, 'Jerseykleid - ivory');
  t.is(firstReco.brand.name, 'Dorothy Perkins');
});
