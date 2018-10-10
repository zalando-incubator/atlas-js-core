/* eslint no-magic-numbers : [0] */

import test from 'ava';
import fetchMock from 'fetch-mock';
import configureSDK from './helpers/AtlasTestSDK';
import { CheckoutCustomer } from '../../models/customer_model';
import { CheckoutAddress, CheckedAddress } from '../../models/address_models';
import {
  CartsResponse,
  CartResponse,
  CheckoutResponse,
  CheckoutOrderResponse,
  CheckoutGetOrderResponses
} from '../../models/checkout_service_models';


const fs = require('fs');
const path = require('path');

test('Should get customer details successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_customer_response.json'), 'utf8'));


  fetchMock.get('https://atlas-checkout-api.com/api/customer', json);

  const customer = await sdk.getCheckoutCustomer('TOKEN');

  t.deepEqual(customer, new CheckoutCustomer(json));

});

test('Should get addresses successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_addresses_response.json'), 'utf8'));
  const array = [];

  fetchMock.get('https://atlas-checkout-api.com/api/addresses', json);

  const addresses = await sdk.getCheckoutAddresses('TOKEN');

  array.push(new CheckoutAddress(json[0]));

  t.deepEqual(addresses, array);

});

test('Should create address successfully after configuring SDK', async t => {
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
      id: '802',
      member_id: '45685217'
    },
    default_billing: true,
    default_shipping: false
  };

  const addresses = await sdk.createCheckoutAddress(req);


  t.deepEqual(addresses, new CheckoutAddress(json));

});


test('Should get single address successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_address_response.json'), 'utf8'));

  fetchMock.get('https://atlas-checkout-api.com/api/addresses/123', json);


  const addresses = await sdk.getCheckoutAddress(123);


  t.deepEqual(addresses, new CheckoutAddress(json));

});

test('Should update address successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_address_response.json'), 'utf8'));

  fetchMock.put('https://atlas-checkout-api.com/api/addresses/123', json);

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
      id: '802',
      member_id: '45685217'
    },
    default_billing: true,
    default_shipping: false
  };

  const addresses = await sdk.putCheckoutAddress(req, 123);


  t.deepEqual(addresses, new CheckoutAddress(json));

});

test('Should check address successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json
    = fs.readFileSync(path.join(__dirname, 'data/checkout_service_address_check_response.json'), 'utf8');

  fetchMock.post('https://atlas-checkout-api.com/api/address-checks', json);

  const req = {
    address: {
      street: 'Mollstr. 1',
      additional: 'EG',
      zip: '10178',
      city: 'Berlin',
      country_code: 'DE'
    },
    pickup_point: {
      name: 'PACKSTATION',
      id: '802',
      member_id: 45685217
    }
  };


  const addresses = await sdk.checkAddress(req);

  t.deepEqual(addresses, new CheckedAddress(JSON.parse(json)));
});

test('Should get carts successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_get_carts_response.json'), 'utf8'));

  fetchMock.get('https://atlas-checkout-api.com/api/carts', json);


  const cart = await sdk.getCheckoutCarts('token');

  t.deepEqual(cart, new CartsResponse(json));

});

test('Should create cart successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_cart_response.json'), 'utf8'));

  fetchMock.post('https://atlas-checkout-api.com/api/carts', json);


  const req = {
    items: [
      {
        sku: 'ME142C002-Q110500000',
        quantity: 2
      }
    ]
  };

  const cart = await sdk.createCheckoutCart(req);

  t.deepEqual(cart, new CartResponse(json));

});

test('Should get cart successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_cart_response.json'), 'utf8'));

  fetchMock.get('https://atlas-checkout-api.com/api/carts/123', json);


  const cart = await sdk.getCheckoutCart(123);

  t.deepEqual(cart, new CartResponse(json));

});

test('Should update cart successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_cart_response.json'), 'utf8'));

  fetchMock.put('https://atlas-checkout-api.com/api/carts/123', json);

  const req = {
    items: [
      {
        sku: 'ME142C002-Q110500000',
        quantity: 2
      }
    ]
  };

  const cart = await sdk.putCheckoutcart(req, 123);

  t.deepEqual(cart, new CartResponse(json));

});

test('Should create checkout successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_checkout_response.json'), 'utf8'));

  fetchMock.post('https://atlas-checkout-api.com/api/checkouts', json);


  const req = {
    cart_id: '1',
    billing_address_id: '1',
    billing_address: {
      gender: 'MALE',
      first_name: 'John',
      last_name: 'Doe',
      street: 'Mollstr. 1',
      additional: 'EG',
      zip: '10178',
      city: 'Berlin',
      country_code: 'DE'
    },
    shipping_address_id: '1',
    shipping_address: {
      gender: 'MALE',
      first_name: 'John',
      last_name: 'Doe',
      street: 'Eatside. 1',
      additional: 'EG',
      zip: '10178',
      city: 'Berlin',
      country_code: 'DE',
      pickup_point: {
        name: 'PACKSTATION',
        id: '802',
        member_id: '45685217'
      }
    },
    delivery: {
      service: 'STANDARD'
    },
    coupons: [
      'COUPON_1'
    ]
  };

  const checkout = await sdk.createCheckout(req);

  t.deepEqual(checkout, new CheckoutResponse(json));

});

test('Should get checkout successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_checkout_response.json'), 'utf8'));

  fetchMock.get('https://atlas-checkout-api.com/api/checkouts/123', json);


  const cart = await sdk.getCheckout(123);

  t.deepEqual(cart, new CheckoutResponse(json));

});

test('Should update checkout successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_checkout_response.json'), 'utf8'));

  fetchMock.put('https://atlas-checkout-api.com/api/checkouts/123', json);

  const req = {
    billing_address_id: '1',
    billing_address: {
      gender: 'MALE',
      first_name: 'John',
      last_name: 'Doe',
      street: 'Mollstr. 1',
      additional: 'EG',
      zip: 10178,
      city: 'Berlin',
      country_code: 'DE'
    },
    shipping_address_id: '1',
    shipping_address: {
      id: 1,
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
        id: '802',
        member_id: '45685217'
      }
    },
    delivery: {
      service: 'STANDARD'
    },
    coupons: [
      'COUPON_1'
    ]
  };

  const cart = await sdk.putCheckout(req, 123);

  t.deepEqual(cart, new CheckoutResponse(json));

});

test('Should get checkout orders successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_api_service_orders_response.json'), 'utf8'));

  const array = [];

  fetchMock.get('https://atlas-checkout-api.com/api/orders', json);

  array.push(new CheckoutGetOrderResponses(json[0]));
  const order = await sdk.getOrders();

  t.deepEqual(order, array);

});

test('Should create checkout orders successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_order_response.json'), 'utf8'));

  fetchMock.post('https://atlas-checkout-api.com/api/orders', json);


  const req = {
    checkout_id: 1
  };

  const checkout = await sdk.createOrder(req);

  t.deepEqual(checkout, new CheckoutOrderResponse(json));

});


test('Should get one checkout order successfully after configuring SDK', async t => {
  const sdk = await configureSDK();
  const json = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/checkout_service_create_order_response.json'), 'utf8'));

  fetchMock.get('https://atlas-checkout-api.com/api/orders/123', json);

  const order = await sdk.getOrder(123);

  t.deepEqual(order, new CheckoutOrderResponse(json));

});

test.afterEach.always(() => {
  fetchMock.restore();
});
