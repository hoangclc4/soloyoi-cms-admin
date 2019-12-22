import { LocalStorage } from 'quasar';

/**
 * @description save user information as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} user
 */
export function saveCurrentUserMutation(state, user) {
  state.currentUser = user.data.result.response;

  state.currentUser.expires_in =
    parseInt(state.currentUser.expires_in) * 24 * 60 * 60 * 1000;

  state.currentUser.login_time = new Date().getTime();

  LocalStorage.set('USER_INFO', state.currentUser);
}
