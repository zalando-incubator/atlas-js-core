import createModel from './base_model';
import { Reviews } from './article_reviews_model';

/**
 * @class Class for Image model.
 * @param {String} type - Type of the media item, e.g. 'IMAGE', 'IMAGE_360'
 * @param {String} mediaCharacter - Media Character descriptor with meta information about image,
 * for example 'MODEL' image that indicates that this media item contains model image URL.
 * @param {Object} resolutions - Requested resolutions of the media item.
 * @constructor
 */
const Image = createModel({
  type: { key: 'type', type: 'string' },
  mediaCharacter: { key: 'mediaCharacter', type: 'string' },
  resolutions: { key: 'resolutions', type: 'object' }
});

/**
 * @class Class for Video model.
 * @param {String} type - Type of the media item, e.g. 'VIDEO', 'VIDEO_HD', 'VIDEO_THUMBNAIL', 'VIDEO_SMALL'
 * @param {String} mediaCharacter - Media Character descriptor with meta information about video,
 * for example 'MODEL' image that indicates that this media item contains model image URL.
 * @param {String} url - An absolute URL to the image
 */
const Video = createModel({
  type: { key: 'type', type: 'string' },
  mediaCharacter: { key: 'mediaCharacter', type: 'string' },
  url: { key: 'url', type: 'string' }
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
 * @param {String} detailUrl - product detail url of the article.
 * @param {Brand} brand - brand of the article.
 * @param {Unit[]} units - size, price and stock availability from the article.
 * @param {Image[]} images - Array of article images.
 * @param {Video[]} videos - Array of article videos.
 * @param {Attribute[]} attributes - characteristics of the article.
 * @param {String[]} infos - generic article description.
 * @param {Reviews[]} review - article reviews.
 * @constructor
 */
const Article = createModel({
  id: { key: 'id', type: 'string' },
  name: { key: 'name', type: 'string' },
  color: { key: 'color', type: 'string' },
  detailUrl: { key: 'detail_url', type: 'string', optional: true },
  brand: { key: 'brand', type: 'object', model: Brand },
  units: { key: 'units', type: 'object', model: Unit },
  images: { key: 'images', type: 'object', model: Image, optional: true },
  videos: { key: 'videos', type: 'object', model: Video, optional: true },
  attributes: { key: 'attributes', type: 'object', model: Attribute, optional: true },
  infos: { key: 'infos', type: 'string', optional: true },
  reviews: { key: 'reviews', type: 'object', model: Reviews, optional: true }
});

export { Article };
