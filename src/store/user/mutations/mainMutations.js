import { LocalStorage } from 'quasar';

/**
 * @description save user data as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveUserMutation(state, { response }) {
  state.userList = response.data.result.response.adminUserFacebookList;

  LocalStorage.set('ADMIN_USER_LIST', state.userList);
}
