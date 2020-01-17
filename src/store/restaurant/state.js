import { LocalStorage } from 'quasar';
export default {
  restaurantList: LocalStorage.getItem('ADMIN_RESTAURANT_LIST'),
  pendingRestaurantList: [],
  restaurantInfo: LocalStorage.getItem('ADMIN_RESTAURANT_INFO'),
  createdRestaurant: LocalStorage.getItem('ADMIN_CREATED_RESTAURANT'),
  restaurantMenuPhotos: LocalStorage.getItem('ADMIN_RESTAURANT_MENU_PHOTOS'),
  restaurantFoods: LocalStorage.getItem('ADMIN_RESTAURANT_MENU_FOODS'),
  restaurantDrinks: LocalStorage.getItem('ADMIN_RESTAURANT_MENU_DRINKS'),
  restaurantStaff: LocalStorage.getItem('ADMIN_RESTAURANT_STAFF'),
  restaurantReview: LocalStorage.getItem('ADMIN_RESTAURANT_REVIEW'),
};
