import { LocalStorage } from 'quasar';

/**
 * @description initial all state
 * @author AnhTQ
 * @date 2020-01-01
 * @param {*} state
 */
function initialState(state) {
  state.allState.forEach((s) => {
    Object.keys(s).forEach((key) => {
      s[key] = null;
    });
  });
}

/**
 * @description clear all state and localStorage
 * @author AnhTQ
 * @date 2019-12-22
 * @export
 * @param {*} state
 */
export function clearDataMutation(state) {
  initialState(state);

  LocalStorage.clear();
}
