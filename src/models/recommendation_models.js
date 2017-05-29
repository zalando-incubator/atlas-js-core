import createModel from './base_model';
import { Brand, Price, Media } from './catalog_api_models';

/**
 * @class Class for Recommended Article model
 * @param {String} id - id of article.
 * @param {String} name - name of article.
 * @param {Price} lowestPrice - lowestPrice of article.
 * @param {Brand} brand - brand of article.
 * @param {Media} media - media of article.
 * @constructor
 */
const RecommendedArticles = createModel({
  id: { key: 'id', type: 'string' },
  name: { key: 'name', type: 'string' },
  brand: { key: 'brand', type: 'object', model: Brand },
  lowestPrice: { key: 'lowest_price', type: 'object', model: Price },
  media: { key: 'media', type: 'object', model: Media }
});

export { RecommendedArticles };
