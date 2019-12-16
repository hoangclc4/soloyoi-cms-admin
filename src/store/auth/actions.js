/**
 * @description validate admin token
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} { state }
 * @returns
 */
export function validateTokenAction({ state }) {
  const now = Date.now();
  return now - state.currentUser.login_time < state.currentUser.expires_in;
}

/**
 * @description call mutation to save user information
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} { commit }
 * @param {*} data
 */
export function saveCurrentUserAction({ commit }, data) {
  commit('saveCurrentUserMutation', data);
}
