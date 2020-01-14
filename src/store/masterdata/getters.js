/**
 * @description get Restaurant Master Data
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} state
 * @returns
 */
export function getRestaurantMasterdataGetter(state) {
  return state.restaurantMasterdata ? state.restaurantMasterdata : {};
}

/**
 * @description get User Master Data
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} state
 * @returns
 */
export function getUserMasterdataGetter(state) {
  return state.userMasterdata ? state.userMasterdata : {};
}

/**
 * @description get all Japan's province - level 1
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} state
 * @returns
 */
export function getAddressLevelOneGetter(state) {
  return state.addressLevelOneMaster;
}

/**
 * @description get all Japan's child province - level 2
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} state
 * @returns
 */
export function getAddressLevelTwoGetter(state) {
  return state.addressLevelTwoMaster;
}

/**
 * @description get all Japan's child province - level 3
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} state
 * @returns
 */
export function getAddressLevelThreeGetter(state) {
  return state.addressLevelThreeMaster;
}
