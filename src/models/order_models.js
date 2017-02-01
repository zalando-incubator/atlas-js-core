import { Address } from './address_models';
import { Price } from './article_models';

const OrderResponse = {
  orderNumber: { key: 'order_number', type: 'string' },
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
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
