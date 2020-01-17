import { ADMIN_USER_FACEBOOK_PROFILE } from '../../../graphql/queries/adminUserFacebookProfile';
import { ADMIN_USER_PAYMENT_LOG } from '../../../graphql/queries/adminUserPaymentLogs';

/**
 * @description call API Fetch User Information
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchUserInformationAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_USER_FACEBOOK_PROFILE,
      variables: { input },
    });

    // Fetch Success
    if (response.data.result.error.requestResolved) {
      commit('saveUserInformationMutation', { response });
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
 * @description call API Fetch User Payment Log
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchUserPaymentLogAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_USER_PAYMENT_LOG,
      variables: { input },
    });

    // Fetch Success
    if (response.data.result.error.requestResolved) {
      commit('saveUserPaymentLogMutation', { response });
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
