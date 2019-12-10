/**
 * @description call mutation to save notifications data
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} { commit }
 * @param {*} data
 */
export function saveNotificationsAction({ commit }, data) {
  commit('saveNotificationsMutation', data);
}
