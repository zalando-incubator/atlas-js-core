import createModel from './base_model';

const GuestCustomer = createModel({
  email: { key: 'email', type: 'string' },
  subscribeNewsletter: { key: 'subscribe_newsletter', type: 'boolean' }
});

const CheckoutCustomer = createModel({
  customerNumber: { key: 'customer_number', type: 'number' },
  gender: { key: 'gender', type: 'string' },
  firstName: { key: 'first_name', type: 'string' },
  lastName: { key: 'last_name', type: 'string' },
  email: { key: 'email', type: 'string' }
});

export { GuestCustomer, CheckoutCustomer };
