import { ADMIN_USER_REPORT_LIST } from '../../graphql/queries/adminUserReportList';
import { DELETE_USER_REPORTED } from '../../graphql/mutations/deleteUserReported';
import { DELETE_RESTAURANT_REPORTED } from '../../graphql/mutations/deleteRestaurantReported';
import { DELETE_NEWSFEED_REPORTED } from '../../graphql/mutations/deleteNewsFeedReported';
import { UPDATE_USER_REPORTED } from '../../graphql/mutations/updateUserReported';
import { UPDATE_RESTAURANT_REPORTED } from '../../graphql/mutations/updateRestaurantReported';
import { UPDATE_NEWSFEED_REPORTED } from '../../graphql/mutations/updateNewsfeedReported';

/**
 * @description call API Fetch User Reported Data
 * @author TungPT
 * @date 2020-05-26
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, pager }
 * @returns
 */
export async function apiFetchUserReportedAction(
  { commit },
  { apolloClient, input, pager }
) {
  try {
    input = { userReportType: 'USER' };
    const response = await apolloClient.query({
      query: ADMIN_USER_REPORT_LIST,
      variables: { input, pager },
    });

    // Fetch User Report Data Success
    if (response.data.result.error.requestResolved) {
      commit('saveUserReportedMutation', { response });
      return { requestResolved: true };
    }
    // Fetch User Report Data Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Fetch Restaurant Reported Data
 * @author TungPT
 * @date 2020-05-26
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, pager }
 * @returns
 */
export async function apiFetchRestaurantReportedAction(
  { commit },
  { apolloClient, input, pager }
) {
  try {
    input = { userReportType: 'RESTAURANT' };
    const response = await apolloClient.query({
      query: ADMIN_USER_REPORT_LIST,
      variables: { input, pager },
    });

    // Fetch Restaurant Reported Data Success
    if (response.data.result.error.requestResolved) {
      commit('saveRestaurantReportedMutation', { response });
      return { requestResolved: true };
    }
    // Fetch Restaurant Reported Data Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Fetch NewsFeed Reported Data
 * @author TungPT
 * @date 2020-05-26
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, pager }
 * @returns
 */
export async function apiFetchNewsFeedReportedAction(
  { commit },
  { apolloClient, input, pager }
) {
  try {
    input = { userReportType: 'NEWSFEED' };
    const response = await apolloClient.query({
      query: ADMIN_USER_REPORT_LIST,
      variables: { input, pager },
    });

    // Fetch NewsFeed Reported Data Success
    if (response.data.result.error.requestResolved) {
      commit('saveNewsFeedReportedMutation', { response });
      return { requestResolved: true };
    }
    // Fetch NewsFeed Reported Data Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Delete User Reported
 * @author TungPT
 * @date 2020-05-28
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteUserReportedAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: DELETE_USER_REPORTED,
      variables: { input },
    });

    // Delete Success
    if (response.data.result.requestResolved) {
      commit('saveDeletedUserReportedMutation', {
        reporterId: input.reporterId,
        userId: input.userId,
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

/**
 * @description call API Delete Restaurant Reported
 * @author TungPT
 * @date 2020-05-28
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteRestaurantReportedAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: DELETE_RESTAURANT_REPORTED,
      variables: { input },
    });

    // Delete Success
    if (response.data.result.requestResolved) {
      commit('saveDeletedRestaurantReportedMutation', {
        reporterId: input.reporterId,
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

/**
 * @description call API Delete NewsFeed Reported
 * @author TungPT
 * @date 2020-05-28
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteNewsFeedReportedAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: DELETE_NEWSFEED_REPORTED,
      variables: { input },
    });

    // Delete Success
    if (response.data.result.requestResolved) {
      commit('saveDeletedNewsFeedReportedMutation', {
        reporterId: input.reporterId,
        newsFeedId: input.newsFeedId,
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

/**
 * @description call API Update User Reported
 * @author TungPT
 * @date 2020-05-28
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateUserReportedAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: UPDATE_USER_REPORTED,
      variables: { input },
    });

    // Update Success
    if (response.data.result.requestResolved) {
      commit('saveUpdateUserReportedMutation', {
        reporterId: input.reporterId,
        userId: input.userId,
      });
      return { requestResolved: true };
    }
    // Update Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Restaurant Reported
 * @author TungPT
 * @date 2020-05-29
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateRestaurantReportedAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: UPDATE_RESTAURANT_REPORTED,
      variables: { input },
    });

    // Update Success
    if (response.data.result.requestResolved) {
      commit('saveUpdateRestaurantReportedMutation', {
        reporterId: input.reporterId,
        restaurantId: input.restaurantId,
      });
      return { requestResolved: true };
    }
    // Update Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Newsfeed Reported
 * @author TungPT
 * @date 2020-05-29
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateNewsfeedReportedAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: UPDATE_NEWSFEED_REPORTED,
      variables: { input },
    });

    // Update Success
    if (response.data.result.requestResolved) {
      commit('saveUpdateNewsfeedReportedMutation', {
        reporterId: input.reporterId,
        newsFeedId: input.newsFeedId,
      });
      return { requestResolved: true };
    }
    // Update Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
