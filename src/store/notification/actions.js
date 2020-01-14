import { NOTIFICATION_ADMIN_LIST } from '../../graphql/queries/notificationAdminList';
import { CREATE_NOTIFICATION_ADMIN } from '../../graphql/mutations/createNotificationAdmin';
import { DELETE_NOTIFICATION_ADMIN } from '../../graphql/mutations/deleteNotificationAdmin';

/**
 * @description call API Fetch Admin Notification
 * @author AnhTQ
 * @date 2020-01-09
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient }
 * @returns
 */
export async function apiFetchAdminNotificationAction(
  { commit },
  { apolloClient }
) {
  try {
    const response = await apolloClient.query({
      query: NOTIFICATION_ADMIN_LIST,
      variables: {
        pager: { limit: 1000000, pageNum: 1 },
      },
    });

    // Fetch Success
    if (response.data.result.error === null) {
      commit('saveNotificationMutation', { response });
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
 * @description call API Create Admin Notification
 * @author AnhTQ
 * @date 2020-01-09
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiCreateAdminNotificationAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: CREATE_NOTIFICATION_ADMIN,
      variables: { input },
    });

    // Create Success
    if (response.data.result.requestResolved) {
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
 * @description call API Delete Admin Notification
 * @author AnhTQ
 * @date 2020-01-09
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteAdminNotificationAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: DELETE_NOTIFICATION_ADMIN,
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
