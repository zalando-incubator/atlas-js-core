import createModel from './base_model.js';
import Address from './base-models/base_address_model';
import { PriceSchema } from './base-models/base_article_model';

const OrderAddress = createModel(Address);
const Price = createModel(PriceSchema);

const OrderResponse = {
  orderNumber: { key: 'order_number', type: 'string' },
  billingAddress: { key: 'billing_address', type: 'object', model: OrderAddress },
  shippingAddress: { key: 'shipping_address', type: 'object', model: OrderAddress },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  taxTotal: { key: 'tax_total', type: 'object', model: Price },
  created: { key: 'created', type: 'string' },
  externalPaymentURL: { key: 'external_payment_url', type: 'string', optional: true }
};


const CheckoutApiOrderResponse = {
  customerNumber: { key: 'customer_number', type: 'string' },
  ...OrderResponse
};

const CheckoutOrder = {
  orderNumber: { key: 'order_number', type: 'string' },
  customerNumber: { key: 'customer_number', type: 'string' },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  created: { key: 'created', type: 'string' },
  detailUrl: { key: 'detail_url', type: 'string' }
};

export { OrderResponse, CheckoutApiOrderResponse, CheckoutOrder };
