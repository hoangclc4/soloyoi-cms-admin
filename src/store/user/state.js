import { LocalStorage } from 'quasar';
export default {
  userList: LocalStorage.getItem('ADMIN_USER_LIST'),
  userInfo: LocalStorage.getItem('ADMIN_USER_INFO'),
  userPaymentLog: LocalStorage.getItem('ADMIN_USER_PAYMENT_LOG'),
};
