import { LocalStorage } from 'quasar';
export default {
  bannerInfo: LocalStorage.getItem('ADMIN_BANNER_INFO'),
};
