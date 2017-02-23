import createModel from './base_model.js';

/**
 * @class Class for ArticleImage model.
 * @param {Number} order - order number of image used for sorting.
 * @param {String} catalog - URL of catalog image.
 * @param {String} catalogHD - URL of HD catalog image.
 * @param {String} detail - URL of details image.
 * @param {String} detailHD - URL of HD details image.
 * @param {String} large - URL of large image.
 * @param {String} largeHD - URL of HD large image.
 * @constructor
 */
const ArticleImage = createModel({
  order: { key: 'order', type: 'number' },
  catalog: { key: 'catalog', type: 'string' },
  catalogHD: { key: 'catalog_hd', type: 'string' },
  detail: { key: 'detail', type: 'string' },
  detailHD: { key: 'detail_hd', type: 'string' },
  large: { key: 'large', type: 'string' },
  largeHD: { key: 'large_hd', type: 'string' }
});

/**
 * @class Class for Media model.
 * @param {ArticleImage} images - array of images.
 * @constructor
 */
const Media = createModel({
  images: { key: 'media_items', type: 'object', model: ArticleImage, optional: true }
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
 * @param {String} id - id of article.
 * @param {String} name - name of article.
 * @param {String} color - color of article.
 * @param {String} brand - brand of article.
 * @param {String[]} infos - infos of article.
 * @constructor
 */
const Article = createModel({
  id: { key: 'id', type: 'string' },
  name: { key: 'name', type: 'string' },
  color: { key: 'color', type: 'string' },
  brand: { key: 'brand', type: 'object', model: Brand },
  units: { key: 'units', type: 'object', model: Unit },
  media: { key: 'media', type: 'object', model: Media, optional: true },
  attributes: { key: 'attributes', type: 'object', model: Attribute, optional: true },
  infos: { key: 'infos', type: 'string', optional: true },
  reviews: { key: 'reviews', type: 'object', optional: true }
});

export { Article, Price };
