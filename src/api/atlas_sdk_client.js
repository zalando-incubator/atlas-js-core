/* eslint no-console: 0 */
/* eslint no-native-reassign: 0 */
require('isomorphic-fetch');

import { Article } from '../models/catalog_api_models';
import {
  CreateOrderResponse,
  CreateOrderRedirectResponse,
  GetCheckoutResponse
} from '../models/guest_checkout_models';

import { RecommendedArticles } from '../models/recommendation_models';
import { CheckoutCustomer } from '../models/customer_model';
import { CheckoutAddress, CheckedAddress } from '../models/address_models';
import {
  CartResponse,
  CheckoutResponse,
  CheckoutOrderResponse,
  CheckoutGetOrderResponses
} from '../models/checkout_service_models';

const successCode = 200;
const badRequestCode = 399;

/**
* Checks the status code of the Response.
* If the status code is <= 400 the Response object is returned.
* Otherwise the Error is thrown.
* @param {Response} response - Response object
* @return {Response} Response object
* @throws {Error} - error object accoding to the bad response.
*/
function checkStatus(response) {
  if (response.status >= successCode && response.status < badRequestCode) {
    return response;
  }
  const error = new Error(`${response.statusText}: ${response.status}`);

  error.response = response;
  throw error;
}

/**
* Checks whether "Location" header is preset.
* Location header means that this is a redirect response with empty body, so
* the Response object with simple JSON { redirect_url: 'URL'} will be returned.
* Otherwise initial Response object is returned.
* @param {Response} response - Response object
* @return {Response} Response object either original or with redirect URL
*/
function checkRedirect(response) {
  if (response.headers.get('Location')) {
    return new Response(JSON.stringify({ redirect_url: response.headers.get('Location') }));
  }
  return response;
}

function fetchEndpoint(endpoint) {
  return fetch(endpoint.url, {
    method: endpoint.method,
    mode: endpoint.mode,
    redirect: endpoint.redirect,
    headers: endpoint.headers,
    body: endpoint.body
  })
    .then(checkStatus)
    .then(checkRedirect)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return endpoint.transform(response);
    }).catch(error => {
      throw error;
    });
}

class AtlasSDKClient {
  constructor(config) {
    this.config = config;
  }

  getLocale() {
    return this.config.salesChannels.find(sc => sc.channel === this.config.salesChannel).locale;
  }

  getLanguage() {
    const startPosition = 0;

    return this.getLocale().substring(startPosition, this.getLocale().indexOf('_'));
  }

  getCountryCode() {
    const underscorePosition = 1;

    return this.getLocale().substring(this.getLocale().indexOf('_') + underscorePosition);
  }

