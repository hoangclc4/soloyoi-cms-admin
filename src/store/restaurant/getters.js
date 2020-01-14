/**
 * @description get restaurant list from state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @returns
 */
export function getRestaurantListGetter(state) {
  return state.restaurantList;
}

/**
 * @description get restaurant information from state
 * @author AnhTQ
 * @date 2020-01-13
 * @export
 * @param {*} state
 * @returns
 */
export function getRestaurantInfoGetter(state) {
  return state.restaurantInfo;
}

/**
 * @description get created restaurant from state
 * @author AnhTQ
 * @date 2020-01-13
 * @export
 * @param {*} state
 * @returns
 */
export function getCreatedRestaurantGetter(state) {
  return state.createdRestaurant;
}
