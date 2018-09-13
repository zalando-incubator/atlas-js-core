import test from 'ava';
import fetchMock from 'fetch-mock';
import AtlasSDK from '../../index';

const fs = require('fs');
const path = require('path');
const articleJson = fs.readFileSync(path.join(__dirname, 'data/catalog_service_get_article_response.json'), 'utf8');
const articlesJson = fs.readFileSync(
  path.join(__dirname, 'data/catalog_service_get_articles_response.json'),
  'utf8',
);
const configJson = fs.readFileSync(path.join(__dirname, 'data/config_service_response.json'), 'utf8');

test('Should fetch article successfully after configuring SDK', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);
  fetchMock.get('https://catalog_api.com/api/articles/AD112B0F6-A11?client_id=CLIENT_ID', articleJson);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  });

  const article = await sdk.getArticle('AD112B0F6-A11');

  t.is(article.id, 'AD112B0F6-A11');
  t.is(article.name, 'LOS ANGELES - Trainers - white');
  t.is(article.attributes[0].name, 'Lining');
  t.is(article.attributes[0].category, 'material');
  t.is(article.attributes[0].subCategory, 'lining');
  t.is(article.attributes[0].values[0], 'textile');
  t.is(article.enrichmentAttributes[0].key, 'assortment_area');
  t.is(article.enrichmentAttributes[0].value[0], 'STANDARD');
  t.is(article.targetGroups.gender[1], 'FEMALE');
  t.is(article.targetGroups.age[0], 'ADULT');
  t.is(article.targetGroups.domain[0], 'DEFAULT');
  t.is(article.targetGroups.ageRange[1], 'Teens');
  t.is(article.infos[0], 'Removable cover sole');
});

test('Should fetch articles successfully after configuring SDK', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);
  fetchMock.get(
    'https://catalog_api.com/api/articles?config_skus=AD112B0F6-A11,SO254C009-K12&client_id=CLIENT_ID',
    articlesJson,
  );

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  });

  const articles = await sdk.getArticles('AD112B0F6-A11,SO254C009-K12');

  t.is(articles[0].id, 'AD112B0F6-A11');
  t.is(articles[0].name, 'LOS ANGELES - Trainers - white');
  t.is(articles[0].attributes[0].name, 'Lining');
  t.is(articles[0].attributes[0].values[0], 'textile');
  t.is(articles[0].infos[0], 'Removable cover sole');
  t.is(articles[1].id, 'SO254C009-K12');
  t.is(articles[1].name, '8 PACK - Socken - stone mix');
  t.is(articles[1].attributes[2].name, 'Muster');
  t.is(articles[1].attributes[2].values[0], 'meliert');
});

test.afterEach.always(() => {
  fetchMock.restore();
});
