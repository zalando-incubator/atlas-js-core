import createModel from './base_model';

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
const PriceSchema = {
  amount: { key: 'amount', type: 'number' },
  currency: { key: 'currency', type: 'string' }
};
const Price = createModel(PriceSchema);

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
  partner: { key: 'partner', type: 'object', model: Partner, optional: true }
});

/**
 * @class Class for Article Unit Attribute model.
 * @param {String} name - name of attribute.
 * @param {String} category - category of attribute.
 * @param {String} subCategory - sub-category of attribute.
 * @param {String[]} values - values of attribute.
 * @constructor
 */
const Attribute = createModel({
  name: { key: 'name', type: 'string' },
  category: { key: 'category', type: 'string' },
  subCategory: { key: 'sub_category', type: 'string' },
  values: { key: 'values', type: 'string' }
});

/**
 * @class Class for Article Unit EnrichmentAttribute model.
 * @param {String} key - name of enrichment attribute.
 * @param {String[]} value - values of enrichment attribute.
 * @constructor
 */
const EnrichmentAttribute = createModel({
  key: { key: 'key', type: 'string' },
  value: { key: 'value', type: 'string' }
});

/**
 * @class Class for TargetGroups model.
 * @param {String[]} gender - The targeted gender group. Can be FEMALE or MALE. Unisex articles will have both.
 * @param {String[]} age - The targeted age group. Current values are: ADULT, BABY, KID, TEEN
 * @param {String[]} domain - The target domain. Can be: DEFAULT, GREEN, LIFESTYLE, MATERNITY, PREMIUM, OVERSIZE, SPORTS
 * @param {String[]} ageRange - Current values: Under 20, 20-29, 30-39, 40-49, Over 50
 * @constructor
 */
const TargetGroups = createModel({
  gender: { key: 'gender', type: 'string', optional: true },
  age: { key: 'age', type: 'string', optional: true },
  domain: { key: 'domain', type: 'string', optional: true },
  ageRange: { key: 'age_range', type: 'string', optional: true }
});

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
  images: { key: 'images', type: 'object', model: ArticleImage }
});


/**
 * @class Class for CartItem model
 * @param {String} sku - SKU of item.
 * @param {Number} quantity - Quantity of item.
 * @constructor
 */
const Item = createModel({
  sku: { key: 'sku', type: 'string' },
  quantity: { key: 'quantity', type: 'number' }
});

/**
 * @class Class for CartItem model
 * @param {String} sku - SKU of item.
 * @param {Number} quantity - Quantity of item.
 * @param {Price} price - pirce of the item
 * @constructor
 */
const ItemWithPrice = createModel({
  sku: { key: 'sku', type: 'string' },
  quantity: { key: 'quantity', type: 'number' },
  price: { key: 'price', type: 'object', model: Price },
  originalPrice: { key: 'original_price', type: 'object', model: Price }
});

/**
 * @class Class for Payment model
 * @param {String} method - Payment Method type.
 * @param {String} selectionPageUrl - URL of the payment selection page.
 * @param {Object} metadata - Metadata for payment.
 * @constructor
 */
const Payment = createModel({
  method: { key: 'method', type: 'string', optional: true },
  selectionPageUrl: { key: 'selection_page_url', type: 'string', optional: true },
  metadata: { key: 'metadata', type: 'object', optional: true }
});

/**
 * @class Class for Delivery model
 * @param {String} earliest - Delivery earliest date.
 * @param {String} latest - Delivery latest date.
 * @constructor
 */
const DeliverySchema = {
  earliest: { key: 'earliest', type: 'string', optional: true },
  latest: { key: 'latest', type: 'string', optional: true }
};
const Delivery = createModel(DeliverySchema);

export {
  Brand, Partner, Price, Unit, Attribute, EnrichmentAttribute, TargetGroups, ArticleImage,
  Media, ItemWithPrice, Item, Payment, Delivery, DeliverySchema, PriceSchema
};
