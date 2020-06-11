import { ADMIN_LOGIN } from '../../graphql/mutations/adminLogin';
import { ADMIN_LOGOUT } from '../../graphql/mutations/adminLogout';
import { RESET_PASSWORD_USER } from '../../graphql/mutations/resetPasswordUser';
import common from '../common';

/**
 * @description validate admin token
 * @author AnhTQ
 * @date 2019-12-27
 * @export
 * @returns
 */
export function validateTokenAction() {
  // TODO: improve validate token expires time
  return true;
}

/**
 * @description call API Login Admin
 * @author AnhTQ
 * @date 2019-12-24
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiLoginAction({ commit }, { apolloClient, input }) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_LOGIN,
      variables: { input },
    });

    // Login Success
    if (response.data.result.error.requestResolved) {
      commit('saveCurrentUserMutation', { response });
      return { requestResolved: true };
    }
    // Login Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Login Admin
 * @author AnhTQ
 * @date 2019-12-24
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiLogoutAction(context, { apolloClient }) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_LOGOUT,
    });

    // Logout Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Logout Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description force clear state and localStorage, then logout
 * @author AnhTQ
 * @date 2019-12-22
 * @export
 */
export async function forceLogout() {
  common.mutations.clearDataMutation(common.state);
  window.history.go();
}

/**
 * @description call API Reset Password for User
 * @author TungPT
 * @date 2020-06-10
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiResetPasswordUserAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: RESET_PASSWORD_USER,
      variables: {
        input,
      },
    });

    // Reset Password Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Reset Password Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
