/**
 * @description get restaurant list from state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @returns
 */
export function getRestaurantListGetter(state) {
  return state.restaurantList ? state.restaurantList : [];
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
  return state.restaurantInfo ? state.restaurantInfo : {};
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
  return state.createdRestaurant ? state.createdRestaurant : {};
}

/**
 * @description get Restaurant Menu Photo
 * @author AnhTQ
 * @date 2020-01-14
 * @export
 * @param {*} state
 * @returns
 */
export function getMenuPhotoGetter(state) {
  return state.restaurantMenuPhotos ? state.restaurantMenuPhotos : [];
}

/**
 * @description get Restaurant Menu Food
 * @author AnhTQ
 * @date 2020-01-14
 * @export
 * @param {*} state
 * @returns
 */
export function getMenuFoodGetter(state) {
  return state.restaurantFoods ? state.restaurantFoods : [];
}

/**
 * @description get Restaurant Menu Drink
 * @author AnhTQ
 * @date 2020-01-14
 * @export
 * @param {*} state
 * @returns
 */
export function getMenuDrinkGetter(state) {
  return state.restaurantDrinks ? state.restaurantDrinks : [];
}

/**
 * @description get Restaurant Staff
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} state
 * @returns
 */
export function getStaffGetter(state) {
  return state.restaurantStaff ? state.restaurantStaff : [];
}

/**
 * @description get restaurant review
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} state
 * @returns
 */
export function getReviewGetter(state) {
  return state.restaurantReview ? state.restaurantReview : [];
}
