import { LocalStorage } from 'quasar';
import { decodeEmojiText } from '../../common/actions';

/**
 * @description save restaurant review with decode review comment
 * @author AnhTQ
 * @date 2020-02-26
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveRestaurantReviewMutation(state, { response }) {
  state.restaurantReview = [
    ...response.data.result.response.reviewRestaurantList,
  ];

  state.restaurantReview = state.restaurantReview.map((review) => {
    review.comment = decodeEmojiText(review.comment);
    return review;
  });

  LocalStorage.set('ADMIN_RESTAURANT_REVIEW', state.restaurantReview);
}
