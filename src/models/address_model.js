import createModel from './base_model.js';
import Address from './base-models/base_address_model.js';

const GuestAddress = createModel(Address);

const CheckoutAddress = createModel(Object.assign(
  {
    id: { key: 'id', type: 'number' },
    customerNumber: { key: 'customer_number', type: 'number' },
    additional: { key: 'additional', type: 'string', optional: true },
    defaultBilling: { key: 'default_billing', type: 'boolean' },
    defaultShipping: { key: 'default_shipping', type: 'boolean' }
  }, Address));

export { CheckoutAddress, GuestAddress };
