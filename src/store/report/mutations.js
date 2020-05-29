import { LocalStorage } from 'quasar';

/**
 * @description save user reported list data as a state
 * @author TungPT
 * @date 2020-05-26
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveUserReportedMutation(state, { response }) {
  state.userReportedList = [
    ...response.data.result.response.adminUserReportList,
  ];

  LocalStorage.set('ADMIN_USER_REPORTED_LIST', state.userReportedList);
}

/**
 * @description save restaurant reported list data as a state
 * @author TungPT
 * @date 2020-05-26
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveRestaurantReportedMutation(state, { response }) {
  state.restaurantReportedList = [
    ...response.data.result.response.adminUserReportList,
  ];

  LocalStorage.set(
    'ADMIN_RESTAURANT_REPORTED_LIST',
    state.restaurantReportedList
  );
}

/**
 * @description save newsfeed reported list data as a state
 * @author TungPT
 * @date 2020-05-26
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveNewsFeedReportedMutation(state, { response }) {
  state.newsfeedReportedList = [
    ...response.data.result.response.adminUserReportList,
  ];

  LocalStorage.set('ADMIN_NEWSFEED_REPORTED_LIST', state.newsfeedReportedList);
}

/**
 * @description handle state when user reported was deleted
 * @author TungPT
 * @date 2020-05-28
 * @export
 * @param {*} state
 * @param {*} { restaurantId }
 */
export function saveDeletedUserReportedMutation(state, { reporterId, userId }) {
  state.userReportedList = state.userReportedList.filter(
    (userReported) =>
      userReported.reporter.userId !== reporterId ||
      userReported.user.userId !== userId
  );

  LocalStorage.set('ADMIN_USER_REPORTED_LIST', state.userReportedList);
}

/**
 * @description handle state when restaurant reported was deleted
 * @author TungPT
 * @date 2020-05-28
 * @export
 * @param {*} state
 * @param {*} { restaurantId }
 */
export function saveDeletedRestaurantReportedMutation(
  state,
  { reporterId, restaurantId }
) {
  state.restaurantReportedList = state.restaurantReportedList.filter(
    (userReported) =>
      userReported.reporter.userId !== reporterId ||
      userReported.restaurant.restaurantId !== restaurantId
  );

  LocalStorage.set(
    'ADMIN_RESTAURANT_REPORTED_LIST',
    state.restaurantReportedList
  );
}

/**
 * @description handle state when newsfeed reported was deleted
 * @author TungPT
 * @date 2020-05-28
 * @export
 * @param {*} state
 * @param {*} { restaurantId }
 */
export function saveDeletedNewsFeedReportedMutation(
  state,
  { reporterId, newsFeedId }
) {
  state.newsfeedReportedList = state.newsfeedReportedList.filter(
    (userReported) =>
      userReported.reporter.userId !== reporterId ||
      userReported.newsFeed.newsFeedId !== newsFeedId
  );

  LocalStorage.set('ADMIN_NEWSFEED_REPORTED_LIST', state.newsfeedReportedList);
}

/**
 * @description handle state when user reported was updated
 * @author TungPT
 * @date 2020-05-28
 * @export
 * @param {*} state
 * @param {*} { restaurantId }
 */
export function saveUpdateUserReportedMutation(state, { reporterId, userId }) {
  state.userReportedList = state.userReportedList.filter(
    (userReported) =>
      userReported.reporter.userId !== reporterId ||
      userReported.user.userId !== userId
  );

  LocalStorage.set('ADMIN_USER_REPORTED_LIST', state.userReportedList);
}

/**
 * @description handle state when restaurant reported was updated
 * @author TungPT
 * @date 2020-05-29
 * @export
 * @param {*} state
 * @param {*} { restaurantId }
 */
export function saveUpdateRestaurantReportedMutation(
  state,
  { reporterId, restaurantId }
) {
  state.restaurantReportedList = state.restaurantReportedList.filter(
    (resReported) =>
      resReported.reporter.userId !== reporterId ||
      resReported.restaurant.restaurantId !== restaurantId
  );

  LocalStorage.set(
    'ADMIN_RESTAURANT_REPORTED_LIST',
    state.restaurantReportedList
  );
}

/**
 * @description handle state when newsfeed reported was updated
 * @author TungPT
 * @date 2020-05-29
 * @export
 * @param {*} state
 * @param {*} { restaurantId }
 */
export function saveUpdateNewsfeedReportedMutation(
  state,
  { reporterId, newsFeedId }
) {
  state.newsfeedReportedList = state.newsfeedReportedList.filter(
    (newsfeedReported) =>
      newsfeedReported.reporter.userId !== reporterId ||
      newsfeedReported.newsFeed.newsFeedId !== newsFeedId
  );

  LocalStorage.set('ADMIN_NEWSFEED_REPORTED_LIST', state.newsfeedReportedList);
}
