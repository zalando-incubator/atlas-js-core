import AtlasSDK from '../../../index.js';
import fetchMock from 'fetch-mock';

const fs = require('fs');
const path = require('path');
const configJson = fs.readFileSync(path.join(__dirname, '../data/config_service_response.json'), 'utf8');

function configureSDK() {
  fetchMock.get('https://atlas-config-api.dc.zalan.do/api/config/CLIENT_ID-staging.json', configJson);

  return AtlasSDK.configure({
    client_id: 'CLIENT_ID',
    sales_channel: 'SALES_CHANNEL',
    environment: 'staging'
  });
}

export default configureSDK;