  getArticle(sku) {
    const url = `${this.config.catalogApi.url}/articles/${sku}?client_id=${this.config.clientId}`;
    const CatalogEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.article+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel,
        'X-UID': this.config.clientId
      },
      transform: (json) => {
        return new Article(json);
      }
    };

    return fetchEndpoint(CatalogEndpoint).then(article => {
      return article;
    });
  }

  getGuestCheckout(checkoutId, token) {
    const url = `${this.config.atlasCheckoutGateway.url}/guest-checkout/api/checkouts/${checkoutId}/${token}`;
    const GetCheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x.zalando.guest-checkout+json',
        Accept: 'application/x.zalando.guest-checkout+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel,
        'X-UID': this.config.clientId,
        checkout_id: checkoutId,
        token: token
      },
      transform: (json) => {
        return new GetCheckoutResponse(json);
      }
    };

    return fetchEndpoint(GetCheckoutEndpoint).then(getCheckoutResponse => {
      return getCheckoutResponse;
    });
  }

  getConfig() {
    return this.config;
  }

  createGuestOrder(checkoutId, token) {
    const url = `${this.config.atlasCheckoutGateway.url}/guest-checkout/api/orders`;
    const body = JSON.stringify({
      checkout_id: checkoutId,
      token: token
    });
    const CreateOrderEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x.zalando.order.create.continue+json',
        Accept: 'application/x.zalando.order.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel,
        'X-UID': this.config.clientId
      },
      body: body,
      transform: (json) => {
        return new CreateOrderResponse(json);
      }
    };

    return fetchEndpoint(CreateOrderEndpoint).then(createOrderResponse => {
      return createOrderResponse;
    });
  }

  getRecommendations(sku, recoId) {
    const catalogUrl = this.config.catalogApi.url;
    const url = `${catalogUrl}/articles/${sku}/recommendations/?client_id=${this.config.clientId}&anon_id=${recoId}`;
    const GetRecommendationsEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x.zalando.article.recommendation+json',
        Accept: 'application/x.zalando.article.recommendation+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel,
        'X-UID': this.config.clientId,
        'X-Reco-Location': this.config.recommendations[0].location,
        'X-Reco-Type': this.config.recommendations[0].type,
        'X-Channel': this.config.recommendations[0].channel
      },
      transform: (json) => {
        const result = [];

        json.forEach(articleJson => result.push(new RecommendedArticles(articleJson)));
        return result;
      }
    };

    return fetchEndpoint(GetRecommendationsEndpoint).then(recommendedArticles => {
      return recommendedArticles;
    });
  }


  createGuestCheckout(json) {
    const url = `${this.config.atlasCheckoutGateway.url}/guest-checkout/api/orders`;
    const GuestCheckoutEndpoint = {
      url: url,
      method: 'POST',
      mode: 'cors',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/x.zalando.order.create+json',
        Accept: 'application/x.zalando.order.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel,
        'X-UID': this.config.clientId
      },
      body: json,
      transform: (response) => {
        if (response.redirect_url) {
          return new CreateOrderRedirectResponse(response);
        }

        return new CreateOrderResponse(response);
      }
    };

    return fetchEndpoint(GuestCheckoutEndpoint).then(guestCheckoutResponse => {
      return guestCheckoutResponse;
    });
  }

  getCheckoutCustomer() {
    const url = `${this.config.atlasCheckoutApi.url}/api/customer`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.order.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (response) => {
        return new CheckoutCustomer(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });
  }

  getCheckoutAdresses() {
    const url = `${this.config.atlasCheckoutApi.url}/api/addresses`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.order.customer.addresses+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (json) => {

        const result = [];

        json.forEach(addressJson => result.push(new CheckoutAddress(addressJson)));
        return result;
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });
  }

  createCheckoutAddress(json) {
    const url = `${this.config.atlasCheckoutApi.url}/api/addresses`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x.zalando.address.create+json',
        Accept: 'application/x.zalando.address.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => {
        return new CheckoutAddress(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  deleteCheckoutAddress(addressId) {
    const url = `${this.config.atlasCheckoutApi.url}/api/addresses/${addressId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        Accept: 'application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  getCheckoutAddress(addressId) {
    const url = `${this.config.atlasCheckoutApi.url}/api/addresses/${addressId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x.zalando.address.create+json',
        Accept: 'application/x.zalando.address.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (response) => {
        return new CheckoutAddress(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  putCheckoutAddress(json, addressId) {
    const url = `${this.config.atlasCheckoutApi.url}/api/addresses/${addressId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x.zalando.customer.address.update+json',
        Accept: 'application/x.zalando.address.customer.address.update.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => {
        return new CheckoutAddress(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  checkAddress(json) {
    const url = `${this.config.atlasCheckoutApi.url}/api/address-checks`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x.zalando.address-check.create+json',
        Accept: 'application/x.zalando.address-check.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => {
        return new CheckedAddress(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  createCheckoutCart(json) {
    const url = `${this.config.atlasCheckoutApi.url}/api/carts`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x.zalando.cart.create+json',
        Accept: 'application/x.zalando.cart.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => {
        return new CartResponse(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  getCheckoutCart(cartId) {
    const url = `${this.config.atlasCheckoutApi.url}/api/carts/${cartId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.cart+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (response) => {
        return new CartResponse(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  putCheckoutcart(json, cartId) {
    const url = `${this.config.atlasCheckoutApi.url}/api/carts/${cartId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x.zalando.cart.update+json',
        Accept: 'application/x.zalando.address.cart.update.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => {
        return new CartResponse(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }


  createCheckout(json) {
    const url = `${this.config.atlasCheckoutApi.url}/api/checkouts`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x.zalando.customer.checkout.create+json',
        Accept: 'application/x.zalando.customer.checkout.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => {
        return new CheckoutResponse(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  getCheckout(checkoutId) {
    const url = `${this.config.atlasCheckoutApi.url}/api/checkouts/${checkoutId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.customer.checkout+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (response) => {
        return new CheckoutResponse(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  putCheckout(json, checkoutId) {
    const url = `${this.config.atlasCheckoutApi.url}/api/checkouts/${checkoutId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x.zalando.customer.checkout+json',
        Accept: 'application/x.zalando.customer.checkout.update.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => {
        return new CheckoutResponse(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  getOrders() {
    const url = `${this.config.atlasCheckoutApi.url}/api/orders`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.customer.orders+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (json) => {
        const result = [];

        json.forEach(oderJson => result.push(new CheckoutGetOrderResponses(oderJson)));
        return result;
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  createOrder(json) {
    const url = `${this.config.atlasCheckoutApi.url}/api/orders`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x.zalando.customer.order.create+json',
        Accept: 'application/x.zalando.customer.order.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => {
        return new CheckoutOrderResponse(response);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }

  getOrder(orderId) {
    const url = `${this.config.atlasCheckoutApi.url}/api/orders/${orderId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.customer.orders+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (reponse) => {
        return new CheckoutOrderResponse(reponse);
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(EndpointResponse => {
      return EndpointResponse;
    });

  }


}
export { AtlasSDKClient, fetchEndpoint, checkStatus, checkRedirect };
