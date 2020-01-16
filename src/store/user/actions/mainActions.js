import { ADMIN_USER_FACEBOOK_LIST } from '../../../graphql/queries/adminUserFacebookList';

/**
 * @description call API Fetch User List
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, pager }
 * @returns
 */
export async function apiFetchUserAction({ commit }, { apolloClient, pager }) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_USER_FACEBOOK_LIST,
      variables: { pager },
    });

    // Fetch Success
    if (response.data.result.error.requestResolved) {
      commit('saveUserMutation', { response });
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
