[![npm](https://img.shields.io/npm/v/atlas-sdk-core.svg)](https://npmjs.org/package/atlas-sdk-core)
[![downloads](https://img.shields.io/npm/dm/atlas-sdk-core.svg)](https://www.npmjs.com/package/atlas-sdk-core)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/zalando-incubator/atlas-js-core/master/LICENSE)
[![Build Status](https://travis-ci.org/zalando-incubator/atlas-js-core.svg?branch=master)](https://travis-ci.org/zalando-incubator/atlas-js-core)
[![David](https://img.shields.io/david/strongloop/express.svg)](https://david-dm.org/zalando-incubator/atlas-js-core.svg)
[![codecov](https://codecov.io/gh/zalando-incubator/atlas-js-core/branch/master/graph/badge.svg)](https://codecov.io/gh/zalando-incubator/atlas-js-core)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

# Atlas JavaScript SDK Core

This SDK covers the functionality provided by team Atlas' (aka Distributed Commerce) APIs, namely, Checkout, Guest Checkout, and Catalog APIs.

Those APIs, and in turn this SDK, provide our partners a more streamlined access the Zalando shopping platform to enable our customers to purchase wherever they are.

The purpose of this project is to provide low-level calls to API backend and response models for Zalando Checkout, Guest Checkout, and Catalog APIs in order to allow easily integrate and run Zalando Сheckout in minutes using your own UI solution.

If you want to access the APIs directly we recommend that you take a look at their [documentation](https://zalando-incubator.github.io/checkoutapi-docs/).

We use Promises a lot :)

## Installation

```sh
npm install --save atlas-sdk-core es6-promise
```

On install we're transpiling the code for your convenience. You have access to two files under a `lib/` folder, one for using in node and another for browser usages.


## Warning

Because we are using Promises you must bring your own ES6 Promise compatible polyfill, e.g. [es6-promise](https://github.com/jakearchibald/es6-promise).

## Local Development

If you want to contribute, please, read our [Contributing](CONTRIBUTING.md) guidelines first.

In order to start SDK development simply run
```bash
npm run tdd
```

Check existing codebase tests for test examples.

## Configuration and Usage

You need to configure Atlas JavaScript SDK Core first and use configured instance variable to interact with AtlasSDK.

In order to configure AtlasSDK manually provide an object with 2 mandatory parameters __client_id__ and __sales_channel__:

```javascript
import AtlasSDK from 'atlas-sdk-core';

AtlasSDK.configure({
  client_id: 'CLIENT_ID',
  sales_channel: 'SALES_CHANNEL',
  is_sandbox: true
}).then((sdk) => {
  // sdk instance is ready to use

  sdk.getArticle('AD112B0F6-A11').then((article) => {
    console.log(`Article name: ${article.name}`);
  });
}).catch((error) => {
  console.error(`${error}`);
});
```

Since we are using __Promises__ you can benefit from __await/async__:
```javascript
import AtlasSDK from 'atlas-sdk-core';

const sdk = await AtlasSDK.configure({
  client_id: 'CLIENT_ID',
  sales_channel: 'SALES_CHANNEL'
});
const article = await sdk.getArticle('AD112B0F6-A11');
console.log(`Article name: ${article.name}`);
```

## API Reference
## Modules

<dl>
<dt><a href="#module_AtlasSDK">AtlasSDK</a></dt>
<dd><p>AtlasSDK is a global namespace.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#AtlasSDKClient">AtlasSDKClient</a></dt>
<dd><p>AtlasSDK instance returned from AtlasSDK configure method.</p>
</dd>
<dt><a href="#PickupPoint">PickupPoint</a></dt>
<dd></dd>
<dt><a href="#AddressSchema">AddressSchema</a></dt>
<dd><p>Baseclass for Address model</p>
</dd>
<dt><a href="#CheckoutAddressSchema">CheckoutAddressSchema</a></dt>
<dd><p>Baseclass for CheckoutAddress model</p>
</dd>
<dt><a href="#NormalizedAddress">NormalizedAddress</a></dt>
<dd><p>Baseclass for NormalizedAddress model</p>
</dd>
<dt><a href="#CheckedAddress">CheckedAddress</a></dt>
<dd><p>Baseclass for CheckedAddress model</p>
</dd>
<dt><a href="#Brand">Brand</a></dt>
<dd><p>Class for Brand model.</p>
</dd>
<dt><a href="#Partner">Partner</a></dt>
<dd><p>Class for Partner model.</p>
</dd>
<dt><a href="#PriceSchema">PriceSchema</a></dt>
<dd><p>Class for Article Unit Price model.</p>
</dd>
<dt><a href="#Unit">Unit</a></dt>
<dd><p>Class for Article Unit model.</p>
</dd>
<dt><a href="#Attribute">Attribute</a></dt>
<dd><p>Class for Article Unit Attribute model.</p>
</dd>
<dt><a href="#EnrichmentAttribute">EnrichmentAttribute</a></dt>
<dd><p>Class for Article Unit EnrichmentAttribute model.</p>
</dd>
<dt><a href="#TargetGroups">TargetGroups</a></dt>
<dd><p>Class for TargetGroups model.</p>
</dd>
<dt><a href="#ArticleImage">ArticleImage</a></dt>
<dd><p>Class for ArticleImage model.</p>
</dd>
<dt><a href="#Media">Media</a></dt>
<dd><p>Class for Media model.</p>
</dd>
<dt><a href="#Item">Item</a></dt>
<dd><p>Class for CartItem model</p>
</dd>
<dt><a href="#ItemWithPrice">ItemWithPrice</a></dt>
<dd><p>Class for CartItem model</p>
</dd>
<dt><a href="#Payment">Payment</a></dt>
<dd><p>Class for Payment model</p>
</dd>
<dt><a href="#DeliverySchema">DeliverySchema</a></dt>
<dd><p>Class for Delivery model</p>
</dd>
<dt><a href="#ReviewRatingDistribution">ReviewRatingDistribution</a></dt>
<dd><p>Class for ReviewRatingDistribution.</p>
</dd>
<dt><a href="#ReviewRating">ReviewRating</a></dt>
<dd><p>Class for ReviewRating.</p>
</dd>
<dt><a href="#ReviewRecommendations">ReviewRecommendations</a></dt>
<dd><p>Class for ReviewRecommendations.</p>
</dd>
<dt><a href="#ReviewSummary">ReviewSummary</a></dt>
<dd><p>Class for ReviewSummary.</p>
</dd>
<dt><a href="#ReviewEntry">ReviewEntry</a></dt>
<dd><p>Class for ReviewEntry.</p>
</dd>
<dt><a href="#Reviews">Reviews</a></dt>
<dd><p>Class for Article Reviews.</p>
</dd>
<dt><a href="#Image">Image</a></dt>
<dd><p>Class for Image model.</p>
</dd>
<dt><a href="#Video">Video</a></dt>
<dd><p>Class for Video model.</p>
</dd>
<dt><a href="#Article">Article</a></dt>
<dd><p>Class for Article model</p>
</dd>
<dt><a href="#ArticleFamily">ArticleFamily</a></dt>
<dd><p>Class for ArticleFamily model</p>
</dd>
<dt><a href="#DiscountSchema">DiscountSchema</a></dt>
<dd><p>Class for Discount model</p>
</dd>
<dt><a href="#CheckoutCouponDiscountSchema">CheckoutCouponDiscountSchema</a></dt>
<dd><p>Class for Checkout Discount model</p>
</dd>
<dt><a href="#DeliveryRequest">DeliveryRequest</a></dt>
<dd><p>Class for Delivery Request model</p>
</dd>
<dt><a href="#CreateCartRequest">CreateCartRequest</a></dt>
<dd><p>Class for Cart Request model</p>
</dd>
<dt><a href="#CheckoutDeliverySchema">CheckoutDeliverySchema</a></dt>
<dd><p>Class for Checkout Delivery model</p>
</dd>
<dt><a href="#SelectedPayment">SelectedPayment</a></dt>
<dd><p>Class for Selected Payment model</p>
</dd>
<dt><a href="#Payment">Payment</a></dt>
<dd><p>Class for Payment model</p>
</dd>
<dt><a href="#CheckoutCouponDetails">CheckoutCouponDetails</a></dt>
<dd><p>Class for Checkout Coupon Details model</p>
</dd>
<dt><a href="#CartResponse">CartResponse</a></dt>
<dd><p>Class for Cart Response model</p>
</dd>
<dt><a href="#CartsResponse">CartsResponse</a></dt>
<dd><p>Class for Carts Response model</p>
</dd>
<dt><a href="#CreateCheckoutRequest">CreateCheckoutRequest</a></dt>
<dd><p>Class for Checkout Request model</p>
</dd>
<dt><a href="#CheckoutResponse">CheckoutResponse</a></dt>
<dd><p>Class for Checkout Response model</p>
</dd>
<dt><a href="#PutCheckoutRequest">PutCheckoutRequest</a></dt>
<dd><p>Class for Put Checkout Request model</p>
</dd>
<dt><a href="#CheckoutOrderRequest">CheckoutOrderRequest</a></dt>
<dd><p>Class for Checkout Order Request model</p>
</dd>
<dt><a href="#SalesChannel">SalesChannel</a></dt>
<dd><p>SalesChannel class struct</p>
</dd>
<dt><a href="#Recommendations">Recommendations</a></dt>
<dd><p>Recommendations class struct</p>
</dd>
<dt><a href="#Config">Config</a></dt>
<dd><p>Config class struct</p>
</dd>
<dt><a href="#GuestCustomer">GuestCustomer</a></dt>
<dd><p>Class for Guest Customer model</p>
</dd>
<dt><a href="#CheckoutCustomer">CheckoutCustomer</a></dt>
<dd><p>Class for Guest Customer model</p>
</dd>
<dt><a href="#Cart">Cart</a></dt>
<dd><p>Cart</p>
</dd>
<dt><a href="#GuestDeliverySchema">GuestDeliverySchema</a></dt>
<dd><p>Class for GuestDelivery model</p>
</dd>
<dt><a href="#CreateOrderRequest">CreateOrderRequest</a></dt>
<dd><p>Class for CreateOrderRequest model</p>
</dd>
<dt><a href="#CreateOrderResponse">CreateOrderResponse</a></dt>
<dd><p>Class for CreateOrderResponse model</p>
</dd>
<dt><a href="#CreateOrderRedirectResponse">CreateOrderRedirectResponse</a></dt>
<dd><p>Class for CreateOrderRedirectResponse model</p>
</dd>
<dt><a href="#GetCheckoutResponse">GetCheckoutResponse</a></dt>
<dd><p>Class for GetCheckoutResponse model</p>
</dd>
<dt><a href="#OrderResponse">OrderResponse</a></dt>
<dd><p>Class for Order Response model</p>
</dd>
<dt><a href="#CheckoutApiOrderResponseSchema">CheckoutApiOrderResponseSchema</a></dt>
<dd><p>Class for Checkout Order Response model</p>
</dd>
<dt><a href="#CheckoutOrder">CheckoutOrder</a></dt>
<dd><p>Class for Guest Customer model</p>
</dd>
<dt><a href="#RecommendedArticles">RecommendedArticles</a></dt>
<dd><p>Class for Recommended Article model</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#configCache">configCache</a></dt>
<dd><p>A temporary fix to handle the current high load capacity</p>
</dd>
</dl>

<a name="module_AtlasSDK"></a>

## AtlasSDK
AtlasSDK is a global namespace.

**Access**: public  
<a name="module_AtlasSDK.configure"></a>

### AtlasSDK.configure(options) ⇒ [<code>Promise.&lt;AtlasSDKClient&gt;</code>](#AtlasSDKClient)
Configure AtlasSDK. This is the main entry point to use the AtlasSDK.

**Kind**: static method of [<code>AtlasSDK</code>](#module_AtlasSDK)  
**Returns**: [<code>Promise.&lt;AtlasSDKClient&gt;</code>](#AtlasSDKClient) - a promise resolving with an [AtlasSDKClient](#AtlasSDKClient) object  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing configiration data: <br />  <ul>    <li>{String} client_id Client Id of a partner</li>    <li>{String} sales_channel Sales Channel assigned for a partner</li>    <li>{boolean} is_sandbox Indicates sandbox mode (default <i>false</i>)</li>  </ul> |

**Example**  
```js
const sdk = await AtlasSDK.configure({
  client_id: 'CLIENT_ID',
  sales_channel: 'SALES_CHANNEL',
  is_sandBox: true
});
```
<a name="AtlasSDKClient"></a>

## AtlasSDKClient
AtlasSDK instance returned from AtlasSDK configure method.

**Kind**: global class  

* [AtlasSDKClient](#AtlasSDKClient)
    * [new AtlasSDKClient(config)](#new_AtlasSDKClient_new)
    * [.getLocale()](#AtlasSDKClient+getLocale) ⇒ <code>String</code>
    * [.getLanguage()](#AtlasSDKClient+getLanguage) ⇒ <code>String</code>
    * [.getCountryCode()](#AtlasSDKClient+getCountryCode) ⇒ <code>String</code>
    * [.getConfig()](#AtlasSDKClient+getConfig) ⇒ <code>Object</code>
    * [.getArticle(sku, [options])](#AtlasSDKClient+getArticle) ⇒ [<code>Article</code>](#Article)
    * [.getArticles(skus, [options])](#AtlasSDKClient+getArticles) ⇒ [<code>Array.&lt;Article&gt;</code>](#Article)
    * [.getArticleFamilies(sku, [options])](#AtlasSDKClient+getArticleFamilies) ⇒ [<code>Array.&lt;ArticleFamily&gt;</code>](#ArticleFamily)
    * [.getGuestCheckout(checkoutId, token)](#AtlasSDKClient+getGuestCheckout) ⇒ [<code>GetCheckoutResponse</code>](#GetCheckoutResponse)
    * [.createGuestOrder(checkoutId, token)](#AtlasSDKClient+createGuestOrder) ⇒ [<code>CreateOrderResponse</code>](#CreateOrderResponse)
    * [.getRecommendations(sku, [options])](#AtlasSDKClient+getRecommendations) ⇒ [<code>Array.&lt;RecommendedArticles&gt;</code>](#RecommendedArticles)
    * [.createGuestCheckout(json)](#AtlasSDKClient+createGuestCheckout) ⇒ [<code>CreateOrderRedirectResponse</code>](#CreateOrderRedirectResponse)
    * [.getCheckoutCustomer(token)](#AtlasSDKClient+getCheckoutCustomer) ⇒ [<code>CheckoutCustomer</code>](#CheckoutCustomer)
    * [.getCheckoutAddresses(token)](#AtlasSDKClient+getCheckoutAddresses) ⇒ <code>CheckoutAddress</code>
    * [.getCheckoutCarts(token, headers)](#AtlasSDKClient+getCheckoutCarts) ⇒ [<code>CartsResponse</code>](#CartsResponse)
    * [.createCheckoutCart(json, token)](#AtlasSDKClient+createCheckoutCart) ⇒ [<code>CartResponse</code>](#CartResponse)
    * [.getCheckoutCart(cartId, token)](#AtlasSDKClient+getCheckoutCart) ⇒ [<code>CartResponse</code>](#CartResponse)
    * [.putCheckoutcart(json, cartId, token, headers)](#AtlasSDKClient+putCheckoutcart) ⇒ [<code>CartResponse</code>](#CartResponse)

<a name="new_AtlasSDKClient_new"></a>

### new AtlasSDKClient(config)
Creates an AtlasSDK instance from config provided by config-api


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | config from config-api |

<a name="AtlasSDKClient+getLocale"></a>

### atlasSDKClient.getLocale() ⇒ <code>String</code>
Returns locale based on sales channel, e.g. 'de_DE'

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: <code>String</code> - locale  
<a name="AtlasSDKClient+getLanguage"></a>

### atlasSDKClient.getLanguage() ⇒ <code>String</code>
Returns language based on sales channel, e.g. 'de'

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: <code>String</code> - language  
<a name="AtlasSDKClient+getCountryCode"></a>

### atlasSDKClient.getCountryCode() ⇒ <code>String</code>
Returns country code based on sales channel, e.g. 'DE'

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: <code>String</code> - country code  
<a name="AtlasSDKClient+getConfig"></a>

### atlasSDKClient.getConfig() ⇒ <code>Object</code>
Returns configuration from config-api

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: <code>Object</code> - config  
<a name="AtlasSDKClient+getArticle"></a>

### atlasSDKClient.getArticle(sku, [options]) ⇒ [<code>Article</code>](#Article)
Fetches an article based on a SKU.

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>Article</code>](#Article) - return [Article](#Article) object  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of an article |
| [options] | <code>Object</code> | Configuration options: <ul>  <li>    <strong>media</strong>:    <ul>      <li>{String} <strong>cdn</strong>: 'mosaic01' or 'mosaic02' (default is 'mosaic01')</li>      <li>        {Array} <strong>image_resolutions</strong>: request media image with the different resolutions        (default ['thumbnail', 'medium', 'large']):        <ul>          <li>'thumbnail' – width: 78px</li>          <li>'thumbnail_hd' – width: 76px</li>          <li>'small' – width: 135px</li>          <li>'small_hd' – width: 270px</li>          <li>'medium' – width: 300px, height: 400px</li>          <li>'medium_sd' – width: 480px</li>          <li>'medium_hd' – width: 600px, height: 800px</li>          <li>'large' – width: 1100px, height: 1100px</li>          <li>'large_hd' – height: 1650px</li>        </ul>      </li>    </ul>  </li> </ul> For example <pre> {  media: {    cdn: 'mosaic02',    image_resolutions: ['thumbnail', 'medium']  } } </pre> |

**Example**  
```js
const sdk = await AtlasSDK.configure({
  client_id: 'CLIENT_ID',
  sales_channel: 'SALES_CHANNEL',
  is_sandBox: true,
  lang: 'en'
});
const article = await sdk.getArticle('AD112B0F6-A11', {
   media: {
     image_resolutions: ['thumbnail', 'medium']
   }
});
```
<a name="AtlasSDKClient+getArticles"></a>

### atlasSDKClient.getArticles(skus, [options]) ⇒ [<code>Array.&lt;Article&gt;</code>](#Article)
Fetches multiple articles based on SKUs.

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>Array.&lt;Article&gt;</code>](#Article) - return [Article[]](Article[]) object  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| skus | <code>String</code> | comma separated SKUs of multiple articles |
| [options] | <code>Object</code> | Configuration options: <ul>  <li>    <strong>media</strong>:    <ul>      <li>{String} <strong>cdn</strong>: 'mosaic01' or 'mosaic02' (default is 'mosaic01')</li>      <li>        {Array} <strong>image_resolutions</strong>: request media image with the different resolutions        (default ['thumbnail', 'medium', 'large']):        <ul>          <li>'thumbnail' – width: 78px</li>          <li>'thumbnail_hd' – width: 76px</li>          <li>'small' – width: 135px</li>          <li>'small_hd' – width: 270px</li>          <li>'medium' – width: 300px, height: 400px</li>          <li>'medium_sd' – width: 480px</li>          <li>'medium_hd' – width: 600px, height: 800px</li>          <li>'large' – width: 1100px, height: 1100px</li>          <li>'large_hd' – height: 1650px</li>        </ul>      </li>    </ul>  </li> </ul> For example <pre> {  media: {    cdn: 'mosaic02',    image_resolutions: ['thumbnail', 'medium']  } } </pre> |

**Example**  
```js
const sdk = await AtlasSDK.configure({
  client_id: 'CLIENT_ID',
  sales_channel: 'SALES_CHANNEL',
  is_sandBox: true,
  lang: 'en'
});
const articles = await sdk.getArticles('AD112B0F6-A11,SO254C009-K12', {
   media: {
     image_resolutions: ['thumbnail', 'medium']
   }
});
```
<a name="AtlasSDKClient+getArticleFamilies"></a>

### atlasSDKClient.getArticleFamilies(sku, [options]) ⇒ [<code>Array.&lt;ArticleFamily&gt;</code>](#ArticleFamily)
Fetches article families based on SKU.

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>Array.&lt;ArticleFamily&gt;</code>](#ArticleFamily) - return [ArticleFamily[]](ArticleFamily[]) object  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of an article |
| [options] | <code>Object</code> | Configuration options: <ul>  <li>    <strong>media</strong>:    <ul>      <li>{String} <strong>cdn</strong>: 'mosaic01' or 'mosaic02' (default is 'mosaic01')</li>      <li>        {Array} <strong>image_resolutions</strong>: request media image with the different resolutions        (default ['thumbnail', 'medium', 'large']):        <ul>          <li>'thumbnail' – width: 78px</li>          <li>'thumbnail_hd' – width: 76px</li>          <li>'small' – width: 135px</li>          <li>'small_hd' – width: 270px</li>          <li>'medium' – width: 300px, height: 400px</li>          <li>'medium_sd' – width: 480px</li>          <li>'medium_hd' – width: 600px, height: 800px</li>          <li>'large' – width: 1100px, height: 1100px</li>          <li>'large_hd' – height: 1650px</li>        </ul>      </li>    </ul>  </li> </ul> For example <pre> {  media: {    cdn: 'mosaic02',    image_resolutions: ['thumbnail', 'medium']  } } </pre> |

**Example**  
```js
const sdk = await AtlasSDK.configure({
  client_id: 'CLIENT_ID',
  sales_channel: 'SALES_CHANNEL',
  is_sandBox: true,
  lang: 'en'
});
const article = await sdk.getArticleFamilies('AD112B0F6-A11');
```
<a name="AtlasSDKClient+getGuestCheckout"></a>

### atlasSDKClient.getGuestCheckout(checkoutId, token) ⇒ [<code>GetCheckoutResponse</code>](#GetCheckoutResponse)
Returns the complete details of the checkout: guest checkout object [GetCheckoutResponse](#GetCheckoutResponse) created using [createGuestCheckout](#AtlasSDKClient+createGuestCheckout).
Parameters <strong>checkoutId</strong>, <strong>token</strong> should be fetched from redirect URL after payment.

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>GetCheckoutResponse</code>](#GetCheckoutResponse) - guest checkout object  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| checkoutId | <code>String</code> | Id of guest checkout object |
| token | <code>String</code> | Token for checkout completion. |

<a name="AtlasSDKClient+createGuestOrder"></a>

### atlasSDKClient.createGuestOrder(checkoutId, token) ⇒ [<code>CreateOrderResponse</code>](#CreateOrderResponse)
Creates an order for the guest chekout object based on <strong>checkoutId</strong>, <strong>token</strong>.

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>CreateOrderResponse</code>](#CreateOrderResponse) - object with order information  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| checkoutId | <code>String</code> | Id of guest checkout object |
| token | <code>String</code> |  |

<a name="AtlasSDKClient+getRecommendations"></a>

### atlasSDKClient.getRecommendations(sku, [options]) ⇒ [<code>Array.&lt;RecommendedArticles&gt;</code>](#RecommendedArticles)
Fetches recommendations for an article based on a SKU.

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>Array.&lt;RecommendedArticles&gt;</code>](#RecommendedArticles) - return array of [RecommendedArticles](#RecommendedArticles) objects  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of an article |
| [options] | <code>Object</code> | Configuration options: <ul>  <li>    {String} <strong>reco_id</strong>: UUID for recommendations API  </li>  <li>    {String} <strong>tracking_string</strong>: (Optional) The first time you call recommendations it's empty. The response will have it then and then you use it for every further call.  </li>  <li>    <strong>media</strong>:    <ul>      <li>{String} <strong>cdn</strong>: 'mosaic01' or 'mosaic02' (default is 'mosaic01')</li>      <li>        {Array} <strong>image_resolutions</strong>: request media image with the different resolutions        (default ['thumbnail', 'medium', 'large']):        <ul>          <li>'thumbnail' – width: 78px</li>          <li>'thumbnail_hd' – width: 76px</li>          <li>'small' – width: 135px</li>          <li>'small_hd' – width: 270px</li>          <li>'medium' – width: 300px, height: 400px</li>          <li>'medium_sd' – width: 480px</li>          <li>'medium_hd' – width: 600px, height: 800px</li>          <li>'large' – width: 1100px, height: 1100px</li>          <li>'large_hd' – height: 1650px</li>        </ul>      </li>    </ul>  </li> </ul> For example <pre> {  reco_id: 'UUUID',  tracking_string: 'SOME_TRACKING_STRING',  media: {    cdn: 'mosaic02',    image_resolutions: ['thumbnail', 'medium']  } } </pre> |

**Example**  
```js
const sdk = await AtlasSDK.configure({
  client_id: 'CLIENT_ID',
  sales_channel: 'SALES_CHANNEL',
  is_sandBox: true
});
const recos = await sdk.getRecommendations('AD112B0F6-A11', {
   reco_id: 'UUID',
   tracking_string: 'TRACK',
   media: {
     cdn: 'mosaic02',
     image_resolutions: ['thumbnail', 'medium']
   }
});
```
<a name="AtlasSDKClient+createGuestCheckout"></a>

### atlasSDKClient.createGuestCheckout(json) ⇒ [<code>CreateOrderRedirectResponse</code>](#CreateOrderRedirectResponse)
Creates guest checkout object with payload.

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>CreateOrderRedirectResponse</code>](#CreateOrderRedirectResponse) - response containing <strong>redirectURL</strong>
that should be used to go to the payment.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | JSON payload |

<a name="AtlasSDKClient+getCheckoutCustomer"></a>

### atlasSDKClient.getCheckoutCustomer(token) ⇒ [<code>CheckoutCustomer</code>](#CheckoutCustomer)
Returns customer object [CheckoutCustomer](#CheckoutCustomer).
Parameters customer <strong>token</strong> needed to fetch customer object.

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>CheckoutCustomer</code>](#CheckoutCustomer) - customer object  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | customer OAuth2 token |

<a name="AtlasSDKClient+getCheckoutAddresses"></a>

### atlasSDKClient.getCheckoutAddresses(token) ⇒ <code>CheckoutAddress</code>
Returns customer addresses [CheckoutAddress](CheckoutAddress).
Parameters customer <strong>token</strong> needed to fetch customer object.

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: <code>CheckoutAddress</code> - CheckoutAddress array  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | customer OAuth2 token |

<a name="AtlasSDKClient+getCheckoutCarts"></a>

### atlasSDKClient.getCheckoutCarts(token, headers) ⇒ [<code>CartsResponse</code>](#CartsResponse)
Returns a customer's cart(s)

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>CartsResponse</code>](#CartsResponse) - - carts  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> |  |
| headers | <code>Object</code> | additional headers that will override the default ones |

<a name="AtlasSDKClient+createCheckoutCart"></a>

### atlasSDKClient.createCheckoutCart(json, token) ⇒ [<code>CartResponse</code>](#CartResponse)
Creates Zalando customer cart

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>CartResponse</code>](#CartResponse) - - customer cart  

| Param | Type | Description |
| --- | --- | --- |
| json | [<code>CreateCartRequest</code>](#CreateCartRequest) | cart to create |
| token | <code>String</code> | customer OAuth2 token |

<a name="AtlasSDKClient+getCheckoutCart"></a>

### atlasSDKClient.getCheckoutCart(cartId, token) ⇒ [<code>CartResponse</code>](#CartResponse)
Returns a cart by id

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>CartResponse</code>](#CartResponse) - - cart  

| Param | Type | Description |
| --- | --- | --- |
| cartId | <code>String</code> | cart ID to get |
| token | <code>String</code> |  |

<a name="AtlasSDKClient+putCheckoutcart"></a>

### atlasSDKClient.putCheckoutcart(json, cartId, token, headers) ⇒ [<code>CartResponse</code>](#CartResponse)
Updates existing cart by id

**Kind**: instance method of [<code>AtlasSDKClient</code>](#AtlasSDKClient)  
**Returns**: [<code>CartResponse</code>](#CartResponse) - - updated cart  

| Param | Type | Description |
| --- | --- | --- |
| json | [<code>CreateCartRequest</code>](#CreateCartRequest) | cart object to update a cart with |
| cartId | <code>String</code> | id of the cart to be updated |
| token | <code>String</code> |  |
| headers | <code>Object</code> | additional headers that will override the default ones |

<a name="PickupPoint"></a>

## PickupPoint
**Kind**: global class  
<a name="new_PickupPoint_new"></a>

### new PickupPoint(name, id, memberId)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of the pick up point |
| id | <code>String</code> | id of the pickup point |
| memberId | <code>String</code> | member id of the pickpup point |

<a name="AddressSchema"></a>

## AddressSchema
Baseclass for Address model

**Kind**: global class  
<a name="new_AddressSchema_new"></a>

### new AddressSchema(email, gender, firstName, lastName, street, zip, city, countryCode, pickupPoint)

| Param | Type | Description |
| --- | --- | --- |
| email | <code>String</code> | email of a customer. |
| gender | <code>String</code> | gender of the customer (FEMALE / MALE) |
| firstName | <code>String</code> | first name of the customer |
| lastName | <code>String</code> | last name of the customer |
| street | <code>String</code> | street of the address |
| zip | <code>String</code> | zip code of the address |
| city | <code>String</code> | city of the address |
| countryCode | <code>String</code> | country of the address |
| pickupPoint | [<code>PickupPoint</code>](#PickupPoint) | pickup point of the address (Optional because only valid in shipping addresses) |

<a name="CheckoutAddressSchema"></a>

## CheckoutAddressSchema
Baseclass for CheckoutAddress model

**Kind**: global class  
<a name="new_CheckoutAddressSchema_new"></a>

### new CheckoutAddressSchema(customerNumber, email, gender, firstName, lastName, street, zip, city, countryCode, pickupPoint, defaultBilling, defaultShipping)

| Param | Type | Description |
| --- | --- | --- |
| customerNumber | <code>String</code> | customer number |
| email | <code>String</code> | email of a customer. |
| gender | <code>String</code> | gender of the customer (FEMALE / MALE) |
| firstName | <code>String</code> | first name of the customer |
| lastName | <code>String</code> | last name of the customer |
| street | <code>String</code> | street of the address |
| zip | <code>String</code> | zip code of the address |
| city | <code>String</code> | city of the address |
| countryCode | <code>String</code> | country of the address |
| pickupPoint | [<code>PickupPoint</code>](#PickupPoint) | pickup point of the address (Optional because only valid in shipping addresses) |
| defaultBilling | <code>Boolean</code> | is this address the default billing address |
| defaultShipping | <code>Boolean</code> | is this address the default shipping address |

<a name="NormalizedAddress"></a>

## NormalizedAddress
Baseclass for NormalizedAddress model

**Kind**: global class  
<a name="new_NormalizedAddress_new"></a>

### new NormalizedAddress(street, zip, city, countryCode)

| Param | Type | Description |
| --- | --- | --- |
| street | <code>String</code> | street of the address |
| zip | <code>String</code> | zip code of the address |
| city | <code>String</code> | city of the address |
| countryCode | <code>String</code> | country of the address |

<a name="CheckedAddress"></a>

## CheckedAddress
Baseclass for CheckedAddress model

**Kind**: global class  
<a name="new_CheckedAddress_new"></a>

### new CheckedAddress(status, normalizedAddress)

| Param | Type | Description |
| --- | --- | --- |
| status | <code>String</code> | status of the address check |
| normalizedAddress | [<code>NormalizedAddress</code>](#NormalizedAddress) | the normalized address |

<a name="Brand"></a>

## Brand
Class for Brand model.

**Kind**: global class  
<a name="new_Brand_new"></a>

### new Brand(name)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of brand. |

<a name="Partner"></a>

## Partner
Class for Partner model.

**Kind**: global class  
<a name="new_Partner_new"></a>

### new Partner(id, name, detailURL)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | id of partner. |
| name | <code>String</code> | name of partner. |
| detailURL | <code>String</code> | URL of partner. |

<a name="PriceSchema"></a>

## PriceSchema
Class for Article Unit Price model.

**Kind**: global class  
<a name="new_PriceSchema_new"></a>

### new PriceSchema(amount, currency)

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | amount of price. |
| currency | <code>String</code> | currency of price. |

<a name="Unit"></a>

## Unit
Class for Article Unit model.

**Kind**: global class  
<a name="new_Unit_new"></a>

### new Unit(id, size, price, originalPrice, available, stock, partner, media)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | id of article. |
| size | <code>String</code> | size of article. |
| price | <code>Price</code> | price of article. |
| originalPrice | <code>Price</code> | price of article. |
| available | <code>boolean</code> | whether the unit is available or not. |
| stock | <code>number</code> |  |
| partner | [<code>Partner</code>](#Partner) |  |
| media | [<code>Media</code>](#Media) |  |

<a name="Attribute"></a>

## Attribute
Class for Article Unit Attribute model.

**Kind**: global class  
<a name="new_Attribute_new"></a>

### new Attribute(name, category, subCategory, values)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of attribute. |
| category | <code>String</code> | category of attribute. |
| subCategory | <code>String</code> | sub-category of attribute. |
| values | <code>Array.&lt;String&gt;</code> | values of attribute. |

<a name="EnrichmentAttribute"></a>

## EnrichmentAttribute
Class for Article Unit EnrichmentAttribute model.

**Kind**: global class  
<a name="new_EnrichmentAttribute_new"></a>

### new EnrichmentAttribute(key, value)

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | name of enrichment attribute. |
| value | <code>Array.&lt;String&gt;</code> | values of enrichment attribute. |

<a name="TargetGroups"></a>

## TargetGroups
Class for TargetGroups model.

**Kind**: global class  
<a name="new_TargetGroups_new"></a>

### new TargetGroups(gender, age, domain, ageRange)

| Param | Type | Description |
| --- | --- | --- |
| gender | <code>Array.&lt;String&gt;</code> | The targeted gender group. Can be FEMALE or MALE. Unisex articles will have both. |
| age | <code>Array.&lt;String&gt;</code> | The targeted age group. Current values are: ADULT, BABY, KID, TEEN |
| domain | <code>Array.&lt;String&gt;</code> | The target domain. Can be: DEFAULT, GREEN, LIFESTYLE, MATERNITY, PREMIUM, OVERSIZE, SPORTS |
| ageRange | <code>Array.&lt;String&gt;</code> | Current values: Under 20, 20-29, 30-39, 40-49, Over 50 |

<a name="ArticleImage"></a>

## ArticleImage
Class for ArticleImage model.

**Kind**: global class  
<a name="new_ArticleImage_new"></a>

### new ArticleImage(order, catalog, catalogHD, detail, detailHD, large, largeHD)

| Param | Type | Description |
| --- | --- | --- |
| order | <code>Number</code> | order number of image used for sorting. |
| catalog | <code>String</code> | URL of catalog image. |
| catalogHD | <code>String</code> | URL of HD catalog image. |
| detail | <code>String</code> | URL of details image. |
| detailHD | <code>String</code> | URL of HD details image. |
| large | <code>String</code> | URL of large image. |
| largeHD | <code>String</code> | URL of HD large image. |

<a name="Media"></a>

## Media
Class for Media model.

**Kind**: global class  
<a name="new_Media_new"></a>

### new Media(images)

| Param | Type | Description |
| --- | --- | --- |
| images | [<code>ArticleImage</code>](#ArticleImage) | array of images. |

<a name="Item"></a>

## Item
Class for CartItem model

**Kind**: global class  
<a name="new_Item_new"></a>

### new Item(sku, quantity)

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of item. |
| quantity | <code>Number</code> | Quantity of item. |

<a name="ItemWithPrice"></a>

## ItemWithPrice
Class for CartItem model

**Kind**: global class  
<a name="new_ItemWithPrice_new"></a>

### new ItemWithPrice(sku, configSku, quantity, price)

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of item. |
| configSku | <code>String</code> | Config SKU of the item. |
| quantity | <code>Number</code> | Quantity of item. |
| price | <code>Price</code> | pirce of the item |

<a name="Payment"></a>

## Payment
Class for Payment model

**Kind**: global class  

* [Payment](#Payment)
    * [new Payment(method, selectionPageUrl, metadata)](#new_Payment_new)
    * [new Payment(selected, selectionPageUrl)](#new_Payment_new)

<a name="new_Payment_new"></a>

### new Payment(method, selectionPageUrl, metadata)

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | Payment Method type. |
| selectionPageUrl | <code>String</code> | URL of the payment selection page. |
| metadata | <code>Object</code> | Metadata for payment. |

<a name="new_Payment_new"></a>

### new Payment(selected, selectionPageUrl)

| Param | Type | Description |
| --- | --- | --- |
| selected | [<code>SelectedPayment</code>](#SelectedPayment) | the selected payment. |
| selectionPageUrl | <code>String</code> | URL of the payment selection page. |

<a name="DeliverySchema"></a>

## DeliverySchema
Class for Delivery model

**Kind**: global class  
<a name="new_DeliverySchema_new"></a>

### new DeliverySchema(earliest, latest)

| Param | Type | Description |
| --- | --- | --- |
| earliest | <code>String</code> | Delivery earliest date. |
| latest | <code>String</code> | Delivery latest date. |

<a name="ReviewRatingDistribution"></a>

## ReviewRatingDistribution
Class for ReviewRatingDistribution.

**Kind**: global class  
<a name="new_ReviewRatingDistribution_new"></a>

### new ReviewRatingDistribution(count)

| Param | Type | Description |
| --- | --- | --- |
| level. | <code>String</code> |  |
| count | <code>Number</code> | count of reviews distribution. |

<a name="ReviewRating"></a>

## ReviewRating
Class for ReviewRating.

**Kind**: global class  
<a name="new_ReviewRating_new"></a>

### new ReviewRating(average, distribution)

| Param | Type | Description |
| --- | --- | --- |
| average | <code>Number</code> | average rating of Article reviews. |
| distribution | [<code>ReviewRatingDistribution</code>](#ReviewRatingDistribution) | distribution of reviews. |

<a name="ReviewRecommendations"></a>

## ReviewRecommendations
Class for ReviewRecommendations.

**Kind**: global class  
<a name="new_ReviewRecommendations_new"></a>

### new ReviewRecommendations(total, positive)

| Param | Type | Description |
| --- | --- | --- |
| total | <code>Number</code> | total number of Article reviews. |
| positive | <code>Number</code> | number of positive reviews. |

<a name="ReviewSummary"></a>

## ReviewSummary
Class for ReviewSummary.

**Kind**: global class  
<a name="new_ReviewSummary_new"></a>

### new ReviewSummary(total, rating, recommendations)

| Param | Type | Description |
| --- | --- | --- |
| total | <code>Number</code> | total number of Article reviews. |
| rating | [<code>ReviewRating</code>](#ReviewRating) | average rating of Article review. |
| recommendations | [<code>ReviewRecommendations</code>](#ReviewRecommendations) | recommendations of Article review. |

<a name="ReviewEntry"></a>

## ReviewEntry
Class for ReviewEntry.

**Kind**: global class  
<a name="new_ReviewEntry_new"></a>

### new ReviewEntry(name, title, description, rating, recommends, created)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name of Article reviewer. |
| title | <code>String</code> | title of Article review. |
| description | <code>String</code> | description of Article review. |
| rating | <code>Number</code> | rating of Article review. |
| recommends | <code>Boolean</code> | boolean if the reviewer recommends or not. |
| created | <code>String</code> | created timestamp of Article review. |

<a name="Reviews"></a>

## Reviews
Class for Article Reviews.

**Kind**: global class  
<a name="new_Reviews_new"></a>

### new Reviews(summary, entries)

| Param | Type | Description |
| --- | --- | --- |
| summary | [<code>ReviewSummary</code>](#ReviewSummary) | summary of Article review. |
| entries | [<code>Array.&lt;ReviewEntry&gt;</code>](#ReviewEntry) | entries of Article review. |

<a name="Image"></a>

## Image
Class for Image model.

**Kind**: global class  
<a name="new_Image_new"></a>

### new Image(type, mediaCharacter, resolutions)

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of the media item, e.g. 'IMAGE', 'IMAGE_360' |
| mediaCharacter | <code>String</code> | Media Character descriptor with meta information about image, for example 'MODEL' image that indicates that this media item contains model image URL. |
| resolutions | <code>Object</code> | Requested resolutions of the media item. |

<a name="Video"></a>

## Video
Class for Video model.

**Kind**: global class  
<a name="new_Video_new"></a>

### new Video(type, mediaCharacter, url)

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of the media item, e.g. 'VIDEO', 'VIDEO_HD', 'VIDEO_THUMBNAIL', 'VIDEO_SMALL' |
| mediaCharacter | <code>String</code> | Media Character descriptor with meta information about video, for example 'MODEL' image that indicates that this media item contains model image URL. |
| url | <code>String</code> | An absolute URL to the image |

<a name="Article"></a>

## Article
Class for Article model

**Kind**: global class  
<a name="new_Article_new"></a>

### new Article(id, name, color, supplierColor, productGroup, detailUrl, brand, units, images, videos, attributes, enrichmentAttributes, targetGroups, infos, review)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | id of the article. |
| name | <code>String</code> | name of the article. |
| color | <code>String</code> | color of the article. |
| supplierColor | <code>String</code> | color of the article from supplier. |
| productGroup | <code>String</code> | product group of the article. |
| detailUrl | <code>String</code> | product detail url of the article. |
| brand | [<code>Brand</code>](#Brand) | brand of the article. |
| units | [<code>Array.&lt;Unit&gt;</code>](#Unit) | size, price and stock availability from the article. |
| images | [<code>Array.&lt;Image&gt;</code>](#Image) | Array of article images. |
| videos | [<code>Array.&lt;Video&gt;</code>](#Video) | Array of article videos. |
| attributes | [<code>Array.&lt;Attribute&gt;</code>](#Attribute) | characteristics of the article. |
| enrichmentAttributes | <code>Array.&lt;EnrichmentAttributes&gt;</code> | variable generic attributes. |
| targetGroups | [<code>TargetGroups</code>](#TargetGroups) | the targeted groups of the article. |
| infos | <code>Array.&lt;String&gt;</code> | generic article description. |
| review | [<code>Array.&lt;Reviews&gt;</code>](#Reviews) | article reviews. |

<a name="ArticleFamily"></a>

## ArticleFamily
Class for ArticleFamily model

**Kind**: global class  
<a name="new_ArticleFamily_new"></a>

### new ArticleFamily(id, color, supplierColor, images)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | id of the article. |
| color | <code>String</code> | color of the article. |
| supplierColor | <code>String</code> | color of the article from supplier. |
| images | [<code>Array.&lt;Image&gt;</code>](#Image) | Array of article images. |

<a name="DiscountSchema"></a>

## DiscountSchema
Class for Discount model

**Kind**: global class  
<a name="new_DiscountSchema_new"></a>

### new DiscountSchema(grossTotal, taxTotal)

| Param | Type | Description |
| --- | --- | --- |
| grossTotal | <code>Price</code> | gross total of the discount. |
| taxTotal | <code>Price</code> | tax total of the discount. |

<a name="CheckoutCouponDiscountSchema"></a>

## CheckoutCouponDiscountSchema
Class for Checkout Discount model

**Kind**: global class  
<a name="new_CheckoutCouponDiscountSchema_new"></a>

### new CheckoutCouponDiscountSchema(remaining, grossTotal, taxTotal)

| Param | Type | Description |
| --- | --- | --- |
| remaining | <code>Price</code> | remaining amount. |
| grossTotal | <code>Price</code> | gross total of the discount. |
| taxTotal | <code>Price</code> | tax total of the discount. |

<a name="DeliveryRequest"></a>

## DeliveryRequest
Class for Delivery Request model

**Kind**: global class  
<a name="new_DeliveryRequest_new"></a>

### new DeliveryRequest(service)

| Param | Type | Description |
| --- | --- | --- |
| service | <code>String</code> | the delivery service. |

<a name="CreateCartRequest"></a>

## CreateCartRequest
Class for Cart Request model

**Kind**: global class  
<a name="new_CreateCartRequest_new"></a>

### new CreateCartRequest(items)

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Items</code> | a list of items. |

<a name="CheckoutDeliverySchema"></a>

## CheckoutDeliverySchema
Class for Checkout Delivery model

**Kind**: global class  
<a name="new_CheckoutDeliverySchema_new"></a>

### new CheckoutDeliverySchema(service, cost, options, earliest, latest)

| Param | Type | Description |
| --- | --- | --- |
| service | <code>String</code> | the delivery service. |
| cost | <code>Price</code> | the delivery cost. |
| options | <code>String</code> | the delivery options. |
| earliest | <code>String</code> | Delivery earliest date. |
| latest | <code>String</code> | Delivery latest date. |

<a name="SelectedPayment"></a>

## SelectedPayment
Class for Selected Payment model

**Kind**: global class  
<a name="new_SelectedPayment_new"></a>

### new SelectedPayment(method, metadata, externalPayment)

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | Payment Method type. |
| metadata | <code>Object</code> | Metadata for payment. |
| externalPayment | <code>Boolean</code> | is an external payment provider used. |

<a name="Payment"></a>

## Payment
Class for Payment model

**Kind**: global class  

* [Payment](#Payment)
    * [new Payment(method, selectionPageUrl, metadata)](#new_Payment_new)
    * [new Payment(selected, selectionPageUrl)](#new_Payment_new)

<a name="new_Payment_new"></a>

### new Payment(method, selectionPageUrl, metadata)

| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | Payment Method type. |
| selectionPageUrl | <code>String</code> | URL of the payment selection page. |
| metadata | <code>Object</code> | Metadata for payment. |

<a name="new_Payment_new"></a>

### new Payment(selected, selectionPageUrl)

| Param | Type | Description |
| --- | --- | --- |
| selected | [<code>SelectedPayment</code>](#SelectedPayment) | the selected payment. |
| selectionPageUrl | <code>String</code> | URL of the payment selection page. |

<a name="CheckoutCouponDetails"></a>

## CheckoutCouponDetails
Class for Checkout Coupon Details model

**Kind**: global class  
<a name="new_CheckoutCouponDetails_new"></a>

### new CheckoutCouponDetails(coupon, warning, error, discount)

| Param | Type | Description |
| --- | --- | --- |
| coupon | <code>String</code> | the coupon. |
| warning | <code>String</code> | warnings regardings coupons. |
| error | <code>String</code> | errors regardings coupons. |
| discount | <code>CheckoutCouponDiscount</code> | the discount. |

<a name="CartResponse"></a>

## CartResponse
Class for Cart Response model

**Kind**: global class  
<a name="new_CartResponse_new"></a>

### new CartResponse(id, items, itemsOutOfStock, delivery, grossTotal, taxTotal, totalDiscount)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the response id. |
| items | [<code>ItemWithPrice</code>](#ItemWithPrice) | the items with price. |
| itemsOutOfStock | <code>String</code> | a list of items that are out of stock. |
| delivery | <code>Delivery</code> | the delivery information. |
| grossTotal | <code>Price</code> | the gross total. |
| taxTotal | <code>Price</code> | the tax total. |
| totalDiscount | [<code>DiscountSchema</code>](#DiscountSchema) | the total discount. |

<a name="CartsResponse"></a>

## CartsResponse
Class for Carts Response model

**Kind**: global class  
<a name="new_CartsResponse_new"></a>

### new CartsResponse(id, carts)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the response id. |
| carts | [<code>Array.&lt;CartResponse&gt;</code>](#CartResponse) | the requested carts. |

<a name="CreateCheckoutRequest"></a>

## CreateCheckoutRequest
Class for Checkout Request model

**Kind**: global class  
<a name="new_CreateCheckoutRequest_new"></a>

### new CreateCheckoutRequest(id, billingAddressId, billingAddress, shippingAddressId, shippingAddress, delivery, coupons)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the cart id. |
| billingAddressId | <code>String</code> | the id of the billing address. |
| billingAddress | <code>Address</code> | the billing address. |
| shippingAddressId | <code>String</code> | the id of the shipping address. |
| shippingAddress | <code>Address</code> | the shipping address. |
| delivery | [<code>DeliveryRequest</code>](#DeliveryRequest) | the desired delivery type. |
| coupons | <code>String</code> | a coupon. |

<a name="CheckoutResponse"></a>

## CheckoutResponse
Class for Checkout Response model

**Kind**: global class  
<a name="new_CheckoutResponse_new"></a>

### new CheckoutResponse(id, customerNumber, cartId, billingAddress, shippingAddress, delivery, couponDetails, payment)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the response id. |
| customerNumber | <code>String</code> | the customer number. |
| cartId | <code>String</code> | the id of the cart id. |
| billingAddress | <code>Address</code> | the billing address. |
| shippingAddress | <code>Address</code> | the shipping address. |
| delivery | <code>CheckoutDelivery</code> | the delivery type. |
| couponDetails | [<code>CheckoutCouponDetails</code>](#CheckoutCouponDetails) | the coupon details. |
| payment | [<code>Payment</code>](#Payment) | the payment selection. |

<a name="PutCheckoutRequest"></a>

## PutCheckoutRequest
Class for Put Checkout Request model

**Kind**: global class  
<a name="new_PutCheckoutRequest_new"></a>

### new PutCheckoutRequest(billingAddressId, billingAddress, shippingAddressId, shippingAddress, delivery, coupons)

| Param | Type | Description |
| --- | --- | --- |
| billingAddressId | <code>String</code> | the id of the billing address. |
| billingAddress | <code>Address</code> | the billing address. |
| shippingAddressId | <code>String</code> | the id of the shipping address. |
| shippingAddress | <code>Address</code> | the shipping address. |
| delivery | [<code>DeliveryRequest</code>](#DeliveryRequest) | the desired delivery type. |
| coupons | <code>String</code> | a coupon. |

<a name="CheckoutOrderRequest"></a>

## CheckoutOrderRequest
Class for Checkout Order Request model

**Kind**: global class  
<a name="new_CheckoutOrderRequest_new"></a>

### new CheckoutOrderRequest(checkoutId)

| Param | Type | Description |
| --- | --- | --- |
| checkoutId | <code>String</code> | the id of the checkout. |

<a name="SalesChannel"></a>

## SalesChannel
SalesChannel class struct

**Kind**: global class  
<a name="new_SalesChannel_new"></a>

### new SalesChannel(source)

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Object</code> | Initialisation object for SalesChannel |

<a name="Recommendations"></a>

## Recommendations
Recommendations class struct

**Kind**: global class  
<a name="new_Recommendations_new"></a>

### new Recommendations(source)

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Object</code> | Initialisation object for Recommendations |

<a name="Config"></a>

## Config
Config class struct

**Kind**: global class  
<a name="new_Config_new"></a>

### new Config(source)

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Object</code> | Initialisation object for Config |

**Example**  
```js
const source = {
  catalog_api_url: 'https://catalog_api.com/api',
  checkout_api_url: 'https://checkout_api.com/api',
  oauth2_provider_url: 'https://oauth2_provider.com/api',
  sales_channel: {
    locale: 'de_DE',
    channel: '11111111-1111-1111-1111-111111111111',
    toc_url: 'https://m.zalando.de/agb/'
  },
  recommendations: {
    location: 'my_app_pdp',
    type: 'similar',
    channel: 'myapp'
  }
};

const config = new Config(source);
```
<a name="GuestCustomer"></a>

## GuestCustomer
Class for Guest Customer model

**Kind**: global class  
<a name="new_GuestCustomer_new"></a>

### new GuestCustomer(email, subscribeNewsletter)

| Param | Type | Description |
| --- | --- | --- |
| email | <code>String</code> | the id of the billing address. |
| subscribeNewsletter | <code>Boolean</code> | subscribe to the newsletter. |

<a name="CheckoutCustomer"></a>

## CheckoutCustomer
Class for Guest Customer model

**Kind**: global class  
<a name="new_CheckoutCustomer_new"></a>

### new CheckoutCustomer(customerNumber, gender, firstName, lastName, email)

| Param | Type | Description |
| --- | --- | --- |
| customerNumber | <code>String</code> | the customer number. |
| gender | <code>String</code> | the gender. |
| firstName | <code>String</code> | the first name. |
| lastName | <code>String</code> | the last name. |
| email | <code>String</code> | the email address. |

<a name="Cart"></a>

## Cart
Cart

**Kind**: global class  
<a name="new_Cart_new"></a>

### new Cart(items, itemsOutOfStock, grossTotal, taxTotal)
Class for Cart model


| Param | Type | Description |
| --- | --- | --- |
| items | [<code>Item</code>](#Item) | Array of CartItem. |
| itemsOutOfStock | <code>CartItem</code> | Array of CartItem which are out of stock. |
| grossTotal | <code>Price</code> | Gross Total Price. |
| taxTotal | <code>Price</code> | Tax Total Price. |

<a name="GuestDeliverySchema"></a>

## GuestDeliverySchema
Class for GuestDelivery model

**Kind**: global class  
<a name="new_GuestDeliverySchema_new"></a>

### new GuestDeliverySchema(service, cost, delivery)

| Param | Type | Description |
| --- | --- | --- |
| service | <code>String</code> | Service method (STANDARD, EXPRESS, ...) |
| cost | <code>Price</code> | Cost of the delivery |
| delivery | <code>Delivery</code> | object |

<a name="CreateOrderRequest"></a>

## CreateOrderRequest
Class for CreateOrderRequest model

**Kind**: global class  
<a name="new_CreateOrderRequest_new"></a>

### new CreateOrderRequest(customer, billingAddress, shippingAddress, cart, payment)

| Param | Type | Description |
| --- | --- | --- |
| customer | <code>Customer</code> | Customer object. |
| billingAddress | <code>Address</code> | Billing GuestAddress of Order. |
| shippingAddress | <code>Address</code> | Shipping GuestAddress of Order. |
| cart | [<code>Cart</code>](#Cart) | Cart of Order. |
| payment | [<code>Payment</code>](#Payment) | Payment of Order. |

<a name="CreateOrderResponse"></a>

## CreateOrderResponse
Class for CreateOrderResponse model

**Kind**: global class  
<a name="new_CreateOrderResponse_new"></a>

### new CreateOrderResponse(orderNumber, customerNumber, billingAddress, shippingAddress, grossTotal, taxTotal, created, externalPaymentURL)

| Param | Type | Description |
| --- | --- | --- |
| orderNumber | <code>String</code> | Order Number. |
| customerNumber | <code>String</code> | Customer Number. |
| billingAddress | <code>Address</code> | Billing GuestAddress of Order. |
| shippingAddress | <code>Address</code> | Shipping GuestAddress of Order. |
| grossTotal | <code>Price</code> | Gross Total Price. |
| taxTotal | <code>Price</code> | Tax Total Price. |
| created | <code>String</code> | Date/Time when the order was created. |
| externalPaymentURL | <code>String</code> | URL of Payment. |

<a name="CreateOrderRedirectResponse"></a>

## CreateOrderRedirectResponse
Class for CreateOrderRedirectResponse model

**Kind**: global class  
<a name="new_CreateOrderRedirectResponse_new"></a>

### new CreateOrderRedirectResponse(url)

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Redirect URL. |

<a name="GetCheckoutResponse"></a>

## GetCheckoutResponse
Class for GetCheckoutResponse model

**Kind**: global class  
<a name="new_GetCheckoutResponse_new"></a>

### new GetCheckoutResponse(customerNumber, cart, billingAddress, shippingAddress, payment)

| Param | Type | Description |
| --- | --- | --- |
| customerNumber | <code>String</code> | Customer Number. |
| cart | [<code>Cart</code>](#Cart) | Cart of Order. |
| billingAddress | <code>Address</code> | Billing GuestAddress of Order. |
| shippingAddress | <code>Address</code> | Shipping GuestAddress of Order. |
| payment | [<code>Payment</code>](#Payment) | Payment of Order. |

<a name="OrderResponse"></a>

## OrderResponse
Class for Order Response model

**Kind**: global class  
<a name="new_OrderResponse_new"></a>

### new OrderResponse(orderNumber, billingAddress, shippingAddress, grossTotal, taxTotal, created, externalPaymentURL)

| Param | Type | Description |
| --- | --- | --- |
| orderNumber | <code>String</code> | the order number. |
| billingAddress | <code>Address</code> | the billing address. |
| shippingAddress | <code>Address</code> | the shipping address. |
| grossTotal | <code>Price</code> | gross total of the discount. |
| taxTotal | <code>Price</code> | tax total of the discount. |
| created | <code>String</code> | creation date. |
| externalPaymentURL | <code>String</code> | the payment URL. |

<a name="CheckoutApiOrderResponseSchema"></a>

## CheckoutApiOrderResponseSchema
Class for Checkout Order Response model

**Kind**: global class  
<a name="new_CheckoutApiOrderResponseSchema_new"></a>

### new CheckoutApiOrderResponseSchema(customerNumber, orderNumber, billingAddress, shippingAddress, grossTotal, taxTotal, created, externalPaymentURL)

| Param | Type | Description |
| --- | --- | --- |
| customerNumber | <code>String</code> | the customer number. |
| orderNumber | <code>String</code> | the order number. |
| billingAddress | <code>Address</code> | the billing address. |
| shippingAddress | <code>Address</code> | the shipping address. |
| grossTotal | <code>Price</code> | gross total of the discount. |
| taxTotal | <code>Price</code> | tax total of the discount. |
| created | <code>String</code> | creation date. |
| externalPaymentURL | <code>String</code> | the payment URL. |

<a name="CheckoutOrder"></a>

## CheckoutOrder
Class for Guest Customer model

**Kind**: global class  
<a name="new_CheckoutOrder_new"></a>

### new CheckoutOrder(orderNumber, customerNumber, grossTotal, created, detailUrl)

| Param | Type | Description |
| --- | --- | --- |
| orderNumber | <code>String</code> | the order number. |
| customerNumber | <code>String</code> | the customer number. |
| grossTotal | <code>Price</code> | gross total of the discount. |
| created | <code>String</code> | creation date. |
| detailUrl | <code>String</code> | the details URL. |

<a name="RecommendedArticles"></a>

## RecommendedArticles
Class for Recommended Article model

**Kind**: global class  
<a name="new_RecommendedArticles_new"></a>

### new RecommendedArticles(id, tracking_string, name, lowestPrice, brand, images, videos)

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | id of article. |
| tracking_string | <code>String</code> | the tracking string to help with recommendations |
| name | <code>String</code> | name of article. |
| lowestPrice | <code>Price</code> | lowestPrice of article. |
| brand | [<code>Brand</code>](#Brand) | brand of article. |
| images | [<code>Array.&lt;Image&gt;</code>](#Image) | Array of article images. |
| videos | [<code>Array.&lt;Video&gt;</code>](#Video) | Array of article videos. |

<a name="configCache"></a>

## configCache
A temporary fix to handle the current high load capacity

**Kind**: global constant  

## Contact

For any inquiry, please contact Team Atlas via team-atlas@zalando.de

## LICENSE

The MIT License (MIT) Copyright © 2016 Zalando SE, https://tech.zalando.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
