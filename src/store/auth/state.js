import { LocalStorage } from 'quasar';
export default {
  currentUser: LocalStorage.getItem('ADMIN_INFO'),
};
