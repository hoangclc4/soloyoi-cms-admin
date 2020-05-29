/**
 * @description get user reported list from state
 * @author TungPT
 * @date 2020-05-26
 * @export
 * @param {*} state
 * @returns
 */
export function getUserReportedListGetter(state) {
  return state.userReportedList ? state.userReportedList : [];
}

/**
 * @description get restaurant reported list from state
 * @author TungPT
 * @date 2020-05-26
 * @export
 * @param {*} state
 * @returns
 */
export function getRestaurantReportedListGetter(state) {
  return state.restaurantReportedList ? state.restaurantReportedList : [];
}

/**
 * @description get newsfeed reported list from state
 * @author TungPT
 * @date 2020-05-26
 * @export
 * @param {*} state
 * @returns
 */
export function getNewsfeedReportedListGetter(state) {
  return state.newsfeedReportedList ? state.newsfeedReportedList : [];
}
