[![NPM Version](https://img.shields.io/npm/v/atlas-sdk-core.svg)](https://npmjs.org/package/atlas-sdk-core)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/zalando-incubator/atlas-js-core/master/LICENSE)
[![Build Status](https://travis-ci.org/zalando-incubator/atlas-js-core.svg?branch=master)](https://travis-ci.org/zalando-incubator/atlas-js-core)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
 [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

# Atlas JavaScript SDK Core

Atlas JavaScript SDK Core for Zalando Checkout, Guest Checkout, and Catalog APIs.

The purpose of this project is to provide low-level calls to API backend and response models for Zalando Checkout, Guest Checkout, and Catalog APIs in order to allow easily integrate and run Zalando Сheckout in
minutes using your own UI solution.

We use Promises a lot :)

## Installation

```sh
npm install -g atlas-sdk-core
```

## Configuration and Usage

You need to configure Atlas JavaScript SDK Core first and use configured instance variable to interact with AtlasSDK.

In order to configure AtlasSDK manually provide an object with 2 mandatory parameters __client_id__ and __sales_channel__:

```javascript
AtlasSDK.configure({
  client_id: 'CLIENT_ID',
  sales_channel: 'SALES_CHANNEL',
}).then((sdk) => {
  const article = sdk.getArticle('AD112B0F6-A11');
}).catch((error) => {
  console.error(`${error}`);
};

```
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
