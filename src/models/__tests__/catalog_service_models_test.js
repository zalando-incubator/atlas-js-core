/* eslint no-magic-numbers : 0 */
import test from 'ava';
import { Article } from '../catalog_api_models';

test('Article should be initialized from JSON object', t => {
  const json = {
    id: 'AD112B0F6-A11',
    name: 'LOS ANGELES - Trainers - white',
    color: 'Orange',
    silhouette_code: 'sneaker',
    supplier_color: 'white',
    product_group: 'shoe',
    brand: {
      name: 'Adidas'
    },
    detail_url: 'https://www.zalando.de/adidas-originals-los-angeles-sneaker-ad112b0f6-a11.html',
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
    images: [
      {
        type: 'IMAGE',
        resolutions: {
          detail: 'https://mosaic01.ztat.net/vgs/media/detail/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          thumbnail: 'https://mosaic01.ztat.net/vgs/media/pdp-thumb/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg',
          large: 'https://mosaic01.ztat.net/vgs/media/large/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg'
        },
        mediaCharacter: 'MODEL'
      }
    ],
    videos: [
      {
        type: 'VIDEO_THUMBNAIL',
        url: 'https://mosaic01.ztat.net/vgs/comet/LE/22/1N/02/PK/11/VIDEO/PREVIEW_IMG/1479494993512.jpg',
        mediaCharacter: 'UNKNOWN'
      }, {
        type: 'VIDEO_HD',
        url: 'https://mosaic01.ztat.net/vgs/comet/LE/22/1N/02/PK/11/VIDEO/HIGH_QUALITY/1479494991769.mp4',
        mediaCharacter: 'UNKNOWN'
      }
    ],
    attributes: [
      {
        name: 'Lining',
        category: 'material',
        sub_category: 'lining',
        values: ['textile']
      }, {
        name: 'Insole',
        category: 'material',
        sub_category: 'material_insole',
        values: ['textile']
      }, {
        name: 'upper material',
        category: 'material',
        sub_category: 'upper_material',
        values: ['leather and imitation leather']
      }, {
        name: 'Sole',
        category: 'material',
        sub_category: 'sole_material',
        values: ['synthetics']
      }, {
        name: 'Padding type',
        category: 'material_details',
        sub_category: 'padding_type',
        values: ['No padding']
      }, {
        name: 'Occasion',
        category: 'occasion',
        sub_category: 'occasion',
        values: ['leisure']
      }, {
        name: 'Shoe tip',
        category: 'cut_and_shape',
        sub_category: 'shoe_toecap',
        values: ['round']
      }, {
        name: 'Heel type',
        category: 'cut_and_shape',
        sub_category: 'heel_form',
        values: ['flat']
      }, {
        name: 'Detail',
        category: 'general_and_details',
        sub_category: 'shoe_detail',
        values: ['decorative seams']
      }, {
        name: 'Shoe fastener',
        category: 'general_and_details',
        sub_category: 'shoe_fastener',
        values: ['laces']
      }
    ],
    enrichment_attributes: [
      {
        key: 'assortment_area',
        value: ['STANDARD']
      }, {
        key: 'is_vip',
        value: ['false']
      }, {
        key: 'is_new',
        value: ['false']
      }, {
        key: 'is_travel_size',
        value: ['false']
      }, {
        key: 'is_natural',
        value: ['false']
      }
    ],
    target_groups: {
      gender: ['MALE', 'FEMALE'],
      age: ['ADULT'],
      domain: ['DEFAULT'],
      age_range: ['20+', 'Teens']
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
  t.is(article.silhouetteCode, 'sneaker');
  t.is(article.supplierColor, 'white');
  t.is(article.productGroup, 'shoe');
  t.is(article.detailUrl, 'https://www.zalando.de/adidas-originals-los-angeles-sneaker-ad112b0f6-a11.html');
  t.is(article.units[0].size, 'M');
  if (article.units[0].stock) {
    t.is(article.units[0].stock, testStock);
  }
  t.is(article.units[0].partner.id, testPartnerId);


  const detail = 'https://mosaic01.ztat.net/vgs/media/detail/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg';
  const thumbnail = 'https://mosaic01.ztat.net/vgs/media/pdp-thumb/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg';
  const large = 'https://mosaic01.ztat.net/vgs/media/large/AD/11/2B/0F/6A/11/AD112B0F6-A11@108.1.jpg';
  const videoThumb = 'https://mosaic01.ztat.net/vgs/comet/LE/22/1N/02/PK/11/VIDEO/PREVIEW_IMG/1479494993512.jpg';
  const videoHD = 'https://mosaic01.ztat.net/vgs/comet/LE/22/1N/02/PK/11/VIDEO/HIGH_QUALITY/1479494991769.mp4';

  t.is(article.images[0].resolutions.detail, detail);
  t.is(article.images[0].resolutions.thumbnail, thumbnail);
  t.is(article.images[0].resolutions.large, large);
  t.is(article.images[0].mediaCharacter, 'MODEL');
  t.is(article.images[0].type, 'IMAGE');

  t.is(article.videos[0].url, videoThumb);
  t.is(article.videos[0].mediaCharacter, 'UNKNOWN');
  t.is(article.videos[0].type, 'VIDEO_THUMBNAIL');

  t.is(article.videos[1].url, videoHD);
  t.is(article.videos[1].mediaCharacter, 'UNKNOWN');
  t.is(article.videos[1].type, 'VIDEO_HD');

  if (article.attributes) {
    t.is(article.attributes[0].name, 'Lining');
    t.is(article.attributes[0].category, 'material');
    t.is(article.attributes[0].subCategory, 'lining');
    t.is(article.attributes[0].values[0], 'textile');
  }
  if (article.enrichmentAttributes) {
    t.is(article.enrichmentAttributes[0].key, 'assortment_area');
    t.is(article.enrichmentAttributes[0].value[0], 'STANDARD');
  }
  if (article.targetGroups) {
    t.is(article.targetGroups.gender[0], 'MALE');
    t.is(article.targetGroups.gender[1], 'FEMALE');
    t.is(article.targetGroups.age[0], 'ADULT');
    t.is(article.targetGroups.domain[0], 'DEFAULT');
    t.is(article.targetGroups.ageRange[0], '20+');
    t.is(article.targetGroups.ageRange[1], 'Teens');
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
    silhouette_code: 'sneaker',
    brand: {
      name: 'Adidas'
    },
    detail_url: 'https://www.zalando.de/adidas-originals-los-angeles-sneaker-ad112b0f6-a11.html',
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
    ]
  };

  const article = new Article(json);

  const testStock = 3;
  const testPartnerId = '123';

  t.is(article.id, 'AD112B0F6-A11');
  t.is(article.color, 'Orange');
  t.is(article.silhouetteCode, 'sneaker');
  t.is(article.detailUrl, 'https://www.zalando.de/adidas-originals-los-angeles-sneaker-ad112b0f6-a11.html');
  t.is(article.units[0].size, 'M');
  t.is(article.units[0].stock, testStock);
  t.is(article.units[0].partner.id, testPartnerId);
  t.is(article.attributes, undefined);
  t.is(article.infos, undefined);
  t.is(article.reviews, undefined);
});
