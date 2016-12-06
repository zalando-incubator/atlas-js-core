/* eslint no-magic-numbers: [0]*/
import test from 'ava';
import { Customer, Address, Cart, Payment, Price,
  CreateOrderRequest, CreateOrderResponse, CreateOrderRedirectResponse } from '../guest_checkout_models.js';

test('Should create Customer successfully from JSON', t => {
  const json = {
    email: 'jdoe@zalando.com',
    subscribe_newsletter: true
  };
  const customer = new Customer(json);

  t.is(customer.email, 'jdoe@zalando.com');
});

test('Should create Address (Pickup Point) from JSON', t => {
  const json = {
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
  };

  const address = new Address(json);

  t.is(address.gender, 'MALE');
  t.is(address.firstName, 'John');
  t.is(address.lastName, 'Doe');
  t.is(address.zip, '10001');
  t.is(address.city, 'Berlin');
  t.is(address.countryCode, 'DE');
  t.is(address.pickupPoint.name, 'PACKSTATION');
  t.is(address.pickupPoint.id, '801');
  t.is(address.pickupPoint.memberId, '111444777');
});

test('Should create Address (Normal) from JSON', t => {
  const json = {
    gender: 'MALE',
    first_name: 'John',
    last_name: 'Doe',
    zip: '10001',
    city: 'Berlin',
    country_code: 'DE',
    street: 'Mollstr. 1'
  };

  const address = new Address(json);

  t.is(address.gender, 'MALE');
  t.is(address.firstName, 'John');
  t.is(address.lastName, 'Doe');
  t.is(address.zip, '10001');
  t.is(address.city, 'Berlin');
  t.is(address.countryCode, 'DE');
  t.is(address.street, 'Mollstr. 1');
});

test('Should create Cart from JSON', t => {
  const json = {
    items: [{
      sku: 'C5154C00I-C110035000',
      quantity: 1
    }]
  };
  const cart = new Cart(json);
  const quantity = 1;

  t.is(cart.items[0].sku, 'C5154C00I-C110035000');
  t.is(cart.items[0].quantity, quantity);
});

test('Should create Payment from JSON', t => {
  const json = {
    method: 'VIRTUAL_CREDIT_CARD',
    metadata: {
      type: 'MASTERCARD',
      holder: 'John Doe',
      number: '4111111111111111',
      expiry_month: '12',
      expiry_year: '2017',
      cvc: '123'
    }
  };

  const payment = new Payment(json);

  t.is(payment.method, 'VIRTUAL_CREDIT_CARD');
  t.is(payment.metadata.type, 'MASTERCARD');
  t.is(payment.metadata.holder, 'John Doe');
  t.is(payment.metadata.number, '4111111111111111');
  t.is(payment.metadata.expiry_month, '12');
  t.is(payment.metadata.expiry_year, '2017');
  t.is(payment.metadata.cvc, '123');
});


test('Should create Price from JSON', (t) => {
  const json = {
    amount: 99.95,
    currency: 'EUR'
  };

  const price = new Price(json);

  t.is(price.amount, 99.95);
  t.is(price.currency, 'EUR');
});

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
      method: 'VIRTUAL_CREDIT_CARD',
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
