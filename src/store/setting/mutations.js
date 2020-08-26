import { LocalStorage } from 'quasar';

/**
 * @description save Banner Photo
 * @author TungPT
 * @date 2020-08-25
 * @export
 * @param {*} state
 * @param {*} { response, photoIndex }
 */
export function saveBannerPhotoMutation(state, { response }) {
  state.bannerInfo = {
    ...response.data.result.response,
  };
  LocalStorage.set('ADMIN_BANNER_INFO', state.bannerInfo);
}
