import test from 'ava';
import { CheckoutAddress, Address, CheckedAddress } from '../address_models';


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
      id: '802'
    }

  };

  const address = new Address(json);

  t.is(address.gender, 'MALE');
  t.is(address.firstName, 'John');
  t.is(address.lastName, 'Doe');
  t.is(address.street, 'Mollstr. 1');
  t.is(address.zip, '10178');
  t.is(address.city, 'Berlin');
  t.is(address.countryCode, 'DE');
  t.is(address.pickupPoint.name, 'PACKSTATION');
  t.is(address.pickupPoint.id, '802');
});

test('Checkout addresses should be initialized from JSON object', t => {
  const json = {
    id: '1',
    customer_number: '1',
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

  t.is(address.id, '1');
  t.is(address.customerNumber, '1');
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

test('CheckedAddress should be initialized from JSON object', t => {

  const json = {
    status: 'CORRECT',
    normalized_address: {
      street: 'Mollstr. 1',
      additional: 'EG',
      zip: '10178',
      city: 'Berlin',
      country_code: 'DE'
    }
  };

  const address = new CheckedAddress(json);

  t.is(address.status, 'CORRECT');
  t.is(address.normalizedAddress.street, 'Mollstr. 1');

});
