import { LocalStorage } from 'quasar';

/**
 * @description save notifications data as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveNotificationsMutation(state, response) {
  state.notifications = response.data.result.response.notificationAdmins;

  LocalStorage.set('NOTIFICATIONS', state.notifications);
}
