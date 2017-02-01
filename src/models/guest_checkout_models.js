import createModel from './base_model';
import { Price, Item, Payment, DeliverySchema } from './article_models';
import { GuestCustomer } from './customer_model';
import { Address } from './address_models';
import { OrderResponse } from './order_models';

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
const GuestDelivery = createModel({
  service: { key: 'service', type: 'string' },
  cost: { key: 'cost', type: 'object', model: Price },
  ...DeliverySchema
});

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
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
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
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
  payment: { key: 'payment', type: 'object', model: Payment, optional: true },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  taxTotal: { key: 'tax_total', type: 'object', model: Price },
  delivery: { key: 'delivery', type: 'object', model: GuestDelivery }
});

export { CreateOrderRequest, CreateOrderResponse, CreateOrderRedirectResponse, GetCheckoutResponse };
