/* eslint no-magic-numbers: [0] */

import test from 'ava';
import fetchMock from 'fetch-mock';
import AtlasSDK from '../../index';

const fs = require('fs');
const path = require('path');
const json = fs.readFileSync(path.join(__dirname, 'data/guest_checkout_service_response.json'), 'utf8');
const configJson = fs.readFileSync(path.join(__dirname, 'data/config_service_response.json'), 'utf8');

test('Should create guest checkout with Prepayment successfully', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);
  fetchMock.post('https://atlas-checkout-gateway.com/guest-checkout/api/orders', json);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    environment: 'staging'
  });

  const createOrderRequestJson = {
    customer: {
      email: 'jdoe@zalando.com',
      subscribe_newsletter: true
    },
    billing_address: {
      gender: 'MALE',
      first_name: 'John',
      last_name: 'Doe',
      street: 'Mollstr. 1',
      zip: '10001',
      city: 'Berlin',
      country_code: 'DE'
    },
    shipping_address: {
      gender: 'MALE',
      first_name: 'John',
      last_name: 'Doe',
      zip: '10001',
      city: 'Berlin',
      country_code: 'DE',
      pickup_point: {
        name: 'PACKSTATION',
        id: '801',
        member_id: '111444777'
      }
    },
    cart: {
      items: [{
        sku: 'C5154C00I-C110035000',
        quantity: 1
      }]
    },
    payment: {
      method: 'PREPAYMENT'
    }
  };
  const createOrderResponse = await sdk.createGuestCheckout(JSON.stringify(createOrderRequestJson));

  t.is(createOrderResponse.orderNumber, '1');
  t.is(createOrderResponse.externalPaymentURL, 'https://pay.paypal.com/ae45f19');
  fetchMock.restore();

  const response = new Response(null, { status: 204, headers: { Location: 'redirect' } });

  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);
  fetchMock.post('https://atlas-checkout-gateway.com/guest-checkout/api/orders', response);

  const createOrderRequestWithoutPaymentJson = {
    customer: {
      email: 'jdoe@zalando.com',
      subscribe_newsletter: true
    },
    billing_address: {
      gender: 'MALE',
      first_name: 'John',
      last_name: 'Doe',
      street: 'Mollstr. 1',
      zip: '10001',
      city: 'Berlin',
      country_code: 'DE'
    },
    shipping_address: {
      gender: 'MALE',
      first_name: 'John',
      last_name: 'Doe',
      street: 'Mollstr. 1',
      zip: '10001',
      city: 'Berlin',
      country_code: 'DE'
    },
    cart: {
      items: [{
        sku: 'C5154C00I-C110035000',
        quantity: 1
      }]
    }
  };

  const createOrderResponseWithoutPayment = await sdk.createGuestCheckout(
    JSON.stringify(createOrderRequestWithoutPaymentJson));

  t.is(createOrderResponseWithoutPayment.redirectURL, 'redirect');
  fetchMock.restore();
});
