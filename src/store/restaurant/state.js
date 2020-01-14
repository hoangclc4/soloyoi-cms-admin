import { LocalStorage } from 'quasar';
export default {
  restaurantList: LocalStorage.getItem('ADMIN_RESTAURANT_LIST'),
  restaurantInfo: LocalStorage.getItem('ADMIN_RESTAURANT_INFO'),
  createdRestaurant: LocalStorage.getItem('ADMIN_CREATED_RESTAURANT'),
};
