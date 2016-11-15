import createModel from './base_model';
import { Price } from './catalog_api_models';

/**
 * @class Class for Customer model
 * @param {String} email - email of a customer.
 * @param {boolean} subscribeNewsletter - indicates wether a customer subscribed
 * @constructor
 */
const Customer = createModel({
  email: { key: 'email', type: 'string' },
  subscribeNewsletter: { key: 'subscribe_newsletter', type: 'boolean' }
});

/**
* @class Class for PickupPoint model
* @param {String} name - Name of Pickup Point.
* @param {String} id - id of Pickup Point.
* @param {String} memberId - Member ID of Pickup Point.
* @constructor
*/
const PickupPoint = createModel({
  name: { key: 'name', type: 'string' },
  id: { key: 'id', type: 'string' },
  memberId: { key: 'member_id', type: 'string' }
});

/**
 * @class Class for Address model
 * @param {String} gender - gender of a customer.
 * @param {String} firstName - First name of a customer.
 * @param {String} lastName - Last name of a customer.
 * @param {String} street - Street of the Address.
 * @param {String} zip - Zipcode of the Address.
 * @param {String} city - City of the Address.
 * @param {String} countryCode - Country of the Address.
 * @param {PickupPoint} pickupPoint - Pickup Point of the Address. (Optional in case of Billing)
 * @constructor
 */
const Address = createModel({
  gender: { key: 'gender', type: 'string' },
  firstName: { key: 'first_name', type: 'string' },
  lastName: { key: 'last_name', type: 'string' },
  street: { key: 'street', type: 'string', optional: true },
  zip: { key: 'zip', type: 'string' },
  city: { key: 'city', type: 'string' },
  countryCode: { key: 'country_code', type: 'string' },
  pickupPoint: { key: 'pickup_point', type: 'object', model: PickupPoint, optional: true }
});

/**
 * @class Class for CartItem model
 * @param {String} sku - SKU of item.
 * @param {Number} quantity - Quantity of item.
 * @constructor
 */
const CartItem = createModel({
  sku: { key: 'sku', type: 'string' },
  quantity: { key: 'quantity', type: 'number' }
});

/**
* Class for Cart model
* @class Cart
* @param {CartItem} items - Array of CartItem.
* @constructor
*/
const Cart = createModel({
  items: { key: 'items', type: 'object', model: CartItem }
});

/**
* @class Class for Payment model
* @param {String} method - Payment Method type.
* @param {Object} metadata - Metadata for payment.
* @constructor
*/
const Payment = createModel({
  method: { key: 'method', type: 'string' },
  metadata: { key: 'metadata', type: 'object' }
});

/**
 * @class Class for CreateOrderRequest model
 * @param {Customer} customer - Customer object.
 * @param {Address} billingAddress - Billing Address of Order.
 * @param {Address} shippingAddress - Shipping Address of Order.
 * @param {Cart} cart - Cart of Order.
 * @param {Payment} payment - Payment of Order.
 * @constructor
 */
const CreateOrderRequest = createModel({
  customer: { key: 'customer', type: 'object', model: Customer },
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
  cart: { key: 'cart', type: 'object', model: Cart },
  payment: { key: 'payment', type: 'object', model: Payment }
});

/**
 * @class Class for CreateOrderResponse model
 * @param {String} orderNumber - Order Number.
 * @param {String} customerNumber - Customer Number.
 * @param {Address} billingAddress - Billing Address of Order.
 * @param {Address} shippingAddress - Shipping Address of Order.
 * @param {Price} grossTotal - Gross Total Price.
 * @param {Price} taxTotal - Tax Total Price.
 * @param {String} created - Date/Time when the order was created.
 * @param {String} detailURL - URL of Article details page.
 * @param {String} externalPaymentURL - URL of Payment.
 * @constructor
 */
const CreateOrderResponse = createModel({
  orderNumber: { key: 'order_number', type: 'string' },
  customerNumber: { key: 'customer_number', type: 'string' },
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  taxTotal: { key: 'tax_total', type: 'object', model: Price },
  created: { key: 'created', type: 'string' },
  detailURL: { key: 'detail_url', type: 'string' },
  externalPaymentURL: { key: 'external_payment_url', type: 'string', optional: true }
});

export { Customer, Address, PickupPoint, CartItem, Cart, Payment, Price, CreateOrderRequest, CreateOrderResponse };
