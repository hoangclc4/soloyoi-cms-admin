import { ADMIN_RESTAURANT_LIST } from '../../../graphql/queries/adminRestaurantList';
import { CREATE_RESTAURANT } from '../../../graphql/mutations/createRestaurant';
import { DELETE_RESTAURANT } from '../../../graphql/mutations/deleteRestaurant';

/**
 * @description call API Fetch Restaurant List
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, pager }
 * @returns
 */
export async function apiFetchRestaurantAction(
  { commit },
  { apolloClient, pager }
) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_RESTAURANT_LIST,
      variables: { pager },
    });

    // Fetch Success
    if (response.data.result.error.requestResolved) {
      const needGetMoreData =
        response.data.result.response.adminRestaurantList.length > 0;
      commit('saveRestaurantMutation', {
        response,
        pageNum: pager.pageNum,
        needGetMoreData,
      });
      return { requestResolved: true, needGetMoreData };
    }
    // Fetch Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Create Restaurant
 * @author AnhTQ
 * @date 2020-01-13
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiCreateRestaurantAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: CREATE_RESTAURANT,
      variables: { input },
    });

    // Create Success
    if (response.data.result.error.requestResolved) {
      commit('saveCreatedRestaurantMutation', { response });
      return { requestResolved: true };
    }
    // Create Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Delete Restaurant
 * @author AnhTQ
 * @date 2020-01-16
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteRestaurantAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: DELETE_RESTAURANT,
      variables: { input },
    });

    // Delete Success
    if (response.data.result.requestResolved) {
      commit('saveDeletedRestaurantMutation', {
        restaurantId: input.restaurantId,
      });
      return { requestResolved: true };
    }
    // Delete Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
