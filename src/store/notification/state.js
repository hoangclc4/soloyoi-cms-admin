import { LocalStorage } from 'quasar';
export default {
  notification: LocalStorage.getItem('ADMIN_NOTIFICATION'),
};
