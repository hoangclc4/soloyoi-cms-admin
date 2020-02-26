import { LocalStorage } from 'quasar';

/**
 * @description save admin information as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} user
 */
export function saveCurrentUserMutation(state, { response }) {
  state.currentUser = { ...response.data.result.response };

  LocalStorage.set('ADMIN_INFO', state.currentUser);
}
