import { CHANGE_PASSWORD_ADMIN } from './../../graphql/mutations/changePasswordAdmin';
import { ADMIN_UPDATE_BANNER_PHOTO } from '../../graphql/mutations/adminUpdateBannerPhoto';
import { BANNER_INFORMATION } from '../../graphql/queries/bannerInformation';
import { ADMIN_UPDATE_BANNER } from '../../graphql/mutations/adminUpdateBanner';
import { STATUS_BANNER } from '../../graphql/queries/statusBanner';
import { ADMIN_UPDATE_STATUS_BANNER } from '../../graphql/mutations/adminUpdateStatusBanner';

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

/**
 * @description call API Fetch Banner Information for Admin
 * @author TungPT
 * @date 2020-09-09
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchBannerInformationAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: BANNER_INFORMATION,
      variables: { input },
    });
    // Fetch Information Success
    if (response.data.result.error.requestResolved) {
      commit('saveBannerPhotoMutation', { response });
      return { requestResolved: true };
    }
    // Fetch Information Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Banner url
 * @author TungPT
 * @date 2020-09-15
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateBannerAction(context, { apolloClient, input }) {
  try {
    const variables = {
      input: {
        url: input.url,
      },
    };
    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_BANNER,
      variables,
    });
    // Update Banner Success
    if (response.data.result.requestResolved) {
      //commit('saveBannerPhotoMutation', { response });
      return { requestResolved: true };
    }
    // Update Banner Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Fetch Status Banner for Admin
 * @author TungPT
 * @date 2020-09-16
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchStatusBannerAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: STATUS_BANNER,
      variables: { input },
    });
    // Fetch Information Success
    if (response.data.result.error.requestResolved) {
      commit('saveStatusBannerMutation', { response });
      return { requestResolved: true };
    }
    // Fetch Information Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Banner url
 * @author TungPT
 * @date 2020-09-15
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateStatusBannerAction(
  context,
  { apolloClient, input }
) {
  try {
    const variables = {
      input: {
        status: input.status,
      },
    };
    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_STATUS_BANNER,
      variables,
    });
    // Update Banner Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Update Banner Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
