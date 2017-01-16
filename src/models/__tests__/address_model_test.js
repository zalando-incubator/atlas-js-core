import test from 'ava';
import { CheckoutAddress, GuestAddress } from '../address_model.js';


const ADRESS_ID = 1;
const CUSTOMER_NR = 1;


test('Addresses should be initialized from JSON object', t => {
  const json = {
    gender: 'MALE',
    first_name: 'John',
    last_name: 'Doe',
    street: 'Mollstr. 1',
    zip: '10178',
    city: 'Berlin',
    country_code: 'DE',
    pickup_point: {
      name: 'PACKSTATION',
      id: '802',
      member_id: '45685217'
    }

  };

  const address = new GuestAddress(json);

  t.is(address.gender, 'MALE');
  t.is(address.firstName, 'John');
  t.is(address.lastName, 'Doe');
  t.is(address.street, 'Mollstr. 1');
  t.is(address.zip, '10178');
  t.is(address.city, 'Berlin');
  t.is(address.countryCode, 'DE');
  t.is(address.pickupPoint.name, 'PACKSTATION');
  t.is(address.pickupPoint.id, '802');
  t.is(address.pickupPoint.memberId, '45685217');

});

test('Checkout addresses should be initialized from JSON object', t => {
  const json = {
    id: 1,
    customer_number: 1,
    gender: 'MALE',
    first_name: 'John',
    last_name: 'Doe',
    street: 'Mollstr. 1',
    additional: 'EG',
    zip: '10178',
    city: 'Berlin',
    country_code: 'DE',
    pickup_point: {
      name: 'PACKSTATION',
      id: '802',
      member_id: '45685217'
    },
    default_billing: true,
    default_shipping: false
  };

  const address = new CheckoutAddress(json);

  t.is(address.id, ADRESS_ID);
  t.is(address.customerNumber, CUSTOMER_NR);
  t.is(address.gender, 'MALE');
  t.is(address.firstName, 'John');
  t.is(address.lastName, 'Doe');
  t.is(address.street, 'Mollstr. 1');
  t.is(address.additional, 'EG');
  t.is(address.zip, '10178');
  t.is(address.city, 'Berlin');
  t.is(address.countryCode, 'DE');
  t.is(address.pickupPoint.name, 'PACKSTATION');
  t.is(address.pickupPoint.id, '802');
  t.is(address.pickupPoint.memberId, '45685217');
  t.is(address.defaultBilling, true);
  t.is(address.defaultShipping, false);

});
