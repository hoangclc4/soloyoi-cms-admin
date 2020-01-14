/**
 * @description get notifications data from state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @returns
 */
export function getNotificationGetter(state) {
  return state.notification !== null ? state.notification : [];
}
