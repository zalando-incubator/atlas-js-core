import createModel from '../base_model.js';

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
  stock: { key: 'stock', type: 'number' },
  partner: { key: 'partner', type: 'object', model: Partner, optional: true }
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


// TODO what is the right model
// const Review = createModel({
//   summary: {key: 'summary', type 'object', model: Summary'}
// });

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
 * @param {String} service - Delivery Service type.
 * @param {Object} cost - Cost for Delivery.
 * @param {String} earliest - Delivery earliest date.
 * @param {String} latest - Delivery latest date.
 * @constructor
 */
const DeliverySchema = {
  earliest: { key: 'earliest', type: 'string' },
  latest: { key: 'latest', type: 'string' }
};

const Delivery = createModel(DeliverySchema);

const DiscountSchema = {
  grossTotal: { key: 'grossTotal', type: 'object', model: Price },
  taxTotal: { key: 'taxTotal', type: 'object', model: Price }
};

export {
  Brand, Partner, Price, Unit, Attribute, ArticleImage, Media, ItemWithPrice,
    Item, Payment, Delivery, DeliverySchema, DiscountSchema, PriceSchema
};
