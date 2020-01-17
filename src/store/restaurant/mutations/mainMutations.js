import { LocalStorage } from 'quasar';

/**
 * @description save restaurant list as a state
 * @author AnhTQ
 * @date 2020-01-16
 * @export
 * @param {*} state
 * @param {*} { response, pageNum, needGetMoreData }
 */
export function saveRestaurantMutation(state, { response, needGetMoreData }) {
  if (state.restaurantList) {
    if (needGetMoreData) {
      response.data.result.response.adminRestaurantList.forEach(
        (restaurant) => {
          state.pendingRestaurantList.push(restaurant);
        }
      );
    } else {
      state.restaurantList = [...state.pendingRestaurantList];
      LocalStorage.set('ADMIN_RESTAURANT_LIST', state.restaurantList);

      state.pendingRestaurantList = [];
    }
  } else {
    let restaurantList = [];
    response.data.result.response.adminRestaurantList.forEach((restaurant) => {
      restaurantList.push(restaurant);
    });

    state.restaurantList = [...restaurantList];
    state.pendingRestaurantList = [...restaurantList];

    LocalStorage.set('ADMIN_RESTAURANT_LIST', state.restaurantList);
  }
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

  state.restaurantList.unshift({
    isVip: false,
    restaurantId: state.createdRestaurant.restaurantId,
    name: state.createdRestaurant.name,
    address: state.createdRestaurant.address,
    addressLevelOne: '',
    addressLevelTwo: '',
    addressLevelThree: '',
    specificAddress: '',
    phone: '',
    email: state.createdRestaurant.email,
  });

  LocalStorage.set('ADMIN_RESTAURANT_LIST', state.restaurantList);
}

/**
 * @description handle state when restaurant was deleted
 * @author AnhTQ
 * @date 2020-01-16
 * @export
 * @param {*} state
 * @param {*} { restaurantId }
 */
export function saveDeletedRestaurantMutation(state, { restaurantId }) {
  state.restaurantList = state.restaurantList.filter(
    (restaurant) => restaurant.restaurantId !== restaurantId
  );

  LocalStorage.set('ADMIN_RESTAURANT_LIST', state.restaurantList);

  // Check created restaurant was deleted or not
  if (state.createdRestaurant) {
    state.createdRestaurant =
      state.createdRestaurant.restaurantId === restaurantId
        ? null
        : state.createdRestaurant;
    LocalStorage.set('ADMIN_CREATED_RESTAURANT', state.createdRestaurant);
  }
}
