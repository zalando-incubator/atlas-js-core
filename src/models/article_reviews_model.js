import createModel from './base_model';

/**
 * @class Class for ReviewRatingDistribution.
 * @param {String} level.
 * @param {Number} count - count of reviews distribution.
 * @constructor
 */
const ReviewRatingDistribution = createModel({
  level: { key: 'level', type: 'string', optional: true },
  count: { key: 'count', type: 'number', optional: true }
});

/**
 * @class Class for ReviewRating.
 * @param {Number} average - average rating of Article reviews.
 * @param {ReviewRatingDistribution} distribution - distribution of reviews.
 * @constructor
 */

const ReviewRating = createModel({
  average: { key: 'average', type: 'number', optional: true },
  distribution: { key: 'distribution', type: 'object', model: ReviewRatingDistribution, optional: true }
});

/**
 * @class Class for ReviewRecommendations.
 * @param {Number} total - total number of Article reviews.
 * @param {Number} positive - number of positive reviews.
 * @constructor
 */


const ReviewRecommendations = createModel({
  total: { key: 'total', type: 'number', optional: true },
  positive: { key: 'positive', type: 'number', optional: true }
});

/**
 * @class Class for ReviewSummary.
 * @param {Number} total - total number of Article reviews.
 * @param {ReviewRating} rating - average rating of Article review.
 * @param {ReviewRecommendations} recommendations - recommendations of Article review.
 * @constructor
 */

const ReviewSummary = createModel({
  total: { key: 'total', type: 'number', optional: true },
  rating: { key: 'rating', type: 'object', model: ReviewRating, optional: true },
  recommendations: { key: 'recommendations', type: 'object', model: ReviewRecommendations, optional: true }
});

/**
 * @class Class for ReviewEntry.
 * @param {String} name - name of Article reviewer.
 * @param {String} title - title of Article review.
 * @param {String} description - description of Article review.
 * @param {Number} rating - rating of Article review.
 * @param {Boolean} recommends - boolean if the reviewer recommends or not.
 * @param {String} created - created timestamp of Article review.
 * @constructor
 */

const ReviewEntry = createModel({
  name: { key: 'name', type: 'string', optional: true },
  title: { key: 'title', type: 'string', optional: true },
  description: { key: 'description', type: 'string', optional: true },
  rating: { key: 'rating', type: 'number', optional: true },
  recommends: { key: 'recommends', type: 'boolean', optional: true },
  created: { key: 'created', type: 'string', optional: true }
});

/**
 * @class Class for Article Reviews.
 * @param {ReviewSummary} summary - summary of Article review.
 * @param {ReviewEntry[]} entries - entries of Article review.
 * @constructor
 */
const Reviews = createModel({
  summary: { key: 'summary', type: 'object', model: ReviewSummary },
  entries: { key: 'entries', type: 'object', model: ReviewEntry }
});

export { Reviews };
