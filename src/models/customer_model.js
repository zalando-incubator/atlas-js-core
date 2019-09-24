import createModel from './base_model';

/**
 * @class Class for Guest Customer model
 * @param {String} email - the id of the billing address.
 * @param {Boolean} subscribeNewsletter - subscribe to the newsletter.
 * @constructor
 */
const GuestCustomer = createModel({
  email: { key: 'email', type: 'string' },
  subscribeNewsletter: { key: 'subscribe_newsletter', type: 'boolean' }
});

/**
 * @class Class for Guest Customer model
 * @param {String} customerNumber - the customer number.
 * @param {String} customerHash - the customer hash.
 * @param {String} gender - the gender.
 * @param {String} firstName - the first name.
 * @param {String} lastName - the last name.
 * @param {String} email - the email address.
 * @constructor
 */
const CheckoutCustomer = createModel({
  customerNumber: { key: 'customer_number', type: 'string' },
  customerHash: { key: 'customer_hash', type: 'string' },
  gender: { key: 'gender', type: 'string' },
  firstName: { key: 'first_name', type: 'string' },
  lastName: { key: 'last_name', type: 'string' },
  email: { key: 'email', type: 'string' }
});

export { GuestCustomer, CheckoutCustomer };
