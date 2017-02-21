import { Address } from './address_models';
import { Price } from './article_models';

/**
 * @class Class for Order Response model
 * @param {String} orderNumber - the order number.
 * @param {Address} billingAddress - the billing address.
 * @param {Address} shippingAddress - the shipping address.
 * @param {Price} grossTotal - gross total of the discount.
 * @param {Price} taxTotal - tax total of the discount.
 * @param {String} created - creation date.
 * @param {String} externalPaymentURL - the payment URL.
 * @constructor
 */
const OrderResponse = {
  orderNumber: { key: 'order_number', type: 'string' },
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  taxTotal: { key: 'tax_total', type: 'object', model: Price },
  created: { key: 'created', type: 'string' },
  externalPaymentURL: { key: 'external_payment_url', type: 'string', optional: true }
};

/**
 * @class Class for Checkout Order Response model
 * @param {String} customerNumber - the customer number.
 * @param {String} orderNumber - the order number.
 * @param {Address} billingAddress - the billing address.
 * @param {Address} shippingAddress - the shipping address.
 * @param {Price} grossTotal - gross total of the discount.
 * @param {Price} taxTotal - tax total of the discount.
 * @param {String} created - creation date.
 * @param {String} externalPaymentURL - the payment URL.
 * @constructor
 */
const CheckoutApiOrderResponse = {
  customerNumber: { key: 'customer_number', type: 'string' },
  ...OrderResponse
};

/**
 * @class Class for Guest Customer model
 * @param {String} orderNumber - the order number.
 * @param {String} customerNumber - the customer number.
 * @param {Price} grossTotal - gross total of the discount.
 * @param {String} created - creation date.
 * @param {String} detailUrl - the details URL.
 * @constructor
 */
const CheckoutOrder = {
  orderNumber: { key: 'order_number', type: 'string' },
  customerNumber: { key: 'customer_number', type: 'string' },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  created: { key: 'created', type: 'string' },
  detailUrl: { key: 'detail_url', type: 'string' }
};

export { OrderResponse, CheckoutApiOrderResponse, CheckoutOrder };
