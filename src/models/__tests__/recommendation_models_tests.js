import test from 'ava';
import { RecommendedArticle } from '../recommendation_models.js';


test('RecommendedArticle should be initialized from JSON object', t => {
  const json = {
    id: 'IC141D00L-A11',
    trackingString: 'l:afb;t:ci;r:750;c:751;b:1295;e:sro;p:0;s:IC141D00L-A11;f:fISAkSbLcSEMtLo',
    name: 'KASSIDY - Poloshirt - weiß',
    brand: {
      name: 'Icepeak'
    },
    lowest_price: {
      amount: 17.95,
      currency: 'EUR'
    },
    images: [
      {
        type: 'IMAGE',
        mediaCharacter: 'NON_MODEL',
        resolutions: {
          medium: 'https://mosaic01.ztat.net/vgs/media/detail/IC/14/1D/00/LA/11/IC141D00L-A11@8.jpg',
          medium_hd: 'https://mosaic01.ztat.net/vgs/media/detail_hd/IC/14/1D/00/LA/11/IC141D00L-A11@8.jpg'
        }
      },
      {
        type: 'IMAGE',
        mediaCharacter: 'STYLE',
        resolutions: {
          medium: 'https://mosaic01.ztat.net/vgs/media/detail/IC/14/1D/00/LA/11/IC141D00L-A11@7.jpg',
          medium_hd: 'https://mosaic01.ztat.net/vgs/media/detail_hd/IC/14/1D/00/LA/11/IC141D00L-A11@7.jpg'
        }
      }
    ],
    videos: [
      {
        type: 'VIDEO_HD',
        mediaCharacter: 'NON_MODEL',
        url: 'https://mosaic01.ztat.net/vgs/IC/14/1D/00/LA/11/IC141D00L-A11@8.jpg'
      },
      {
        type: 'VIDEO_LOW',
        mediaCharacter: 'STYLE',
        url: 'https://mosaic01.ztat.net/vgs/IC/14/1D/00/LA/11/IC141D00L-A11@7.jpg'
      }
    ],
    units: [
      {
        id: 'IC141D00L-A11000S000',
        size: 'S',
        price: {
          amount: 17.95,
          currency: 'EUR'
        },
        original_price: {
          amount: 17.95,
          currency: 'EUR'
        },
        available: true
      },
      {
        id: 'IC141D00L-A11000M000',
        size: 'M',
        price: {
          amount: 17.95,
          currency: 'EUR'
        },
        original_price: {
          amount: 17.95,
          currency: 'EUR'
        },
        available: true
      }
    ],
    product_group: 'clothing'
  };

  const recommendedArticle = new RecommendedArticle(json);

  t.is(recommendedArticle.id, 'IC141D00L-A11');
  t.is(recommendedArticle.brand.name, 'Icepeak');
  t.is(recommendedArticle.name, 'KASSIDY - Poloshirt - weiß');
  t.is(recommendedArticle.lowestPrice.amount, 17.95);
  t.is(recommendedArticle.lowestPrice.currency, 'EUR');
  t.is(recommendedArticle.images.length, 2);
  t.is(recommendedArticle.images[0].type, 'IMAGE');
  t.is(recommendedArticle.images[0].mediaCharacter, 'NON_MODEL');
  t.is(recommendedArticle.images[0].resolutions.medium, json.images[0].resolutions.medium);
  t.is(recommendedArticle.images[1].type, 'IMAGE');
  t.is(recommendedArticle.images[1].mediaCharacter, 'STYLE');
  t.is(recommendedArticle.images[1].resolutions.medium_hd, json.images[1].resolutions.medium_hd);
  t.is(recommendedArticle.videos[0].type, 'VIDEO_HD');
  t.is(recommendedArticle.videos[0].mediaCharacter, 'NON_MODEL');
  t.is(recommendedArticle.videos[1].type, 'VIDEO_LOW');
  t.is(recommendedArticle.videos[1].mediaCharacter, 'STYLE');
  t.is(recommendedArticle.units[0].id, 'IC141D00L-A11000S000');
  t.is(recommendedArticle.units[0].price.amount, 17.95);
  t.is(recommendedArticle.units[0].originalPrice.amount, 17.95);
  t.is(recommendedArticle.productGroup, 'clothing');

});


test('RecommendedArticle should be initialized from JSON object with optional fields removed', t => {
  const json = {
    id: 'IC141D00L-A11',
    name: 'KASSIDY - Poloshirt - weiß',
    brand: {
      name: 'Icepeak'
    },
    lowest_price: {
      amount: 17.95,
      currency: 'EUR'
    },
    units: [
      {
        id: 'IC141D00L-A11000S000',
        size: 'S',
        price: {
          amount: 17.95,
          currency: 'EUR'
        },
        original_price: {
          amount: 17.95,
          currency: 'EUR'
        },
        available: true
      },
      {
        id: 'IC141D00L-A11000M000',
        size: 'M',
        price: {
          amount: 17.95,
          currency: 'EUR'
        },
        original_price: {
          amount: 17.95,
          currency: 'EUR'
        },
        available: true
      }
    ]
  };

  const recommendedArticle = new RecommendedArticle(json);

  t.is(recommendedArticle.id, 'IC141D00L-A11');
  t.is(recommendedArticle.brand.name, 'Icepeak');
  t.is(recommendedArticle.name, 'KASSIDY - Poloshirt - weiß');
  t.is(recommendedArticle.lowestPrice.amount, 17.95);
  t.is(recommendedArticle.lowestPrice.currency, 'EUR');
  t.is(recommendedArticle.units[0].id, 'IC141D00L-A11000S000');
  t.is(recommendedArticle.units[0].price.amount, 17.95);
  t.is(recommendedArticle.units[0].originalPrice.amount, 17.95);

});
