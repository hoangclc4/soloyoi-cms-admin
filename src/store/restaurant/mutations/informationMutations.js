import { LocalStorage } from 'quasar';

/**
 * @description save restaurant data as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveRestaurantInformationMutation(state, { response }) {
  state.restaurantInfo = response.data.result.response;

  LocalStorage.set('ADMIN_RESTAURANT_INFO', state.restaurantInfo);
}
