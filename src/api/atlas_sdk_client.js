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

import mediaTransform from './transforms/media_trasform';

const successCode = 200;
const badRequestCode = 399;

/**
 * Checks the status code of the Response.
 * If the status code is <= 400 the Response object is returned.
 * Otherwise the Error is thrown.
 * @ignore
 * @param {Response} response - Response object
 * @return {Response} Response object
 * @throws {Error} - error object accoding to the bad response.
 */
const checkStatus = (response) => {
  if (response.status >= successCode && response.status < badRequestCode) {
    return response;
  }
  const error = new Error(`${response.statusText}: ${response.status}`);

  error.response = response;
  throw error;
};

/**
 * Checks whether "Location" header is preset.
 * Location header means that this is a redirect response with empty body, so
 * the Response object with simple JSON { redirect_url: 'URL'} will be returned.
 * Otherwise initial Response object is returned.
 * @ignore
 * @param {Response} response - Response object
 * @return {Response} Response object either original or with redirect URL
 */
const checkRedirect = (response) => {
  if (response.headers.get('Location')) {
    return new Response(JSON.stringify({ redirect_url: response.headers.get('Location') }));
  }
  return response;
};

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
      console.error(error); /* eslint no-console: 0 */
      throw error;
    });
}

/**
 * AtlasSDK instance returned from AtlasSDK configure method.
 * @instance
 */
class AtlasSDKClient {

  /**
   * Creates an AtlasSDK instance from config provided by config-api
   * @constructor
   * @param {Object} config - config from config-api
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Returns locale based on sales channel, e.g. 'de_DE'
   * @method
   * @return {String} locale
   */
  getLocale() {
    return this.config.salesChannels.find(sc => sc.channel === this.config.salesChannel).locale;
  }

  /**
   * Returns language based on sales channel, e.g. 'de'
   * @method
   * @return {String} language
   */
  getLanguage() {
    const startPosition = 0;

    return this.getLocale().substring(startPosition, this.getLocale().indexOf('_'));
  }

  /**
   * Returns country code based on sales channel, e.g. 'DE'
   * @method
   * @return {String} country code
   */
  getCountryCode() {
    const underscorePosition = 1;

    return this.getLocale().substring(this.getLocale().indexOf('_') + underscorePosition);
  }

  /**
   * Returns configuration from config-api
   * @method
   * @return {Object} config
   */
  getConfig() {
    return this.config;
  }

