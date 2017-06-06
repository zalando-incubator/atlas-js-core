import createModel from './base_model';

const ReviewRatingDistribution = createModel({
  level: { key: 'level', type: 'string', optional: true },
  count: { key: 'count', type: 'number', optional: true }
});

const ReviewRating = createModel({
  average: { key: 'average', type: 'number', optional: true },
  distribution: { key: 'distribution', type: 'object', model: ReviewRatingDistribution, optional: true }
});

const ReviewRecommendations = createModel({
  total: { key: 'total', type: 'number', optional: true },
  positive: { key: 'positive', type: 'number', optional: true }
});

const ReviewSummary = createModel({
  total: { key: 'total', type: 'number', optional: true },
  rating: { key: 'rating', type: 'object', model: ReviewRating, optional: true },
  recommendations: { key: 'recommendations', type: 'object', model: ReviewRecommendations, optional: true }
});

const ReviewEntry = createModel({
  name: { key: 'name', type: 'string', optional: true },
  title: { key: 'title', type: 'string', optional: true },
  description: { key: 'description', type: 'string', optional: true },
  rating: { key: 'rating', type: 'number', optional: true },
  recommends: { key: 'recommends', type: 'boolean', optional: true },
  created: { key: 'created', type: 'string', optional: true }
});

/**
 * @class Class for Article Unit Attribute model.
 * @param {ReviewSummary} summary - summary of Article review.
 * @param {ReviewEntry[]} entries - entries of Article review.
 * @constructor
 */
const Reviews = createModel({
  summary: { key: 'summary', type: 'object', model: ReviewSummary },
  entries: { key: 'entries', type: 'object', model: ReviewEntry }
});

export { Reviews };
