import { LocalStorage } from 'quasar';

export default {
  userReportedList: LocalStorage.getItem('ADMIN_USER_REPORTED_LIST'),
  restaurantReportedList: LocalStorage.getItem(
    'ADMIN_RESTAURANT_REPORTED_LIST'
  ),
  newsfeedReportedList: LocalStorage.getItem('ADMIN_NEWSFEED_REPORTED_LIST'),
};
