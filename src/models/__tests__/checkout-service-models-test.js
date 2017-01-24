/* eslint no-magic-numbers : 0 */

import test from 'ava';
import { CreateCartRequest, CartResponse, CreateCheckoutRequest } from '../checkout-service-models.js';

test('CreateCartRequest should be initialized from JSON object', t => {
  const json = {
    items: [
      {
        sku: 'ME142C002-Q110500000',
        quantity: 2
      }
    ]
  };

  const createCart = new CreateCartRequest(json);


  t.is(createCart.items[0].sku, 'ME142C002-Q110500000');
  t.is(createCart.items[0].quantity, 2);
});


test('CartResponse should be initialized from JSON object', t => {
  const json = {
    id: 1,
    items: [
      {
        sku: 'ME142C002-Q110500000',
        quantity: 3,
        price: {
          amount: 99.95,
          currency: 'EUR'
        },
        original_price: {
          amount: 99.95,
          currency: 'EUR'
        }
      }
    ],
    items_out_of_stock: [
      'ME142C002-Q110500001'
    ],
    delivery: {
      earliest: '2015-04-21T13:27:31+01:00',
      latest: '2015-04-23T13:27:31+01:00'
    },
    gross_total: {
      amount: 99.95,
      currency: 'EUR'
    },
    tax_total: {
      amount: 99.95,
      currency: 'EUR'
    },
    total_discount: {
      grossTotal: {
        amount: 99.95,
        currency: 'EUR'
      },
      taxTotal: {
        amount: 99.95,
        currency: 'EUR'
      }
    }
  };

  const createCartResponse = new CartResponse(json);

  t.is(createCartResponse.id, 1);
});

test('CreateCheckoutRequest is initialized from JSON object', t => {
  const json = {
    cart_id: 1,
    billing_address_id: 1,
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
    shipping_address_id: 1,
    shipping_address: {
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
      }
    },
    delivery: {
      service: 'STANDARD'
    },
    coupons: [
      'COUPON_1'
    ]
  };
  const createCheckoutRequest = new CreateCheckoutRequest(json);

  t.is(createCheckoutRequest.cartId, 1);
  t.is(createCheckoutRequest.billingAddressId, 1);
  t.is(createCheckoutRequest.billingAddress.street, 'Mollstr. 1');
  t.is(createCheckoutRequest.shippingAddressId, 1);
  t.is(createCheckoutRequest.shippingAddress.firstName, 'John');
  t.is(createCheckoutRequest.delivery.service, 'STANDARD');
  t.is(createCheckoutRequest.coupons[0], 'COUPON_1');

});
