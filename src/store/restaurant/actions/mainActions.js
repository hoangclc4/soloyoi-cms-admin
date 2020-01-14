import { ADMIN_RESTAURANT_LIST } from '../../../graphql/queries/adminRestaurantList';
import { CREATE_RESTAURANT } from '../../../graphql/mutations/createRestaurant';
import { DELETE_RESTAURANT } from '../../../graphql/mutations/deleteRestaurant';

/**
 * @description call API Fetch Restaurant List
 * @author AnhTQ
 * @date 2020-01-12
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient }
 * @returns
 */
export async function apiFetchRestaurantAction({ commit }, { apolloClient }) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_RESTAURANT_LIST,
      variables: { pager: { limit: 1000000, pageNum: 1 } },
    });

    // Fetch Success
    if (response.data.result.error.requestResolved) {
      commit('saveRestaurantMutation', { response });
      return { requestResolved: true };
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
 * @date 2020-01-09
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteRestaurantAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: DELETE_RESTAURANT,
      variables: { input },
    });

    // Delete Success
    if (response.data.result.requestResolved) {
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
