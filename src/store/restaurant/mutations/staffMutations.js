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
      formattedBirthday: new Date(data.staffBirthday).toLocaleDateString('ja', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
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

/**
 * @description save Updated Restaurant Staff Information
 * @author AnhTQ
 * @date 2020-02-18
 * @export
 * @param {*} state
 * @param {*} { input }
 */
export function saveUpdatedStaffMutation(state, { input }) {
  const staffList = [...state.restaurantStaff];
  state.restaurantStaff = staffList.map((staff) => {
    if (staff.id === input.id) {
      input.formattedBirthday = new Date(input.birthday).toLocaleDateString(
        'ja',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }
      );
      return input;
    } else {
      return staff;
    }
  });

  LocalStorage.set('ADMIN_RESTAURANT_STAFF', state.restaurantStaff);
}

/**
 * @description save Deleted Restaurant Staff Information
 * @author AnhTQ
 * @date 2020-02-18
 * @export
 * @param {*} state
 * @param {*} { input }
 */
export function saveDeletedStaffMutation(state, { input }) {
  const staffList = [...state.restaurantStaff];
  state.restaurantStaff = staffList.filter((staff) => {
    return staff.id !== input.staffId;
  });

  LocalStorage.set('ADMIN_RESTAURANT_STAFF', state.restaurantStaff);
}
