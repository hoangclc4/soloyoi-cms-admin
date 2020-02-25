import { LocalStorage } from 'quasar';

/**
 * @description save notification data as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveNotificationMutation(state, { response }) {
  state.notification = [...response.data.result.response.notificationAdmins];

  LocalStorage.set('ADMIN_NOTIFICATION', state.notification);
}
