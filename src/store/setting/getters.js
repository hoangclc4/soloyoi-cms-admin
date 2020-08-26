/**
 * @description get banner information from state
 * @author TungPT
 * @date 2020-08-25
 * @export
 * @param {*} state
 * @returns
 */
export function getBannerInfoGetter(state) {
  return state.bannerInfo ? state.bannerInfo : {};
}
