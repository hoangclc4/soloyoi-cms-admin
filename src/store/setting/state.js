import { LocalStorage } from 'quasar';
export default {
  bannerInfo: LocalStorage.getItem('ADMIN_BANNER_INFO'),
  statusBanner: LocalStorage.getItem('ADMIN_STATUS_BANNER'),
};
