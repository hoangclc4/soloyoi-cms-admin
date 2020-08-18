import { LocalStorage } from 'quasar';

/**
 * @description save user list data as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveUserMutation(state, { response }) {
  state.userList = [...response.data.result.response.adminUserFacebookList];
  state.userList = state.userList.map((user) => {
    if (user.paymentInfo && user.paymentInfo.productId === 'food.day.730') {
      user.paymentInfo.productId = '今日だけ';
      const endDate = new Date(user.paymentInfo.endDate);
      user.paymentInfo.endDate = endDate.setDate(endDate.getDate() + 1);
    } else if (
      user.paymentInfo &&
      user.paymentInfo.productId === 'food.sub.month.3600'
    ) {
      user.paymentInfo.productId = '1ヶ月';
      const endDate = new Date(user.paymentInfo.endDate);
      user.paymentInfo.endDate = endDate.setDate(endDate.getDate() + 1);
    } else if (
      user.paymentInfo &&
      user.paymentInfo.productId === 'food.sub.3month.2600'
    ) {
      user.paymentInfo.productId = '3ヶ月';
      const endDate = new Date(user.paymentInfo.endDate);
      user.paymentInfo.endDate = endDate.setDate(endDate.getDate() + 1);
    } else if (
      user.paymentInfo &&
      user.paymentInfo.productId === 'food.sub.6month.1800'
    ) {
      user.paymentInfo.productId = '6ヶ月';
      const endDate = new Date(user.paymentInfo.endDate);
      user.paymentInfo.endDate = endDate.setDate(endDate.getDate() + 1);
    } else if (user.paymentInfo && user.paymentInfo.productId === 'default') {
      user.paymentInfo.productId = '管理者で設定';
    }
    return user;
  });
  LocalStorage.set('ADMIN_USER_LIST', state.userList);
}
