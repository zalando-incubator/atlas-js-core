/* eslint max-len: 0 */
import createModel from './base_model';
// import { Price } from './catalog_api_models';
import { Price, Item, Payment, DeliverySchema } from './base-models/base_article_model.js';
import { GuestCustomer } from './customer_model.js';
import { GuestAddress } from './address_model.js';
import { OrderResponse } from './order_model';

// /**
//  * @class Class for Customer model
//  * @param {String} email - email of a customer.
//  * @param {boolean} subscribeNewsletter - indicates wether a customer subscribed
//  * @constructor
//  */
// const Customer = createModel({
//   email: { key: 'email', type: 'string' },
//   subscribeNewsletter: { key: 'subscribe_newsletter', type: 'boolean' }
// });
//
// /**
// * @class Class for PickupPoint model
// * @param {String} name - Name of Pickup Point.
// * @param {String} id - id of Pickup Point.
// * @param {String} memberId - Member ID of Pickup Point.
// * @constructor
// */
// const PickupPoint = createModel({
//   name: { key: 'name', type: 'string' },
//   id: { key: 'id', type: 'string' },
//   memberId: { key: 'member_id', type: 'string' }
// });
//
// /**
//  * @class Class for GuestAddress model
//  * @param {String} gender - gender of a customer.
//  * @param {String} firstName - First name of a customer.
//  * @param {String} lastName - Last name of a customer.
//  * @param {String} street - Street of the GuestAddress.
//  * @param {String} zip - Zipcode of the GuestAddress.
//  * @param {String} city - City of the GuestAddress.
//  * @param {String} countryCode - Country of the GuestAddress.
//  * @param {PickupPoint} pickupPoint - Pickup Point of the GuestAddress. (Optional in case of Billing)
//  * @constructor
//  */
// const Address = createModel({
//   gender: { key: 'gender', type: 'string' },
//   firstName: { key: 'first_name', type: 'string' },
//   lastName: { key: 'last_name', type: 'string' },
//   street: { key: 'street', type: 'string', optional: true },
//   zip: { key: 'zip', type: 'string' },
//   city: { key: 'city', type: 'string' },
//   countryCode: { key: 'country_code', type: 'string' },
//   pickupPoint: { key: 'pickup_point', type: 'object', model: PickupPoint, optional: true }
// });

// /**
//  * @class Class for CartItem model
//  * @param {String} sku - SKU of item.
//  * @param {Number} quantity - Quantity of item.
//  * @constructor
//  */
// const CartItem = createModel({
//   sku: { key: 'sku', type: 'string' },
//   quantity: { key: 'quantity', type: 'number' }
// });

/**
* Class for Cart model
* @class Cart
* @param {CartItem} items - Array of CartItem.
* @param {CartItem} itemsOutOfStock - Array of CartItem which are out of stock.
* @param {Price} grossTotal - Gross Total Price.
* @param {Price} taxTotal - Tax Total Price.
* @constructor
*/
const Cart = createModel({
  items: { key: 'items', type: 'object', model: Item },
  itemsOutOfStock: { key: 'items_out_of_stock', type: 'string', optional: true },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  taxTotal: { key: 'tax_total', type: 'object', model: Price }
});

/**
 * @class Class for GuestDelivery model
 * @param {String} service - Service method (STANDARD, EXPRESS, ...)
 * @param {Price} cost - Cost of the delivery
 * @param {Delivery} delivery object
 * @constructor
 */
const GuestDelivery = createModel(Object.assign({
  service: { key: 'service', type: 'string' },
  cost: { key: 'cost', type: 'object', model: Price }
}, DeliverySchema));

// /**
// * @class Class for Payment model
// * @param {String} method - Payment Method type.
// * @param {Object} metadata - Metadata for payment.
// * @constructor
// */
// const Payment = createModel({
//   method: { key: 'method', type: 'string', optional: true },
//   selectionPageUrl: { key: 'selection_page_url', type: 'string', optional: true },
//   metadata: { key: 'metadata', type: 'object', optional: true }
// });
//
// /**
// * @class Class for Delivery model
// * @param {String} service - Delivery Service type.
// * @param {Object} cost - Cost for Delivery.
// * @param {String} earliest - Delivery earliest date.
// * @param {String} latest - Delivery latest date.
// * @constructor
// */
// const Delivery = createModel({
//   service: { key: 'service', type: 'string' },
//   cost: { key: 'cost', type: 'object', model: Price },
//   earliest: { key: 'earliest', type: 'string' },
//   latest: { key: 'latest', type: 'string' }
// });

/**
 * @class Class for CreateOrderRequest model
 * @param {Customer} customer - Customer object.
 * @param {Address} billingAddress - Billing GuestAddress of Order.
 * @param {Address} shippingAddress - Shipping GuestAddress of Order.
 * @param {Cart} cart - Cart of Order.
 * @param {Payment} payment - Payment of Order.
 * @constructor
 */
const CreateOrderRequest = createModel({
  customer: { key: 'customer', type: 'object', model: GuestCustomer },
  billingAddress: { key: 'billing_address', type: 'object', model: GuestAddress },
  shippingAddress: { key: 'shipping_address', type: 'object', model: GuestAddress },
  cart: { key: 'cart', type: 'object', model: Cart },
  payment: { key: 'payment', type: 'object', model: Payment, optional: true }
});

/**
 * @class Class for CreateOrderResponse model
 * @param {String} orderNumber - Order Number.
 * @param {String} customerNumber - Customer Number.
 * @param {Address} billingAddress - Billing GuestAddress of Order.
 * @param {Address} shippingAddress - Shipping GuestAddress of Order.
 * @param {Price} grossTotal - Gross Total Price.
 * @param {Price} taxTotal - Tax Total Price.
 * @param {String} created - Date/Time when the order was created.
 * @param {String} externalPaymentURL - URL of Payment.
 * @constructor
 */
const CreateOrderResponse = createModel(OrderResponse);


/**
* @class Class for CreateOrderRedirectResponse model
* @param {String} url -Redirect URL.
*/
const CreateOrderRedirectResponse = createModel({
  redirectURL: { key: 'redirect_url', type: 'string' }
});

/**
 * @class Class for GetCheckoutResponse model
 * @param {String} customerNumber - Customer Number.
 * @param {Cart} cart - Cart of Order.
 * @param {Address} billingAddress - Billing GuestAddress of Order.
 * @param {Address} shippingAddress - Shipping GuestAddress of Order.
 * @param {Payment} payment - Payment of Order.
 * @constructor
 */
const GetCheckoutResponse = createModel({
  cart: { key: 'cart', type: 'object', model: Cart },
  billingAddress: { key: 'billing_address', type: 'object', model: GuestAddress },
  shippingAddress: { key: 'shipping_address', type: 'object', model: GuestAddress },
  payment: { key: 'payment', type: 'object', model: Payment, optional: true },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  taxTotal: { key: 'tax_total', type: 'object', model: Price },
  delivery: { key: 'delivery', type: 'object', model: GuestDelivery }
});

export { CreateOrderRequest, CreateOrderResponse, CreateOrderRedirectResponse, GetCheckoutResponse };
