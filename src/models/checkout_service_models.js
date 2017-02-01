import createModel from './base_model';
import { Item, ItemWithPrice, Price, Delivery, DeliverySchema } from './article_models';
import { Address } from './address_models';
import { CheckoutApiOrderResponse, CheckoutOrder } from './order_models';

const DiscountSchema = {
  grossTotal: { key: 'grossTotal', type: 'object', model: Price },
  taxTotal: { key: 'taxTotal', type: 'object', model: Price }
};

const CheckoutCouponDiscount = createModel({
  remaining: { key: 'remaining', type: 'object', model: Price },
  ...DiscountSchema
});

const DeliveryRequest = createModel({
  service: { key: 'service', type: 'string' }
});

const CreateCartRequest = createModel({
  items: { key: 'items', type: 'object', model: Item }
});

const CheckoutDelivery = createModel({
  service: { key: 'service', type: 'string' },
  cost: { key: 'cost', type: 'object', model: Price },
  options: { key: 'options', type: 'string' },
  ...DeliverySchema
});

const SelectedPayment = createModel({
  method: { key: 'method', type: 'string' },
  metadata: { key: 'metadata', type: 'object' },
  externalPayment: { key: 'external_payment', type: 'boolean' }
});

const Payment = createModel({
  selected: { key: 'selected', type: 'object', model: SelectedPayment },
  selectionPageUrl: { key: 'selection_page_url', type: 'string' }
});

const CheckoutCouponDetails = createModel({
  coupon: { key: 'coupon', type: 'string' },
  warning: { key: 'warning', type: 'string' },
  error: { key: 'error', type: 'string' },
  discount: { key: 'discount', type: 'object', model: CheckoutCouponDiscount }
});

const CartResponse = createModel({
  id: { key: 'id', type: 'number' },
  items: { key: 'items', type: 'object', model: ItemWithPrice },
  itemsOutOfStock: { key: 'items_out_of_stock', type: 'string', optional: true },
  delivery: { key: 'delivery', type: 'object', model: Delivery },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  taxTotal: { key: 'tax_total', type: 'object', model: Price },
  totalDiscount: { key: 'total_discount', type: 'object', model: createModel(DiscountSchema) }
});

const CreateCheckoutRequest = createModel({
  cartId: { key: 'cart_id', type: 'number' },
  billingAddressId: { key: 'billing_address_id', type: 'number', optional: true },
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddressId: { key: 'shipping_address_id', type: 'number', optional: true },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
  delivery: { key: 'delivery', type: 'object', model: DeliveryRequest },
  coupons: { key: 'coupons', type: 'string' }
});

const CheckoutResponse = createModel({
  id: { key: 'id', type: 'string' },
  customerNumber: { key: 'customer_number', type: 'string' },
  cartId: { key: 'cart_id', type: 'string' },
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddress: { key: 'billing_address', type: 'object', model: Address },
  delivery: { key: 'delivery', type: 'object', model: CheckoutDelivery },
  couponDetails: { key: 'coupon_details', type: 'object', model: CheckoutCouponDetails },
  payment: { key: 'payment', type: 'object', model: Payment }
});

const PutCheckoutRequest = createModel({
  billingAddressId: { key: 'billing_address_id', type: 'number', optional: true },
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddressId: { key: 'shipping_address_id', type: 'number', optional: true },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
  delivery: { key: 'delivery', type: 'object', model: DeliveryRequest },
  coupons: { key: 'coupons', type: 'string' }
});

const CheckoutOrderResponse = createModel(CheckoutApiOrderResponse);

const CheckoutGetOrderResponses = createModel(CheckoutOrder);

const CheckoutOrderRequest = createModel({
  checkoutId: { key: 'checkout_id', type: 'string' }
});

export { CreateCartRequest, CartResponse, CreateCheckoutRequest, CheckoutResponse, PutCheckoutRequest,
  CheckoutOrderResponse, CheckoutGetOrderResponses, CheckoutOrderRequest };
