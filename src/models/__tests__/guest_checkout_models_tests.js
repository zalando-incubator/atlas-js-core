import test from 'ava';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  CreateOrderRedirectResponse,
  GetCheckoutResponse
} from '../guest_checkout_models.js';

test('Should create CreateOrderRequest from JSON', t => {
  const json = {
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
      method: 'CREDIT_CARD',
      metadata: {
        type: 'MASTERCARD',
        holder: 'John Doe',
        number: '4111111111111111',
        expiry_month: '12',
        expiry_year: '2017',
        cvc: '123'
      }
    }
  };

  const req = new CreateOrderRequest(json);

  t.truthy(req);
});

test('Should create CreateOrderResponse from JSON', t => {
  const json = {
    order_number: '1',
    customer_number: '1',
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
    gross_total: {
      amount: 99.95,
      currency: 'EUR'
    },
    tax_total: {
      amount: 99.95,
      currency: 'EUR'
    },
    created: '2015-04-21T13:27:31+01:00',
    detail_url: 'https://www.zalando.de/benutzerkonto/bestellung-detail/123456789',
    external_payment_url: 'https://pay.paypal.com/ae45f19'
  };

  const res = new CreateOrderResponse(json);

  t.truthy(res);
});

test('Should create CreateOrderRedirectResponse from Location header', t => {
  const json = {
    redirect_url: 'redirect'
  };
  const res = new CreateOrderRedirectResponse(json);

  t.is(res.redirectURL, 'redirect');
});

test('Should create GetCheckoutResponse from JSON', t => {
  const json = {
    cart: {
      items: [{
        sku: 'ME142C002-Q110500000',
        quantity: 2
      }],
      items_out_of_stock: [
        'ME142C002-Q110500001'
      ],
      gross_total: {
        amount: 99.95,
        currency: 'EUR'
      },
      tax_total: {
        amount: 99.95,
        currency: 'EUR'
      }
    },
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
    payment: {
      method: 'PREPAYMENT',
      selection_page_url: 'http://pay.zalando.de/ae45f19'
    },
    delivery: {
      service: 'STANDARD',
      cost: {
        amount: 3.5,
        currency: 'EUR'
      },
      earliest: '2016-12-16T15:22:11.823Z',
      latest: '2016-12-17T15:22:11.823Z',
      options: [
        'STANDARD',
        'EXPRESS'
      ]
    }
  };

  const res = new GetCheckoutResponse(json);

  t.truthy(res);
});

test('Should be JSON.stringify()', t => {
  const json = {
    order_number: '1',
    customer_number: '1',
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
    gross_total: {
      amount: 99.95,
      currency: 'EUR'
    },
    tax_total: {
      amount: 99.95,
      currency: 'EUR'
    },
    created: '2015-04-21T13:27:31+01:00',
    detail_url: 'https://www.zalando.de/benutzerkonto/bestellung-detail/123456789',
    external_payment_url: 'https://pay.paypal.com/ae45f19'
  };

  const res = new CreateOrderResponse(json);
  const stringifyVersion = JSON.stringify(res);

  t.is(JSON.parse(stringifyVersion).orderNumber, '1');
});
