/* eslint no-magic-numbers : 0 */
import test from 'ava';
import { Article } from '../catalog_api_models.js';

test('Article should be initialized from JSON object', t => {
  const json = {
    id: 'AD112B0F6-A11',
    name: 'LOS ANGELES - Trainers - white',
    color: 'Orange',
    brand: {
      name: 'Adidas'
    },
    units: [
      {
        id: 'AD112B0F6-A110135000',
        size: 'M',
        price: {
          amount: 99.95,
          currency: 'EUR'
        },
        original_price: {
          amount: 99.95,
          currency: 'EUR'
        },
        available: true,
        partner: {
          id: '123',
          name: 'Adidas',
          detail_url: 'https://www.zalando.de/adidas-originals-los-angeles-sneaker-ad112b0f6-a11.html'
        }
      }
    ],
    media: {
      media_items: [
        {
          order: 1,
          catalog: 'https://i6.ztat.net/catalog/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          catalog_hd: 'https://i6.ztat.net/catalog_hd/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          detail: 'https://i6.ztat.net/detail/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          detail_hd: 'https://i6.ztat.net/detail_hd/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          large: 'https://i6.ztat.net/large/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          large_hd: 'https://i6.ztat.net/large_hd/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg'
        }
      ]
    },
    infos: [
      'Removable cover sole'
    ],
    reviews: {
      summary: {
        total: 45,
        rating: {
          average: 4.5851064,
          distribution: [{
            level: '5',
            count: 69
          }, {
            level: '4',
            count: 18
          }, {
            level: '3',
            count: 3
          }, {
            level: '2',
            count: 1
          }, {
            level: '1',
            count: 3
          }]
        },
        recommendations: {
          total: 30,
          positive: 25
        }
      },
      entries: [
        {
          name: 'John',
          title: 'Loved it!',
          description: 'The best sneakers I ever bought! :)',
          rating: 5,
          recommends: true,
          created: '2015-04-21T13:27:31+01:00'
        }
      ]
    }
  };

  const article = new Article(json);

  const testStock = 3;
  const testPartnerId = '123';

  t.is(article.id, 'AD112B0F6-A11');
  t.is(article.color, 'Orange');
  t.is(article.units[0].size, 'M');
  if (article.units[0].stock) {
    t.is(article.units[0].stock, testStock);
  }
  t.is(article.units[0].partner.id, testPartnerId);
  if (article.media) {
    t.is(article.media.images[0].catalog, 'https://i6.ztat.net/catalog/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg');
  }
  if (article.attributes) {
    t.is(article.attributes[0].name, 'Internal material');
    t.is(article.attributes[0].values[0], 'textile');
  }
  t.is(article.infos[0], 'Removable cover sole');
  t.is(article.reviews.entries.length, 1);
  t.is(article.reviews.summary.total, 45);
  t.is(article.reviews.summary.rating.average, 4.5851064);
  t.is(article.reviews.summary.rating.distribution.length, 5);
  t.is(article.reviews.summary.rating.distribution[0].level, '5');
  t.is(article.reviews.summary.rating.distribution[0].count, 69);
  t.is(article.reviews.summary.recommendations.total, 30);
  t.is(article.reviews.summary.recommendations.positive, 25);
  t.is(article.reviews.entries[0].name, 'John');
  t.is(article.reviews.entries[0].title, 'Loved it!');
  t.is(article.reviews.entries[0].description, 'The best sneakers I ever bought! :)');
  t.is(article.reviews.entries[0].rating, 5);
  t.is(article.reviews.entries[0].recommends, true);
  t.is(article.reviews.entries[0].created, '2015-04-21T13:27:31+01:00');
});

test('Article should be initialized from JSON object with optional fields', t => {
  const json = {
    id: 'AD112B0F6-A11',
    name: 'LOS ANGELES - Trainers - white',
    color: 'Orange',
    brand: {
      name: 'Adidas'
    },
    units: [
      {
        id: 'AD112B0F6-A110135000',
        size: 'M',
        price: {
          amount: 99.95,
          currency: 'EUR'
        },
        original_price: {
          amount: 99.95,
          currency: 'EUR'
        },
        available: true,
        stock: 3,
        partner: {
          id: '123',
          name: 'Adidas',
          detail_url: 'https://www.zalando.de/adidas-originals-los-angeles-sneaker-ad112b0f6-a11.html'
        }
      }
    ],
    media: {
      media_items: [
        {
          order: 1,
          catalog: 'https://i6.ztat.net/catalog/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          catalog_hd: 'https://i6.ztat.net/catalog_hd/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          detail: 'https://i6.ztat.net/detail/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          detail_hd: 'https://i6.ztat.net/detail_hd/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          large: 'https://i6.ztat.net/large/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          large_hd: 'https://i6.ztat.net/large_hd/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg'
        }
      ]
    }
  };

  const article = new Article(json);

  const testStock = 3;
  const testPartnerId = '123';

  t.is(article.id, 'AD112B0F6-A11');
  t.is(article.color, 'Orange');
  t.is(article.units[0].size, 'M');
  t.is(article.units[0].stock, testStock);
  t.is(article.units[0].partner.id, testPartnerId);
  t.is(article.media.images[0].catalog, 'https://i6.ztat.net/catalog/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg');
  t.is(article.attributes, undefined);
  t.is(article.infos, undefined);
  t.is(article.reviews, undefined);
});
