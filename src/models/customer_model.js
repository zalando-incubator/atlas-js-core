import createModel from './base_model.js';
import Customer from './base-models/base_customer_model.js';

const GuestCustomer = createModel(Object.assign(
  {
    subscribeNewsletter: { key: 'subscribe_newsletter', type: 'boolean' }
  }, Customer));

const CheckoutCustomer = createModel(Object.assign(
  {
    customerNumber: { key: 'customer_number', type: 'number' },
    gender: { key: 'gender', type: 'string' },
    firstName: { key: 'first_name', type: 'string' },
    lastName: { key: 'last_name', type: 'string' },
    email: { key: 'email', type: 'string' }
  }, Customer));

export { GuestCustomer, CheckoutCustomer };
