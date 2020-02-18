import { LocalStorage } from 'quasar';

/**
 * @description save restaurant restaurantInfo data as a state
 * @author AnhTQ
 * @date 2019-12-10
 * @export
 * @param {*} state
 * @param {*} response
 */
export function saveRestaurantInformationMutation(state, { response }) {
  state.restaurantInfo = response.data.result.response;

  // If select one got value, so set array value for sync with Mobile App
  state.restaurantInfo.addressLevelOne = state.restaurantInfo.addressLevelOne
    ? state.restaurantInfo.addressLevelOne[0]
    : null;
  state.restaurantInfo.addressLevelTwo = state.restaurantInfo.addressLevelTwo
    ? state.restaurantInfo.addressLevelTwo[0]
    : null;
  state.restaurantInfo.addressLevelThree = state.restaurantInfo
    .addressLevelThree
    ? state.restaurantInfo.addressLevelThree[0]
    : null;
  state.restaurantInfo.aloneMenu = state.restaurantInfo.aloneMenu
    ? state.restaurantInfo.aloneMenu[0]
    : null;
  state.restaurantInfo.vipRestaurant.smoking = state.restaurantInfo
    .vipRestaurant.smoking
    ? state.restaurantInfo.vipRestaurant.smoking[0]
    : null;

  let photos = ['FirstIndexForAvatar'];

  // Sort follow rule: photos = [AVATAR, PHOTO 1, 2, 3, 4]
  state.restaurantInfo.photos.forEach((photo) => {
    switch (photo.photoTypes) {
      case 'AVATAR':
        photos[0] = photo;
        break;
      case 'PHOTOS':
        photos.push(photo);
        break;
    }
  });
  state.restaurantInfo.photos = photos;

  LocalStorage.set('ADMIN_RESTAURANT_INFO', state.restaurantInfo);
}

/**
 * @description save Restaurant Photo
 * @author AnhTQ
 * @date 2020-01-14
 * @export
 * @param {*} state
 * @param {*} { response, photoIndex }
 */
export function saveRestaurantPhotoMutation(state, { response, photoIndex }) {
  state.restaurantInfo.photos[photoIndex] = response.data.result.response;

  const isAvatar = photoIndex === 0;
  if (isAvatar) {
    state.restaurantInfo.avatar =
      state.restaurantInfo.photos[photoIndex].photoFullWidthUrl;
  }

  LocalStorage.set('ADMIN_RESTAURANT_INFO', state.restaurantInfo);
}

/**
 * @description delete Restaurant Photo
 * @author AnhTQ
 * @date 2020-01-14
 * @export
 * @param {*} state
 * @param {*} { photoIndex }
 */
export function deleteRestaurantPhotoMutation(state, { photoIndex }) {
  const isAvatar = photoIndex === 0;
  if (isAvatar) {
    state.restaurantInfo.photos[0] = 'FirstIndexForAvatar';
    state.restaurantInfo.avatar = null;
  } else {
    state.restaurantInfo.photos.splice(photoIndex, 1);
  }

  LocalStorage.set('ADMIN_RESTAURANT_INFO', state.restaurantInfo);
}

/**
 * @description update Restaurant SeatAvailable state
 * @author NamTS
 * @date 2020-02-18
 * @export
 * @param {*} state
 * @param {*} { input }
 */
export function updateSeatAvailableTodayMutation(state, { input }) {
  state.restaurantInfo.seatAvailable = input.seatAvailable;
  LocalStorage.set('ADMIN_RESTAURANT_INFO', state.restaurantInfo);
}