  /**
   * Fetches an article based on a SKU.
   * @public
   * @method
   * @param  {String} sku - SKU of an article
   * @param  {Object} [options] - Configuration options:
   * <ul>
   *  <li>
   *    <strong>media</strong>:
   *    <ul>
   *      <li>{String} <strong>cdn</strong>: 'mosaic01' or 'mosaic02' (default is 'mosaic01')</li>
   *      <li>
   *        {Array} <strong>image_resolutions</strong>: request media image with the different resolutions
   *        (default ['thumbnail', 'medium', 'large']):
   *        <ul>
   *          <li>'thumbnail' – width: 78px</li>
   *          <li>'thumbnail_hd' – width: 76px</li>
   *          <li>'small' – width: 135px</li>
   *          <li>'small_hd' – width: 270px</li>
   *          <li>'medium' – width: 300px, height: 400px</li>
   *          <li>'medium_sd' – width: 480px</li>
   *          <li>'medium_hd' – width: 600px, height: 800px</li>
   *          <li>'large' – width: 1100px, height: 1100px</li>
   *          <li>'large_hd' – height: 1650px</li>
   *        </ul>
   *      </li>
   *    </ul>
   *  </li>
   * </ul>
   * For example
   * <pre>
   * {
   *  media: {
   *    cdn: 'mosaic02',
   *    image_resolutions: ['thumbnail', 'medium']
   *  }
   * }
   * </pre>
   * @return {Article} return {@link Article} object
   * @example
   * const sdk = await AtlasSDK.configure({
   *   client_id: 'CLIENT_ID',
   *   sales_channel: 'SALES_CHANNEL',
   *   is_sandBox: true
   * });
   * const article = await sdk.getArticle('AD112B0F6-A11', {
   *    media: {
   *      image_resolutions: ['thumbnail', 'medium']
   *    }
   * });
   */
  getArticle(sku, options = {}) {
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
        const article = mediaTransform(json, options);

        return new Article(article);
      }
    };

    return fetchEndpoint(CatalogEndpoint).then(article => {
      return article;
    });
  }

  getGuestCheckout(checkoutId, token) {

    /**
     * Returns guest checkout object {@link GetCheckoutResponse} created using {@link AtlasSDKClient#createGuestCheckout}.
     * Parameters <strong>checkoutId</strong>, <strong>token</strong> should be fetched from redirect URL after payment.
     * @public
     * @method
     * @param {String} checkoutId - Id of guest checkout object
     * @param {String} token
     * @return {GetCheckoutResponse} guest checkout object
     */
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

  createGuestOrder(checkoutId, token) {

    /**
     * Creates an order for the guest chekout object based on <strong>checkoutId</strong>, <strong>token</strong>.
     * @public
     * @method
     * @param {String} checkoutId - Id of guest checkout object
     * @param {String} token
     * @return {CreateOrderResponse} object with order information
     */
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

  /**
   * Fetches recommendations for an article based on a SKU.
   * @public
   * @method
   * @param  {String} sku - SKU of an article
   * @param  {Object} [options] - Configuration options:
   * <ul>
   *  <li>
   *    {String} <strong>reco_id</strong>: UUID for recommendations API
   *  </li>
   *  <li>
   *    {String} <strong>tracking_string</strong>: (Optional) The first time you call recommendations it's empty. The response will have it then and then you use it for every further call.
   *  </li>
   *  <li>
   *    <strong>media</strong>:
   *    <ul>
   *      <li>{String} <strong>cdn</strong>: 'mosaic01' or 'mosaic02' (default is 'mosaic01')</li>
   *      <li>
   *        {Array} <strong>image_resolutions</strong>: request media image with the different resolutions
   *        (default ['thumbnail', 'medium', 'large']):
   *        <ul>
   *          <li>'thumbnail' – width: 78px</li>
   *          <li>'thumbnail_hd' – width: 76px</li>
   *          <li>'small' – width: 135px</li>
   *          <li>'small_hd' – width: 270px</li>
   *          <li>'medium' – width: 300px, height: 400px</li>
   *          <li>'medium_sd' – width: 480px</li>
   *          <li>'medium_hd' – width: 600px, height: 800px</li>
   *          <li>'large' – width: 1100px, height: 1100px</li>
   *          <li>'large_hd' – height: 1650px</li>
   *        </ul>
   *      </li>
   *    </ul>
   *  </li>
   * </ul>
   * For example
   * <pre>
   * {
   *  reco_id: 'UUUID',
   *  tracking_string: 'SOME_TRACKING_STRING',
   *  media: {
   *    cdn: 'mosaic02',
   *    image_resolutions: ['thumbnail', 'medium']
   *  }
   * }
   * </pre>
   * @return {Array<RecommendedArticles>} return array of {@link RecommendedArticles} objects
   * @example
   * const sdk = await AtlasSDK.configure({
   *   client_id: 'CLIENT_ID',
   *   sales_channel: 'SALES_CHANNEL',
   *   is_sandBox: true
   * });
   * const recos = await sdk.getRecommendations('AD112B0F6-A11', {
   *    reco_id: 'UUID',
   *    tracking_string: 'TRACK',
   *    media: {
   *      cdn: 'mosaic02',
   *      image_resolutions: ['thumbnail', 'medium']
   *    }
   * });
   */
  getRecommendations(sku, options = {
    reco_id: '',
    tracking_string: '',
    type: ''
  }) {
    const config = this.config;
    const catalogUrl = config.catalogApi.url;
    const type = options.type ? options.type : config.recommendations[0].type;
    const url = `${catalogUrl}/articles/${sku}/recommendations/?client_id=${config.clientId}&anon_id=${options.reco_id}`; /* eslint max-len: 0 */
    const GetRecommendationsEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x.zalando.article.recommendation+json',
        Accept: 'application/x.zalando.article.recommendation+json, application/x.problem+json',
        'X-Sales-Channel': config.salesChannel,
        'X-UID': config.clientId,
        'X-Reco-Location': config.recommendations[0].location,
        'X-Reco-Type': type,
        'X-Channel': config.recommendations[0].channel,
        'X-Tracking-String': options.tracking_string
      },
      transform: (response) => {
        const result = [];

        response[type].forEach(articleJson => {
          const json = mediaTransform(articleJson, options);

          result.push(new RecommendedArticles(json));
        });
        return result;
      }
    };

    return fetchEndpoint(GetRecommendationsEndpoint).then(recommendedArticles => {
      return recommendedArticles;
    });
  }

  /**
   * Creates guest checkout object with payload.
   * @public
   * @method
   * @param {Object} json - JSON payload
   * @return {CreateOrderRedirectResponse} response containing <strong>redirectURL</strong>
   * that should be used to go to the payment.
   */
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

  getCheckoutAddresses() {
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

        json.forEach(orderJson => result.push(new CheckoutGetOrderResponses(orderJson)));
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
