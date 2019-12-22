import { LocalStorage } from 'quasar';
export default {
  notifications: LocalStorage.getItem('NOTIFICATIONS'),
};
