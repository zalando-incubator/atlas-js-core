require('isomorphic-fetch');

import { Article } from '../models/catalog_api_models';
import {
    CreateOrderResponse,
    CreateOrderRedirectResponse,
    GetCheckoutResponse
} from '../models/guest_checkout_models';
import { RecommendedArticles } from '../models/recommendation_models';
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
 * AtlasSDK instance returned from {@link AtlasSDK.configure} method.
 * @instance
 */
class AtlasSDKClient {

  /**
   * Creates an AtlasSDK instance from config provided by config-api
   *
   * @constructor {ignore}
   * @param {Object} config - config from config-api
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Returns locale based on sales channel, e.g. 'de_DE'
   * @return {String} locale
   */
  getLocale() {
    return this.config.salesChannels.find(sc => sc.channel === this.config.salesChannel).locale;
  }

  /**
   * Returns language based on sales channel, e.g. 'de'
   * @return {String} language
   */
  getLanguage() {
    const startPosition = 0;

    return this.getLocale().substring(startPosition, this.getLocale().indexOf('_'));
  }

  /**
   * Returns country code based on sales channel, e.g. 'DE'
   * @return {String} country code
   */
  getCountryCode() {
    const underscorePosition = 1;

    return this.getLocale().substring(this.getLocale().indexOf('_') + underscorePosition);
  }

  /**
   * Returns configuration from config-api
   * @return {Object} config
   */
  getConfig() {
    return this.config;
  }

  /**
   * Fetches an article based on a SKU.
   * @public
   * @param  {String} sku - SKU of an article
   * @param  {Object} [options] - Configuration options:
   * <ul>
   *  <li>
   *    <strong>media</strong>:
   *    <ul>
   *      <li>{String} <strong>cdn</strong>: 'mosaic01' or 'mosaic02' (default is 'mosaic01')</li>
   *      <li>
   *        {Array} <strong>image_resolutions</strong>: request media image with the different resolutions
   *        (default ['catalog', 'detail', 'large']):
   *        <ul>
   *          <li>'catalog' - width: 246px</li>
   *          <li>'detail' - width: 300px, height: 400px</li>
   *          <li>'large' - width: 1100px, height: 1100px</li>
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
   *    image_resolutions: ['catalog', 'detail']
   *  }
   * }
   * </pre>
   * @return {Article} return {@link Article} object
   * @example {@lang javascript}
   * const sdk = await AtlasSDK.configure({
   *   client_id: 'CLIENT_ID',
   *   sales_channel: 'SALES_CHANNEL',
   *   is_sandBox: true
   * });
   * const article = await sdk.getArticle('AD112B0F6-A11', {
   *    media: {
   *      image_resolutions: ['catalog', 'detail']
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

  getCheckout(checkoutId, token) {
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

  createOrder(checkoutId, token) {
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
   * @param  {String} sku - SKU of an article
   * @param  {Object} [options] - Configuration options:
   * <ul>
   *  <li>
   *    {String} <strong>reco_id</strong>: UUID for recommendations API
   *  </li>
   *  <li>
   *    {String} <strong>tracking_string</strong>: random tracking string
   *  </li>
   *  <li>
   *    <strong>media</strong>:
   *    <ul>
   *      <li>{String} <strong>cdn</strong>: 'mosaic01' or 'mosaic02' (default is 'mosaic01')</li>
   *      <li>
   *        {Array} <strong>image_resolutions</strong>: request media image with the different resolutions
   *        (default ['catalog', 'detail', 'large']):
   *        <ul>
   *          <li>'catalog' - width: 246px</li>
   *          <li>'detail' - width: 300px, height: 400px</li>
   *          <li>'large' - width: 1100px, height: 1100px</li>
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
   *    image_resolutions: ['catalog', 'detail']
   *  }
   * }
   * </pre>
   * @return {Array<RecommendedArticles>} return array of {@link RecommendedArticles} objects
   * @example {@lang javascript}
   * const sdk = await AtlasSDK.configure({
   *   client_id: 'CLIENT_ID',
   *   sales_channel: 'SALES_CHANNEL',
   *   is_sandBox: true
   * });
   * const recos = await sdk.getRecommendations('AD112B0F6-A11', {
   *    reco_id: 'UUID',
   *    tracking_string: 'TRACK'
   * });
   */
  getRecommendations(sku, options = {
    reco_id: '',
    tracking_string: ''
  }) {
    const config = this.config;
    const catalogUrl = config.catalogApi.url;
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
        'X-Reco-Type': config.recommendations[0].type,
        'X-Channel': config.recommendations[0].channel,
        'X-Tracking-String': options.tracking_string
      },
      transform: (response) => {
        const result = [];

        response.forEach(articleJson => {
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

}

export {
    AtlasSDKClient,
    fetchEndpoint,
    checkStatus,
    checkRedirect
};
