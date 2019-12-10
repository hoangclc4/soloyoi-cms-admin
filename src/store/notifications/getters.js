/**
 * @description get notifications data from state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @returns
 */
export function getNotificationsGetter(state) {
  return state.notifications !== null ? state.notifications : [];
}
