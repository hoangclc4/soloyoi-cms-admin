import { CHANGE_PASSWORD_ADMIN } from './../../graphql/mutations/changePasswordAdmin';

/**
 * @description call API Update Admin Password
 * @author AnhTQ
 * @date 2020-01-08
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdatePasswordAdminAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: CHANGE_PASSWORD_ADMIN,
      variables: {
        input,
      },
    });

    // Update Password Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Update Password Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
