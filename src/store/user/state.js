import { LocalStorage } from 'quasar';
export default {
  userList: LocalStorage.getItem('ADMIN_USER_LIST'),
  userInfo: LocalStorage.getItem('ADMIN_USER_INFO'),
  userPaymentLog: LocalStorage.getItem('ADMIN_USER_PAYMENT_LOG'),
  userPaymentInfo: LocalStorage.getItem('ADMIN_CREATED_USER_PAYMENT'),
  userPaymentInformation: LocalStorage.getItem('ADMIN_USER_PAYMENT_INFO'),
};
