import test from 'ava';
import { GuestCustomer, CheckoutCustomer } from '../customer_model.js';


test('Checkout customer should be initialized from JSON object', t => {
  const json = {
    email: 'john.doe@example.com',
    subscribe_newsletter: true
  };

  const customer = new GuestCustomer(json);

  t.is(customer.email, 'john.doe@example.com');
  t.true(customer.subscribeNewsletter);

});

test('Checkout customer should be initialized from JSON object', t => {
  const json = {
    customer_number: 1,
    gender: 'MALE',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com'
  };

  const customer = new CheckoutCustomer(json);

  t.is(customer.customerNumber, 1);
  t.is(customer.gender, 'MALE');
  t.is(customer.firstName, 'John');
  t.is(customer.lastName, 'Doe');
  t.is(customer.email, 'john.doe@example.com');

});
