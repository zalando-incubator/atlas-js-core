import createModel from './base_model';

/**
 * @Class PickupPoint
 * @param {String} name - name of the pick up point
 * @param {String} id - id of the pickup point
 * @param {String} memberId - member id of the pickpup point
 */
const PickupPoint = createModel({
  name: { key: 'name', type: 'string' },
  id: { key: 'id', type: 'string' },
  memberId: { key: 'member_id', type: 'string' }
});

/**
 * @class Baseclass for Address model
 * @param {String} email - email of a customer.
 * @param {String} gender - gender of the customer (FEMALE / MALE)
 * @param {String} firstName - first name of the customer
 * @param {String} lastName - last name of the customer
 * @param {String} street - street of the address
 * @param {String} zip - zip code of the address
 * @param {String} city - city of the address
 * @param {String} countryCode - country of the address
 * @param {PickupPoint} pickupPoint - pickup point of the address (Optional because only valid in shipping addresses)
 */
const AddressSchema = {
  id: { key: 'id', type: 'string', optional: true },
  gender: { key: 'gender', type: 'string' },
  firstName: { key: 'first_name', type: 'string' },
  lastName: { key: 'last_name', type: 'string' },
  street: { key: 'street', type: 'string', optional: true },
  additional: { key: 'additional', type: 'string', optional: true },
  zip: { key: 'zip', type: 'string' },
  city: { key: 'city', type: 'string' },
  countryCode: { key: 'country_code', type: 'string' },
  pickupPoint: { key: 'pickup_point', type: 'object', model: PickupPoint, optional: true }
};

const Address = createModel(AddressSchema);

/**
 * @class Baseclass for CheckoutAddress model
 * @param {String} customerNumber - customer number
 * @param {String} email - email of a customer.
 * @param {String} gender - gender of the customer (FEMALE / MALE)
 * @param {String} firstName - first name of the customer
 * @param {String} lastName - last name of the customer
 * @param {String} street - street of the address
 * @param {String} zip - zip code of the address
 * @param {String} city - city of the address
 * @param {String} countryCode - country of the address
 * @param {PickupPoint} pickupPoint - pickup point of the address (Optional because only valid in shipping addresses)
 * @param {Boolean} defaultBilling - is this address the default billing address
 * @param {Boolean} defaultShipping - is this address the default shipping address
 */
const CheckoutAddress = createModel({
  customerNumber: { key: 'customer_number', type: 'string' },
  defaultBilling: { key: 'default_billing', type: 'boolean' },
  defaultShipping: { key: 'default_shipping', type: 'boolean' },
  ...AddressSchema });

/**
 * @class Baseclass for NormalizedAddress model
 * @param {String} street - street of the address
 * @param {String} zip - zip code of the address
 * @param {String} city - city of the address
 * @param {String} countryCode - country of the address
 */
const NormalizedAddress = createModel({
  street: { key: 'street', type: 'string' },
  additional: { key: 'additional', type: 'string', optional: true },
  zip: { key: 'zip', type: 'string' },
  city: { key: 'city', type: 'string' },
  countryCode: { key: 'country_code', type: 'string' }
});

/**
 * @class Baseclass for CheckedAddress model
 * @param {String} status - status of the address check
 * @param {NormalizedAddress} normalizedAddress - the normalized address
 */
const CheckedAddress = createModel({
  status: { key: 'status', type: 'string' },
  normalizedAddress: { key: 'normalized_address', type: 'object', model: NormalizedAddress }
});

export { CheckoutAddress, CheckedAddress, Address };
