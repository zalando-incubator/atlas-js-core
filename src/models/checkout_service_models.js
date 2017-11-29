import createModel from './base_model';
import { Item, ItemWithPrice, Price, Delivery, DeliverySchema } from './article_models';
import { Address } from './address_models';
import { CheckoutApiOrderResponse, CheckoutOrder } from './order_models';

/**
 * @class Class for Discount model
 * @param {Price} grossTotal - gross total of the discount.
 * @param {Price} taxTotal - tax total of the discount.
 * @constructor
 */
const DiscountSchema = {
  gross: { key: 'gross', type: 'object', model: Price, optional: true },
  tax: { key: 'tax', type: 'object', model: Price, optional: true }
};

/**
 * @class Class for Checkout Discount model
 * @param {Price} remaining - remaining amount.
 * @param {Price} grossTotal - gross total of the discount.
 * @param {Price} taxTotal - tax total of the discount.
 * @constructor
 */
const CheckoutCouponDiscountSchema = {
  remaining: { key: 'remaining', type: 'object', model: Price, optional: true },
  gross: { key: 'gross', type: 'object', model: Price, optional: true }
};

const CheckoutCouponDiscount = createModel(Object.assign({}, CheckoutCouponDiscountSchema, DeliverySchema));


/**
 * @class Class for Delivery Request model
 * @param {String} service - the delivery service.
 * @constructor
 */
const DeliveryRequest = createModel({
  service: { key: 'service', type: 'string' }
});

/**
 * @class Class for Cart Request model
 * @param {Items} items - a list of items.
 * @constructor
 */
const CreateCartRequest = createModel({
  items: { key: 'items', type: 'object', model: Item }
});

/**
 * @class Class for Checkout Delivery model
 * @param {String} service - the delivery service.
 * @param {Price} cost - the delivery cost.
 * @param {String} options - the delivery options.
 * @param {String} earliest - Delivery earliest date.
 * @param {String} latest - Delivery latest date.
 * @constructor
 */
const CheckoutDeliverySchema = {
  service: { key: 'service', type: 'string' },
  cost: { key: 'cost', type: 'object', model: Price },
  options: { key: 'options', type: 'string' }
};

const CheckoutDelivery = createModel(Object.assign({}, CheckoutDeliverySchema, DeliverySchema));

/**
 * @class Class for Selected Payment model
 * @param {String} method - Payment Method type.
 * @param {Object} metadata - Metadata for payment.
 * @param {Boolean} externalPayment - is an external payment provider used.
 * @constructor
 */
const SelectedPayment = createModel({
  method: { key: 'method', type: 'string' },
  metadata: { key: 'metadata', type: 'object', optional: true },
  externalPayment: { key: 'external_payment', type: 'boolean' }
});

/**
 * @class Class for Payment model
 * @param {SelectedPayment} selected - the selected payment.
 * @param {String} selectionPageUrl - URL of the payment selection page.
 * @constructor
 */
const Payment = createModel({
  selected: { key: 'selected', type: 'object', model: SelectedPayment, optional: true },
  selectionPageUrl: { key: 'selection_page_url', type: 'string' }
});

/**
 * @class Class for Checkout Coupon Details model
 * @param {String} coupon - the coupon.
 * @param {String} warning - warnings regardings coupons.
 * @param {String} error - errors regardings coupons.
 * @param {CheckoutCouponDiscount} discount - the discount.
 * @constructor
 */
const CheckoutCouponDetails = createModel({
  coupon: { key: 'coupon', type: 'string' },
  warning: { key: 'warning', type: 'string', optional: true },
  error: { key: 'error', type: 'string', optional: true },
  discount: { key: 'discount', type: 'object', model: CheckoutCouponDiscount, optional: true }
});

/**
 * @class Class for Cart Response model
 * @param {String} id - the response id.
 * @param {ItemWithPrice} items - the items with price.
 * @param {String} itemsOutOfStock - a list of items that are out of stock.
 * @param {Delivery} delivery - the delivery information.
 * @param {Price} grossTotal - the gross total.
 * @param {Price} taxTotal - the tax total.
 * @param {DiscountSchema} totalDiscount - the total discount.
 * @constructor
 */
const CartResponse = createModel({
  id: { key: 'id', type: 'string' },
  items: { key: 'items', type: 'object', model: ItemWithPrice },
  itemsOutOfStock: { key: 'items_out_of_stock', type: 'string', optional: true },
  delivery: { key: 'delivery', type: 'object', model: Delivery },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  taxTotal: { key: 'tax_total', type: 'object', model: Price },
  totalDiscount: { key: 'total_discount', type: 'object', model: createModel(DiscountSchema) }
});

/**
 * @class Class for Checkout Request model
 * @param {String} id - the cart id.
 * @param {String} billingAddressId - the id of the billing address.
 * @param {Address} billingAddress - the billing address.
 * @param {String} shippingAddressId - the id of the shipping address.
 * @param {Address} shippingAddress - the shipping address.
 * @param {DeliveryRequest} delivery - the desired delivery type.
 * @param {String} coupons - a coupon.
 * @constructor
 */
const CreateCheckoutRequest = createModel({
  cartId: { key: 'cart_id', type: 'string' },
  billingAddressId: { key: 'billing_address_id', type: 'number', optional: true }, // TODO delete address ids
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddressId: { key: 'shipping_address_id', type: 'number', optional: true },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
  delivery: { key: 'delivery', type: 'object', model: DeliveryRequest },
  coupons: { key: 'coupons', type: 'string' }
});

/**
 * @class Class for Checkout Response model
 * @param {String} id - the response id.
 * @param {String} customerNumber - the customer number.
 * @param {String} cartId - the id of the cart id.
 * @param {Address} billingAddress - the billing address.
 * @param {Address} shippingAddress - the shipping address.
 * @param {CheckoutDelivery} delivery - the delivery type.
 * @param {CheckoutCouponDetails} couponDetails - the coupon details.
 * @param {Payment} payment - the payment selection.
 * @constructor
 */
const CheckoutResponse = createModel({
  id: { key: 'id', type: 'string' },
  customerNumber: { key: 'customer_number', type: 'string' },
  cartId: { key: 'cart_id', type: 'string' },
  billingAddress: { key: 'billing_address', type: 'object', model: Address },
  shippingAddress: { key: 'shipping_address', type: 'object', model: Address },
  delivery: { key: 'delivery', type: 'object', model: CheckoutDelivery },
  couponDetails: { key: 'coupon_details', type: 'object', model: CheckoutCouponDetails, optional: true },
  payment: { key: 'payment', type: 'object', model: Payment }
});

/**
 * @class Class for Put Checkout Request model
 * @param {String} billingAddressId - the id of the billing address.
 * @param {Address} billingAddress - the billing address.
 * @param {String} shippingAddressId - the id of the shipping address.
 * @param {Address} shippingAddress - the shipping address.
 * @param {DeliveryRequest} delivery - the desired delivery type.
 * @param {String} coupons - a coupon.
 * @constructor
 */
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

/**
 * @class Class for Checkout Order Request model
 * @param {String} checkoutId - the id of the checkout.
 * @constructor
 */
const CheckoutOrderRequest = createModel({
  checkoutId: { key: 'checkout_id', type: 'string' }
});

export {
  CreateCartRequest, CartResponse, CreateCheckoutRequest, CheckoutResponse, PutCheckoutRequest,
  CheckoutOrderResponse, CheckoutGetOrderResponses, CheckoutOrderRequest
};
