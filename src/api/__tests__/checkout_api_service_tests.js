import test from 'ava';
import fetchMock from 'fetch-mock';
import configureSDK from './helpers/AtlasTestSDK';
import { CheckoutCustomer } from '../../models/customer_model';
import { CheckoutAddress } from '../../models/address_model';


const fs = require('fs');
const path = require('path');

test('Should get customer details successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_customer_response.json'), 'utf8'));


  fetchMock.get('https://atlas-checkout-api.com/api/customer', json);

  const customer = await sdk.getCheckoutCustomer();

  t.deepEqual(customer, new CheckoutCustomer(json));

});

test('Should get addresse successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_addresses_response.json'), 'utf8'));
  const array = [];

  fetchMock.get('https://atlas-checkout-api.com/api/addresses', json);

  const addresses = await sdk.getCheckoutAdresses();

  array.push(new CheckoutAddress(json[0]));

  t.deepEqual(addresses, array);

});

test('Should get addresse successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_address_response.json'), 'utf8'));

  fetchMock.post('https://atlas-checkout-api.com/api/addresses', json);

  const req = {
    gender: 'MALE',
    first_name: 'John',
    last_name: 'Doe',
    street: 'Mollstr. 1',
    additional: 'EG',
    zip: 10178,
    city: 'Berlin',
    country_code: 'DE',
    pickup_point: {
      name: 'PACKSTATION',
      id: 802,
      member_id: 45685217
    },
    default_billing: true,
    default_shipping: false
  };

  const addresses = await sdk.createCheckoutAddress(req);


  t.deepEqual(addresses, new CheckoutAddress(json));

});


test.afterEach.always(() => {
  fetchMock.restore();
});
