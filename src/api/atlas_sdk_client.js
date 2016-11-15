/* eslint no-console: 0 */

import 'isomorphic-fetch';
import { Article } from '../models/catalog_api_models.js';
import { CreateOrderResponse } from '../models/guest_checkout_models.js';

const successCode = 200;
const badRequestCode = 399;

function checkStatus(response) {
  if (response.status >= successCode && response.status < badRequestCode) {
    return response;
  }
  const error = new Error(`${response.statusText}: ${response.status}`);

  error.response = response;
  throw error;
}

function fetchEndpoint(endpoint) {
  return fetch(endpoint.url, {
    method: endpoint.method,
    headers: endpoint.headers,
    body: endpoint.body
  })
    .then(checkStatus)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return endpoint.transform(json);
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

  getArticle(sku) {
    const url = `${this.config.catalogApi.url}/articles/${sku}?client_id=${this.config.clientId}`;
    const CatalogEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.article+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (json) => {
        return new Article(json);
      }
    };

    return fetchEndpoint(CatalogEndpoint).then(article => {
      return article;
    });
  }

  createGuestCheckout(json) {
    const url = `${this.config.atlasCheckoutGateway.url}/guest-checkout/api/orders`;
    const GuestCheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x.zalando.order.create+json',
        Accept: 'application/x.zalando.order.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => {
        return new CreateOrderResponse(response);
      }
    };

    return fetchEndpoint(GuestCheckoutEndpoint).then(guestCheckoutResponse => {
      return guestCheckoutResponse;
    });
  }

}

export { AtlasSDKClient, fetchEndpoint };
