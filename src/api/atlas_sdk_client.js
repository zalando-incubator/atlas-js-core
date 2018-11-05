require('isomorphic-fetch');

import { Article, ArticleFamily } from '../models/catalog_api_models';
import {
  CreateOrderResponse,
  CreateOrderRedirectResponse,
  GetCheckoutResponse
} from '../models/guest_checkout_models';

import { RecommendedArticles } from '../models/recommendation_models';
import { CheckoutCustomer } from '../models/customer_model';
import { CheckoutAddress, CheckedAddress } from '../models/address_models';
import {
  CartsResponse,
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

  error.response = {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
    url: response.url
  };

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
    body: endpoint.body ? JSON.stringify(endpoint.body) : undefined
  })
    .then(checkStatus)
    .then(checkRedirect)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return endpoint.transform(response);
    }).catch(error => {
      error.response && error.response.headers && error.response.headers.set('Authorization', 'BEARER XXX');
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

    return this.config.lang ? this.config.lang : this.getLocale().substring(startPosition, this.getLocale().indexOf('_'));
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
   *   is_sandBox: true,
   *   lang: 'en'
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

    return fetchEndpoint(CatalogEndpoint).then(res => res);
  }

  /**
   * Fetches multiple articles based on SKUs.
   * @public
   * @method
   * @param  {String} skus - comma separated SKUs of multiple articles
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
   * @return {Article[]} return {@link Article[]} object
   * @example
   * const sdk = await AtlasSDK.configure({
   *   client_id: 'CLIENT_ID',
   *   sales_channel: 'SALES_CHANNEL',
   *   is_sandBox: true,
   *   lang: 'en'
   * });
   * const articles = await sdk.getArticles('AD112B0F6-A11,SO254C009-K12', {
   *    media: {
   *      image_resolutions: ['thumbnail', 'medium']
   *    }
   * });
   */
  getArticles(skus, options = {}) {
    const url = `${this.config.catalogApi.url}/articles?config_skus=${skus}&client_id=${this.config.clientId}`;
    const CatalogEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.articles+json;charset=UTF-8, application/x.problem+json;charset=UTF-8',
        'X-Sales-Channel': this.config.salesChannel,
        'X-UID': this.config.clientId
      },
      transform: (json) => {
        return json.articles.map(article => new Article(mediaTransform(article, options)));
      }
    };

    return fetchEndpoint(CatalogEndpoint).then(res => res);
  }

  /**
   * Fetches article families based on SKU.
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
   * @return {ArticleFamily[]} return {@link ArticleFamily[]} object
   * @example
   * const sdk = await AtlasSDK.configure({
   *   client_id: 'CLIENT_ID',
   *   sales_channel: 'SALES_CHANNEL',
   *   is_sandBox: true,
   *   lang: 'en'
   * });
   * const article = await sdk.getArticleFamilies('AD112B0F6-A11');
   */
  getArticleFamilies(sku, options = {}) {
    const url = `${this.config.catalogApi.url}/article-families/${sku}?client_id=${this.config.clientId}`;
    const CatalogEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.article.families+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel,
        'X-UID': this.config.clientId
      },
      transform: (json) => {
        return json.article_families.map(family =>
          new ArticleFamily(mediaTransform(family, options)));
      }
    };

    return fetchEndpoint(CatalogEndpoint).then(res => res);
  }

  /**
   * Returns the complete details of the checkout: guest checkout object {@link GetCheckoutResponse} created using {@link AtlasSDKClient#createGuestCheckout}.
   * Parameters <strong>checkoutId</strong>, <strong>token</strong> should be fetched from redirect URL after payment.
   * @public
   * @method
   * @param {String} checkoutId - Id of guest checkout object
   * @param {String} token - Token for checkout completion.
   * @return {GetCheckoutResponse} guest checkout object
   */
  getGuestCheckout(checkoutId, token) {
    const url = `${this.config.atlasCheckoutGateway.url}/guest-checkout/api/checkouts/${checkoutId}/${token}`;
    const GetCheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x.zalando.guest-checkout+json',
        Accept: 'application/x.zalando.guest-checkout+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel,
        'X-UID': this.config.clientId
      },
      transform: (json) => new GetCheckoutResponse(json)
    };

    return fetchEndpoint(GetCheckoutEndpoint).then(res => res);
  }


  /**
   * Creates an order for the guest chekout object based on <strong>checkoutId</strong>, <strong>token</strong>.
   * @public
   * @method
   * @param {String} checkoutId - Id of guest checkout object
   * @param {String} token
   * @return {CreateOrderResponse} object with order information
   */
  createGuestOrder(checkoutId, token) {
    const url = `${this.config.atlasCheckoutGateway.url}/guest-checkout/api/orders`;
    const body = {
      checkout_id: checkoutId,
      token: token
    };
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
      transform: (json) => new CreateOrderResponse(json)
    };

    return fetchEndpoint(CreateOrderEndpoint).then(res => res);
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
  getRecommendations(sku, options) {
    options = Object.assign({
      reco_id: '',
      tracking_string: '',
      type: '',
      filters: {}
    }, options);
    const config = this.config;
    const catalogUrl = config.catalogApi.url;
    const type = options.type ? options.type : config.recommendations[0].type;
    const filters = Object.keys(options.filters).reduce((previous, key) => {
      // if the key is also an array -> convert it to string with ;
      const val = Array.isArray(options.filters[key]) ? options.filters[key].join(';') : options.filters[key];

      return `${previous}&filters=${key}:${val}`;
    }, '');

    const url = `${catalogUrl}/articles/${sku}/recommendations/?client_id=${config.clientId}&anon_id=${options.reco_id}${filters}`; /* eslint max-len: 0 */

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

    return fetchEndpoint(GetRecommendationsEndpoint).then(res => res);
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

    return fetchEndpoint(GuestCheckoutEndpoint).then(res => res);
  }

  /**
   * Returns customer object {@link CheckoutCustomer}.
   * Parameters customer <strong>token</strong> needed to fetch customer object.
   * @public
   * @method
   * @param {String} token - customer OAuth2 token
   * @return {CheckoutCustomer} customer object
   */
  getCheckoutCustomer(token) {
    const url = `${this.config.atlasCheckoutApi.url}/customer`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/x.zalando.customer+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel,
        Authorization: `Bearer ${token}`
      },
      transform: (response) => new CheckoutCustomer(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  /**
   * Returns customer addresses {@link CheckoutAddress}.
   * Parameters customer <strong>token</strong> needed to fetch customer object.
   * @public
   * @method
   * @param {String} token - customer OAuth2 token
   * @return {CheckoutAddress} CheckoutAddress array
   */
  getCheckoutAddresses(token) {
    const url = `${this.config.atlasCheckoutApi.url}/addresses`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/x.zalando.order.customer.addresses+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (json) => json.map(address => new CheckoutAddress(address))
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  createCheckoutAddress(json, token) {
    const url = `${this.config.atlasCheckoutApi.url}/addresses`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x.zalando.address.create+json',
        Accept: 'application/x.zalando.address.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => new CheckoutAddress(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  deleteCheckoutAddress(addressId, token) {
    const url = `${this.config.atlasCheckoutApi.url}/addresses/${addressId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      }
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  getCheckoutAddress(addressId, token) {
    const url = `${this.config.atlasCheckoutApi.url}/addresses/${addressId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x.zalando.address.create+json',
        Accept: 'application/x.zalando.address.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (response) => new CheckoutAddress(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  putCheckoutAddress(json, addressId, token) {
    const url = `${this.config.atlasCheckoutApi.url}/addresses/${addressId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x.zalando.customer.address.update+json',
        Accept: 'application/x.zalando.address.customer.address.update.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => new CheckoutAddress(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  checkAddress(json, token) {
    const url = `${this.config.atlasCheckoutApi.url}/address-checks`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x.zalando.address-check.create+json',
        Accept: 'application/x.zalando.address-check.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => new CheckedAddress(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  /**
   * Returns a customer's cart(s)
   *
   * @param {String} token
   * @param {Object} headers - additional headers that will override the default ones
   * @return {CartsResponse} - carts
   */
  getCheckoutCarts(token, headers = {}) {
    const url = `${this.config.atlasCheckoutApi.url}/carts`;

    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: Object.assign({}, {
        Authorization: `Bearer ${token}`,
        Accept: 'application/x.zalando.carts+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      }, headers),
      transform: (response) => new CartsResponse(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  /**
   * Creates Zalando customer cart
   *
   * @param {CreateCartRequest} json - cart to create
   * @param {String} token - customer OAuth2 token
   * @return {CartResponse} - customer cart
   */
  createCheckoutCart(json, token) {
    const url = `${this.config.atlasCheckoutApi.url}/carts`;

    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x.zalando.cart.create+json',
        Accept: 'application/x.zalando.cart.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => new CartResponse(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  /**
   * Returns a cart by id
   *
   * @param {String} cartId - cart ID to get
   * @param {String} token
   * @return {CartResponse} - cart
   */
  getCheckoutCart(cartId, token) {
    const url = `${this.config.atlasCheckoutApi.url}/carts/${cartId}`;

    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/x.zalando.cart+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (response) => new CartResponse(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  /**
   * Updates existing cart by id
   *
   * @param {CreateCartRequest} json - cart object to update a cart with
   * @param {String} cartId - id of the cart to be updated
   * @param {String} token
   * @param {Object} headers - additional headers that will override the default ones
   * @return {CartResponse} - updated cart
   */
  putCheckoutcart(json, cartId, token, headers = {}) {
    const url = `${this.config.atlasCheckoutApi.url}/carts/${cartId}`;

    const CheckoutEndpoint = {
      url: url,
      method: 'PUT',
      headers: Object.assign({}, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x.zalando.cart.update+json',
        Accept: 'application/x.zalando.address.cart.update.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      }, headers),
      body: json,
      transform: (response) => new CartResponse(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  createCheckout(json, token, headers = {}) {
    const url = `${this.config.atlasCheckoutApi.url}/checkouts`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: Object.assign({}, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x.zalando.customer.checkout.create+json',
        Accept: 'application/x.zalando.customer.checkout.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      }, headers),
      body: json,
      transform: (response) => new CheckoutResponse(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  getCheckout(checkoutId, token) {
    const url = `${this.config.atlasCheckoutApi.url}/checkouts/${checkoutId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/x.zalando.customer.checkout+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (response) => new CheckoutResponse(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  putCheckout(json, checkoutId, token) {
    const url = `${this.config.atlasCheckoutApi.url}/checkouts/${checkoutId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x.zalando.customer.checkout+json',
        Accept: 'application/x.zalando.customer.checkout.update.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => new CheckoutResponse(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  getOrders() {
    const url = `${this.config.atlasCheckoutApi.url}/orders`;
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

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  createOrder(json, token) {
    const url = `${this.config.atlasCheckoutApi.url}/orders`;
    const CheckoutEndpoint = {
      url: url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x.zalando.customer.order.create+json',
        Accept: 'application/x.zalando.customer.order.create.response+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      body: json,
      transform: (response) => new CheckoutOrderResponse(response)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

  getOrder(orderId, token) {
    const url = `${this.config.atlasCheckoutApi.url}/orders/${orderId}`;
    const CheckoutEndpoint = {
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/x.zalando.customer.orders+json, application/x.problem+json',
        'X-Sales-Channel': this.config.salesChannel
      },
      transform: (reponse) => new CheckoutOrderResponse(reponse)
    };

    return fetchEndpoint(CheckoutEndpoint).then(res => res);
  }

}
export { AtlasSDKClient, fetchEndpoint, checkStatus, checkRedirect };
