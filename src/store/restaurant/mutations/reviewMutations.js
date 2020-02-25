import { LocalStorage } from 'quasar';

/**
 * @description save restaurant review
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveRestaurantReviewMutation(state, { response }) {
  state.restaurantReview = [
    ...response.data.result.response.reviewRestaurantList,
  ];

  LocalStorage.set('ADMIN_RESTAURANT_REVIEW', state.restaurantReview);
}
