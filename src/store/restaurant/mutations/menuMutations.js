import { LocalStorage } from 'quasar';

/**
 * @description save Restaurant Menu Photo
 * @author AnhTQ
 * @date 2020-01-03
 * @export
 * @param {*} state
 * @param {*} { response, photoIndex }
 */
export function saveMenuPhotoMutation(state, { response, photoIndex }) {
  const saveAllPhoto = photoIndex === 'saveAllPhoto';

  if (saveAllPhoto) {
    state.restaurantMenuPhotos = [...response.data.result.response.photos];
  } else {
    state.restaurantMenuPhotos[photoIndex] = {
      ...response.data.result.response,
    };
  }

  LocalStorage.set('ADMIN_RESTAURANT_MENU_PHOTOS', state.restaurantMenuPhotos);
}

/**
 * @description save Restaurant Menu Item
 * @author AnhTQ
 * @date 2020-01-02
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveMenuItemMutation(state, { response, input }) {
  switch (input.menuTypes) {
    case 'FOOD':
      state.restaurantFoods = [...response.data.result.response.categories];

      LocalStorage.set('ADMIN_RESTAURANT_MENU_FOODS', state.restaurantFoods);
      break;
    case 'DRINK':
      state.restaurantDrinks = [...response.data.result.response.categories];

      LocalStorage.set('ADMIN_RESTAURANT_MENU_DRINKS', state.restaurantDrinks);
      break;
  }
}

/**
 * @description delete Restaurant Menu Photo
 * @author AnhTQ
 * @date 2020-01-04
 * @export
 * @param {*} state
 * @param {*} { photoIndex }
 */
export function deleteMenuPhotoMutation(state, { photoIndex }) {
  state.restaurantMenuPhotos.splice(photoIndex, 1);

  LocalStorage.set('ADMIN_RESTAURANT_MENU_PHOTOS', state.restaurantMenuPhotos);
}

/**
 * @description Update Restaurant Menu Item
 * @author NamTS
 * @date 2020-02-15
 * @export
 * @param {*} state
 * @param {*} { input, menuTypes }
 */
export function updateMenuItemMutation(state, { input, menuTypes }) {
  switch (menuTypes) {
    case 'FOOD':
      state.restaurantFoods = state.restaurantFoods.map((category) => {
        category.menuList = category.menuList.map((item) => {
          if (item.menuId === input.menuId) {
            item.name = input.name;
            item.price = input.price;
            item.afterTaxedPrice = input.afterTaxedPrice;
            item.isManual = input.isManual;
          }
          return item;
        });

        return category;
      });

      LocalStorage.set('ADMIN_RESTAURANT_MENU_FOODS', state.restaurantFoods);
      break;
    case 'DRINK':
      state.restaurantDrinks = state.restaurantDrinks.map((category) => {
        category.menuList = category.menuList.map((item) => {
          if (item.menuId === input.menuId) {
            item.name = input.name;
            item.price = input.price;
            item.afterTaxedPrice = input.afterTaxedPrice;
            item.isManual = input.isManual;
          }
          return item;
        });

        return category;
      });

      LocalStorage.set('ADMIN_RESTAURANT_MENU_DRINKS', state.restaurantDrinks);
      break;
  }
}
