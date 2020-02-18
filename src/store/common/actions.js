/**
 * @description clear all state and localStorage
 * @author AnhTQ
 * @date 2019-12-22
 * @export
 * @param {*} { commit }
 */
export function clearDataAction({ commit }) {
  commit('clearDataMutation');
}
