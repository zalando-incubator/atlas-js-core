/* eslint no-magic-numbers: [0] */

import test from 'ava';
import fetchMock from 'fetch-mock';
import configureSDK from './helpers/AtlasTestSDK';
import { GetCheckoutResponse } from '../../models/guest_checkout_models';

const fs = require('fs');
const path = require('path');
const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/get_guestcheckout_response.json'), 'utf8'));

test('Should create guest checkout with Prepayment successfully', async t => {
  const sdk = await configureSDK();

  fetchMock.get('https://atlas-checkout-gateway.com/guest-checkout/api/checkouts/123/123', json);

  const getCheckoutObject = await sdk.getGuestCheckout('123', '123');

  t.deepEqual(getCheckoutObject, new GetCheckoutResponse(json));

  fetchMock.restore();


});
