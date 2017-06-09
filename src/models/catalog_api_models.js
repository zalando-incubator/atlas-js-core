import createModel from './base_model';
import { Reviews } from './article_reviews_model';
import mediaTransform from './transforms/media_trasform';

/**
 * @class Class for MediaItem model.
 * @param {Number} order - order number of image used for sorting.
 * @param {String} path - URL path.
 * @constructor
 */
const MediaItem = createModel({
  path: { key: 'path', type: 'string' },
  type: { key: 'type', type: 'string' },
  mediaCharacter: { key: 'media_character', type: 'string' }
});


/**
 * @class Class for Brand model.
 * @param {String} name - name of brand.
 * @constructor
 */
const Brand = createModel({
  name: { key: 'name', type: 'string' }
});

/**
 * @class Class for Partner model.
 * @param {String} id - id of partner.
 * @param {String} name - name of partner.
 * @param {String} detailURL - URL of partner.
 * @constructor
 */
const Partner = createModel({
  id: { key: 'id', type: 'string' },
  name: { key: 'name', type: 'string' },
  detailURL: { key: 'detail_url', type: 'string' }
});

/**
 * @class Class for Article Unit Price model.
 * @param {number} amount - amount of price.
 * @param {String} currency - currency of price.
 * @constructor
 */
const Price = createModel({
  amount: { key: 'amount', type: 'number' },
  currency: { key: 'currency', type: 'string' }
});

/**
 * @class Class for Article Unit model.
 * @param {String} id - id of article.
 * @param {String} size - size of article.
 * @param {Price} price - price of article.
 * @param {Price} originalPrice - price of article.
 * @param {boolean} available - whether the unit is available or not.
 * @param {number} stock
 * @param {Partner} partner
 * @param {Media} media
 * @constructor
 */
const Unit = createModel({
  id: { key: 'id', type: 'string' },
  size: { key: 'size', type: 'string' },
  price: { key: 'price', type: 'object', model: Price },
  originalPrice: { key: 'original_price', type: 'object', model: Price },
  available: { key: 'available', type: 'boolean' },
  stock: { key: 'stock', type: 'number', optional: true },
  partner: { key: 'partner', type: 'object', model: Partner }
});

/**
 * @class Class for Article Unit Attribute model.
 * @param {String} name - name of attribute.
 * @param {String[]} values - values of attribute.
 * @constructor
 */
const Attribute = createModel({
  name: { key: 'name', type: 'string' },
  values: { key: 'values', type: 'string' }
});

/**
 * @class Class for Article model
 * @param {String} id - id of the article.
 * @param {String} name - name of the article.
 * @param {String} color - color of the article.
 * @param {String} brand - brand of the article.
 * @param {String} infos - generic article description.
 * @param {String[]} detailUrl - product detail url of the article.
 * @param {String[]} units - size, price and stock availability from the article.
 * @param {String[]} media - media, f.ex: images.
 * @param {String[]} attributes - characteristics of the article.
 * @param {String[]} review - article reviews.
 * @constructor
 */
const Article = createModel({
  id: { key: 'id', type: 'string' },
  name: { key: 'name', type: 'string' },
  color: { key: 'color', type: 'string' },
  detailUrl: { key: 'detail_url', type: 'string', optional: true },
  brand: { key: 'brand', type: 'object', model: Brand },
  units: { key: 'units', type: 'object', model: Unit },
  media: { key: 'media.media_items', type: 'object', model: MediaItem, optional: true, transform: mediaTransform },
  attributes: { key: 'attributes', type: 'object', model: Attribute, optional: true },
  infos: { key: 'infos', type: 'string', optional: true },
  reviews: { key: 'reviews', type: 'object', model: Reviews, optional: true }
});

export { Article, Price };
