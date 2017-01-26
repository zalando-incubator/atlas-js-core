import createModel from '../base_model.js';

/**
 * @Class PickupPoint
 * @param {String} name - name of the pick up point
 * @param {String} id - id of the pickup point
 * @param {String} memberId - member id of the pickpup point
 */
const PickupPoint = {
  name: { key: 'name', type: 'string' },
  id: { key: 'id', type: 'string' },
  memberId: { key: 'member_id', type: 'string' }
};
//TODO seperate schema for pickuppoint
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
const Address = {
  gender: { key: 'gender', type: 'string' },
  firstName: { key: 'first_name', type: 'string' },
  lastName: { key: 'last_name', type: 'string' },
  street: { key: 'street', type: 'string', optional: true },
  zip: { key: 'zip', type: 'string' },
  city: { key: 'city', type: 'string' },
  countryCode: { key: 'country_code', type: 'string' },
  pickupPoint: { key: 'pickup_point', type: 'object', model: createModel(PickupPoint), optional: true }
};

export default Address;
