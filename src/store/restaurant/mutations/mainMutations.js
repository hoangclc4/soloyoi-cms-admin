import { LocalStorage } from 'quasar';

/**
 * @description save restaurant data as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveRestaurantMutation(state, { response }) {
  state.restaurantList = response.data.result.response.adminRestaurantList;

  LocalStorage.set('ADMIN_RESTAURANT_LIST', state.restaurantList);
}

/**
 * @description save restaurant data as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveCreatedRestaurantMutation(state, { response }) {
  state.createdRestaurant = response.data.result.response;

  LocalStorage.set('ADMIN_CREATED_RESTAURANT', state.createdRestaurant);
}
