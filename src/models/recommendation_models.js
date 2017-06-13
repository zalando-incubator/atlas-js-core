import createModel from './base_model';
import { Brand, Price, Image, Video } from './catalog_api_models';

/**
 * @class Class for Recommended Article model
 * @param {String} id - id of article.
 * @param {String} name - name of article.
 * @param {Price} lowestPrice - lowestPrice of article.
 * @param {Brand} brand - brand of article.
 * @param {Image[]} images - Array of article images.
 * @param {Video[]} videos - Array of article videos.
 * @constructor
 */
const RecommendedArticles = createModel({
  id: { key: 'id', type: 'string' },
  name: { key: 'name', type: 'string' },
  brand: { key: 'brand', type: 'object', model: Brand },
  lowestPrice: { key: 'lowest_price', type: 'object', model: Price },
  images: { key: 'images', type: 'object', model: Image, optional: true },
  videos: { key: 'images', type: 'object', model: Video, optional: true }
});

export { RecommendedArticles };
