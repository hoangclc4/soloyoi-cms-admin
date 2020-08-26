import { CHANGE_PASSWORD_ADMIN } from './../../graphql/mutations/changePasswordAdmin';
import { ADMIN_UPDATE_BANNER_PHOTO } from '../../graphql/mutations/adminUpdateBannerPhoto';

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

/**
 * @description call API Update Banner Photo
 * @author TungPT
 * @date 2020-08-25
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, photo, photoIndex }
 * @returns
 */
export async function apiUpdateBannerPhotoAction(
  { commit },
  { apolloClient, input, photo }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_BANNER_PHOTO,
      variables: { input, photo },
    });
    // Update Photo Success
    if (response.data.result.error.requestResolved) {
      commit('saveBannerPhotoMutation', { response });
      return { requestResolved: true };
    }
    // Update Photo Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
