import { LocalStorage } from 'quasar';
export default {
  currentUser: LocalStorage.getItem('USER_INFO'),
};
