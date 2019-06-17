import createModel from './base_model';
import { Reviews } from './article_reviews_model';
import {
  Brand,
  Unit,
  Attribute,
  EnrichmentAttribute,
  TargetGroups,
  Price
} from './article_models';

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
 * @class Class for Article model
 * @param {String} id - id of the article.
 * @param {String} name - name of the article.
 * @param {String} color - color of the article.
 * @param {String} silhouetteCode - silhouette code of the article.
 * @param {String} supplierColor - color of the article from supplier.
 * @param {String} productGroup - product group of the article.
 * @param {String} detailUrl - product detail url of the article.
 * @param {Brand} brand - brand of the article.
 * @param {Unit[]} units - size, price and stock availability from the article.
 * @param {Image[]} images - Array of article images.
 * @param {Video[]} videos - Array of article videos.
 * @param {Attribute[]} attributes - characteristics of the article.
 * @param {EnrichmentAttributes[]} enrichmentAttributes - variable generic attributes.
 * @param {TargetGroups} targetGroups - the targeted groups of the article.
 * @param {String[]} infos - generic article description.
 * @param {Reviews[]} review - article reviews.
 * @constructor
 */
const Article = createModel({
  id: { key: 'id', type: 'string' },
  name: { key: 'name', type: 'string' },
  color: { key: 'color', type: 'string' },
  silhouetteCode: { key: 'silhouette_code', type: 'string', optional: true },
  supplierColor: { key: 'supplier_color', type: 'string', optional: true },
  productGroup: { key: 'product_group', type: 'string', optional: true },
  detailUrl: { key: 'detail_url', type: 'string', optional: true },
  brand: { key: 'brand', type: 'object', model: Brand },
  units: { key: 'units', type: 'object', model: Unit },
  images: { key: 'images', type: 'object', model: Image, optional: true },
  videos: { key: 'videos', type: 'object', model: Video, optional: true },
  attributes: { key: 'attributes', type: 'object', model: Attribute, optional: true },
  enrichmentAttributes: { key: 'enrichment_attributes', type: 'object', model: EnrichmentAttribute, optional: true },
  targetGroups: { key: 'target_groups', type: 'object', model: TargetGroups, optional: true },
  infos: { key: 'infos', type: 'string', optional: true },
  reviews: { key: 'reviews', type: 'object', model: Reviews, optional: true }
});

/**
 * @class Class for ArticleFamily model
 * @param {String} id - id of the article.
 * @param {String} color - color of the article.
 * @param {String} supplierColor - color of the article from supplier.
 * @param {Price} lowestPrice - lowestPrice of article.
 * @param {Image[]} images - Array of article images.
 * @constructor
*/
const ArticleFamily = createModel({
  id: { key: 'id', type: 'string' },
  color: { key: 'color', type: 'string' },
  supplierColor: { key: 'supplier_color', type: 'string', optional: true },
  lowestPrice: { key: 'lowest_price', type: 'object', model: Price },
  images: { key: 'images', type: 'object', model: Image, optional: true }
});

export { Article, ArticleFamily, Image, Video };
