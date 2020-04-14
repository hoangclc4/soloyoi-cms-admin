import { ADMIN_USER_FACEBOOK_PROFILE } from '../../../graphql/queries/adminUserFacebookProfile';
import { ADMIN_USER_PAYMENT_LOG } from '../../../graphql/queries/adminUserPaymentLogs';
import { ADMIN_USER_PAYMENT } from '../../../graphql/queries/adminUserPayment';
import { ADMIN_SETTING_USER_PAYMENT } from '../../../graphql/mutations/adminSettingUserPayment';
import { ADMIN_CREATE_USER_PAYMENT_LIFETIME } from '../../../graphql/mutations/adminCreateUserPaymentLifeTime';

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

/**
 * @description call API Create User Payment have fee
 * @author TungPT
 * @date 2020-04-08
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiCreateUserPaymentAction(
  context,
  { apolloClient, input }
) {
  try {
    const variables = {
      input: {
        userId: input.userId,
        startDate: input.startDate,
        endDate: input.endDate,
      },
    };

    const response = await apolloClient.mutate({
      mutation: ADMIN_SETTING_USER_PAYMENT,
      variables,
    });

    // Create User Payment Success
    if (response.data.result.requestResolved) {
      //commit('saveCreateUserPaymentMutation', { response });
      return { requestResolved: true };
    }
    // Create User Payment Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update User Payment have fee
 * @author TungPT
 * @date 2020-04-09
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateUserPaymentAction(
  context,
  { apolloClient, input }
) {
  try {
    const variables = {
      input: {
        userId: input.userId,
        startDate: input.startDate,
        endDate: input.endDate,
      },
    };

    const response = await apolloClient.mutate({
      mutation: ADMIN_SETTING_USER_PAYMENT,
      variables,
    });

    // Update User Payment Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Update User Payment Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API get User Payment Information for Admin
 * @author TungPT
 * @date 2020-04-09
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchUserPaymentInfoAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_USER_PAYMENT,
      variables: { input },
    });

    // Fetch Information Success
    if (response.data.result.error.requestResolved) {
      commit('saveUserPaymentInfoMutation', { response });
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
 * @description call API Create User Payment lifetime
 * @author TungPT
 * @date 2020-04-09
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiCreateUserPaymentLifeTimeAction(
  context,
  { apolloClient, input }
) {
  try {
    const variables = {
      input: {
        userId: input.userId,
      },
    };

    const response = await apolloClient.mutate({
      mutation: ADMIN_CREATE_USER_PAYMENT_LIFETIME,
      variables,
    });

    // Create User Payment lifetime Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Create User Payment lifetime Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
