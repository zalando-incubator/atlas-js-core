import createModel from './base_model.js';
import { Address, NormalizedAddress } from './base-models/base_address_model.js';

const GuestAddress = createModel(Address);

const CheckoutAddress = createModel(Object.assign(
  {
    id: { key: 'id', type: 'string' },
    customerNumber: { key: 'customer_number', type: 'string' },
    additional: { key: 'additional', type: 'string', optional: true },
    defaultBilling: { key: 'default_billing', type: 'boolean' },
    defaultShipping: { key: 'default_shipping', type: 'boolean' }
  }, Address));

const CheckedAddress = createModel({
  status: { key: 'status', type: 'string' },
  normalizedAddress: { key: 'normalized_address', type: 'object', model: createModel(NormalizedAddress) }
});

export { CheckoutAddress, GuestAddress, CheckedAddress };
