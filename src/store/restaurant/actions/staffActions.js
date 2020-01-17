import { ADMIN_STAFF_LIST } from '../../../graphql/queries/adminStaffRestaurantList';
import { ADMIN_CREATE_STAFF } from '../../../graphql/mutations/adminCreateStaffRestaurant';
import { ADMIN_UPDATE_STAFF } from '../../../graphql/mutations/adminUpdateStaffRestaurant';
import { ADMIN_DELETE_STAFF } from '../../../graphql/mutations/adminDeleteStaffRestaurant';

/**
 * @description call API Fetch Restaurant Staff
 * @author AnhTQ
 * @date 2020-01-15
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchRestaurantStaffAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_STAFF_LIST,
      variables: { input },
    });

    // Fetch Staff Success
    if (response.data.result.error === null) {
      commit('saveRestaurantStaffMutation', { response });
      return { requestResolved: true };
    }
    // Fetch Staff Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Create Restaurant Staff
 * @author AnhTQ
 * @date 2020-01-08
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiCreateRestaurantStaffAction(
  context,
  { apolloClient, input }
) {
  try {
    const year = input.birthday.substring(0, 4);
    const month = input.birthday.substring(5, 7);
    // Scala Datetime Format: YYYY-MM-DDTHH:mm:ss:sssZ
    const staffBirthday = isNaN(parseInt(year))
      ? null
      : `${year}-${month}-01T01:00:00.000Z`;

    const variables = {
      input: {
        restaurantId: input.restaurantId,
        staffName: input.name,
        staffBirthday,
        // If select one got no value, so set null value for sync with Mobile App
        staffBirthplace: input.birthplace ? [input.birthplace] : null,
        staffTitle: input.title,
        staffStyle: input.style,
        staffProfile: input.profile,
        staffCanTalk: input.canTalk,
      },
      photo: input.photoFile,
    };
    const response = await apolloClient.mutate({
      mutation: ADMIN_CREATE_STAFF,
      variables,
    });

    // Update Staff Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Update Staff Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Restaurant Staff
 * @author AnhTQ
 * @date 2020-01-08
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateRestaurantStaffAction(
  context,
  { apolloClient, input }
) {
  try {
    const year = input.birthday ? input.birthday.substring(0, 4) : null;
    const month = input.birthday ? input.birthday.substring(5, 7) : null;
    const day = input.birthday ? input.birthday.substring(8, 10) : null;
    // Scala Datetime Format: YYYY-MM-DDTHH:mm:ss:sssZ
    const staffBirthday = isNaN(parseInt(year))
      ? null
      : `${year}-${month}-${day}T01:00:00.000Z`;

    // If select one got no value, so set null value for sync with Mobile App
    const staffBirthplace = input.birthplace ? [input.birthplace] : null;

    const variables = {
      input: {
        restaurantId: input.restaurantId,
        staffId: input.id,
        oldPhotoId: input.oldPhotoId,
        staffName: input.name,
        staffBirthday,
        staffBirthplace,
        staffTitle: input.title,
        staffStyle: input.style,
        staffProfile: input.profile,
        staffCanTalk: input.canTalk,
      },
      photo: input.photoFile,
    };

    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_STAFF,
      variables,
    });

    // Update Staff Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Update Staff Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Delete Restaurant Staff
 * @author AnhTQ
 * @date 2020-01-08
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiDeleteRestaurantStaffAction(
  context,
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_DELETE_STAFF,
      variables: { input },
    });

    // Delete Staff Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Delete Staff Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
