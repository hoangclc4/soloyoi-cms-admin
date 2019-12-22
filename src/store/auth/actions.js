import common from './../common';

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

/**
 * @description force clear all state and localStorage, then logout
 * @author AnhTQ
 * @date 2019-12-22
 * @export
 */
export async function forceLogout() {
  common.mutations.clearDataMutation(common.state);
  window.history.go();
}
