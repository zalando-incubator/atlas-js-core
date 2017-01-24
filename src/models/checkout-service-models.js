import createModel from './base_model';
import { Item, ItemWithPrice, Price, Delivery, TotalDiscount } from './base-models/base_article_model';
import Address from './base-models/base_address_model';

const DeliveryRequest = createModel({
  service: { key: 'service', type: 'string' }
});

const CreateCartRequest = createModel({
  items: { key: 'items', type: 'object', model: Item }
});

const CartResponse = createModel({
  id: { key: 'id', type: 'number' },
  items: { key: 'items', type: 'object', model: ItemWithPrice },
  itemsOutOfStock: { key: 'items_out_of_stock', type: 'string', optional: true },
  delivery: { key: 'delivery', type: 'object', model: Delivery },
  grossTotal: { key: 'gross_total', type: 'object', model: Price },
  taxTotal: { key: 'tax_total', type: 'object', model: Price },
  totalDiscount: { key: 'total_discount', type: 'object', model: TotalDiscount }
});

const CreateCheckoutRequest = createModel({
  cartId: { key: 'cart_id', type: 'number' },
  billingAddressId: { key: 'billing_address_id', type: 'number' },
  billingAddress: { key: 'billing_address', type: 'object', model: createModel(Address) },
  shippingAddressId: { key: 'shipping_address_id', type: 'number' },
  shippingAddress: { key: 'shipping_address', type: 'object', model: createModel(Address) },
  delivery: { key: 'delivery', type: 'object', model: DeliveryRequest },
  coupons: { key: 'coupons', type: 'string' }
});

export { CreateCartRequest, CartResponse, CreateCheckoutRequest };
