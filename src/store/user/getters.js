/**
 * @description get user data from state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @returns
 */
export function getUserGetter(state) {
  return state.userList ? state.userList : [];
}

/**
 * @description get user information from state
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} state
 * @returns
 */
export function getUserInfoGetter(state) {
  return state.userInfo ? state.userInfo : {};
}

/**
 * @description get user payment log from state
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} state
 * @returns
 */
export function getUserPaymentLogGetter(state) {
  return state.userPaymentLog ? state.userPaymentLog : [];
}
