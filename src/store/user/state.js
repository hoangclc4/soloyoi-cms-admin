import { LocalStorage } from 'quasar';
export default {
  userList: LocalStorage.getItem('ADMIN_USER_LIST'),
};
