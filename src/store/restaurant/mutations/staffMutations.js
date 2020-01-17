import { LocalStorage } from 'quasar';

/**
 * @description save Restaurant Staff
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveRestaurantStaffMutation(state, { response }) {
  state.restaurantStaff = [];

  response.data.result.response.forEach((data) => {
    state.restaurantStaff.push({
      id: data.staffId,
      oldPhotoId: data.staffPhotoId,
      photoSrc: data.staffPhoto,
      name: data.staffName,
      birthday: data.staffBirthday,
      // If select one got value, so set array value for sync with Mobile App
      birthplace: data.staffBirthplace ? data.staffBirthplace[0] : null,
      title: data.staffTitle,
      style: data.staffStyle,
      profile: data.staffProfile,
      canTalk: data.staffCanTalk,
    });
  });

  LocalStorage.set('ADMIN_RESTAURANT_STAFF', state.restaurantStaff);
}
