import { LocalStorage } from 'quasar';

/**
 * @description initial all state
 * @author AnhTQ
 * @date 2019-12-10
 * @param {*} allState
 */
function initialState(allState) {
  allState.forEach((state) => {
    Object.keys(state).forEach((key) => {
      state[key] = null;
    });
  });
}

/**
 * @description clear all state and localStorage
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 */
export function clearData(state) {
  initialState(state.allState);
  LocalStorage.clear();
}
