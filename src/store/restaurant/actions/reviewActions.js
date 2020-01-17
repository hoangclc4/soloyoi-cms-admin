import { ADMIN_REVIEW_RESTAURANT } from '../../../graphql/queries/adminReviewRestaurant';
import { ADMIN_DELETE_REVIEW } from '../../../graphql/mutations/removeReviewRestaurant';

/**
 * @description call API fetch restaurant review
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, pager }
 * @returns
 */
export async function apiFetchRestaurantReviewAction(
  { commit },
  { apolloClient, input, pager }
) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_REVIEW_RESTAURANT,
      variables: { input, pager },
    });

    // Fetch Restaurant Review Success
    if (response.data.result.error === null) {
      commit('saveRestaurantReviewMutation', { response });
      return { requestResolved: true };
    }
    // Fetch Restaurant Review Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API delete restaurant review
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteRestaurantReviewAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_DELETE_REVIEW,
      variables: { input },
    });

    // Delete Restaurant Review Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Delete Restaurant Review Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
