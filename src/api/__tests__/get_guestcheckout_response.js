/* eslint no-magic-numbers: [0] */

import test from 'ava';
import fetchMock from 'fetch-mock';
import AtlasSDK from '../../index';

const fs = require('fs');
const path = require('path');
const json = fs.readFileSync(path.join(__dirname, 'data/get_guestcheckout_response.json'), 'utf8');
const configJson = fs.readFileSync(path.join(__dirname, 'data/config_service_response.json'), 'utf8');

test('Should create guest checkout with Prepayment successfully', async t => {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);
  fetchMock.get('https://atlas-checkout-gateway.com/guest-checkout/api/checkouts/123/123', json);

  const sdk = await AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    is_sandbox: true
  });

  const getCheckoutResponse = {
    cart: {
      items: [{
        sku: 'ZZGZ00007-F110025000',
        quantity: 1
      }],
      items_out_of_stock: [],
      gross_total: {
        amount: 25,
        currency: 'EUR'
      },
      tax_total: {
        amount: 0,
        currency: 'EUR'
      }
    },
    billing_address: {
      gender: 'MALE',
      first_name: 'Ahmed',
      last_name: 'Ahmed',
      street: 'Mollstr, 1',
      zip: '10178',
      city: 'Berlin',
      country_code: 'DE'
    },
    shipping_address: {
      gender: 'MALE',
      first_name: 'Ahmed',
      last_name: 'Ahmed',
      street: 'Mollstr, 1',
      zip: '10178',
      city: 'Berlin',
      country_code: 'DE'
    },
    payment: {
      selection_page_url: 'https://payment-gateway.kohle-integration.zalan.do/'
     + 'payment-method-selection-session/'
    + '29f84add-0f47-4c17-8941-3ffa5baa5b7d/selection'
    },
    delivery: {
      service: 'STANDARD',
      cost: {
        amount: 0,
        currency: 'EUR'
      },
      earliest: '2016-12-16T15:22:11.823Z',
      latest: '2016-12-17T15:22:11.823Z'
    }
  };
  const getCheckoutObject = await sdk.getCheckout('123', '123');

  t.is(getCheckoutObject.delivery.service, getCheckoutResponse.delivery.service);
  fetchMock.restore();


});
