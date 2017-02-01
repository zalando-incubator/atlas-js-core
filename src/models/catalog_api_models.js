import createModel from './base_model';
import { Brand, Unit, Attribute, Media } from './article_models';

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
  media: { key: 'media', type: 'object', model: Media },
  attributes: { key: 'attributes', type: 'object', model: Attribute, optional: true },
  infos: { key: 'infos', type: 'string', optional: true },
  reviews: { key: 'reviews', type: 'object', optional: true }
});

export { Article };
