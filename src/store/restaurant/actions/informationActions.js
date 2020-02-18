import { ADMIN_RESTAURANT_INFO } from '../../../graphql/queries/adminRestaurantInformation';
import { ADMIN_UPDATE_RESTAURANT } from '../../../graphql/mutations/adminUpdateRestaurant';
import { ADMIN_UPDATE_RESTAURANT_PHOTO } from '../../../graphql/mutations/adminUpdateRestaurantPhoto';
import { ADMIN_DELETE_RESTAURANT_PHOTO } from '../../../graphql/mutations/adminDeleteRestaurantPhoto';
import { ADMIN_UPDATE_SEAT_AVAILABLE } from '../../../graphql/mutations/adminUpdateRestaurantSeatAvailable';

/**
 * @description call API Fetch Restaurant Information for Admin
 * @author AnhTQ
 * @date 2020-01-13
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiFetchRestaurantInformationAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.query({
      query: ADMIN_RESTAURANT_INFO,
      variables: { input },
    });

    // Fetch Information Success
    if (response.data.result.error.requestResolved) {
      commit('saveRestaurantInformationMutation', { response });
      return { requestResolved: true };
    }
    // Fetch Information Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Restaurant Information
 * @author AnhTQ
 * @date 2020-01-14
 * @export
 * @param {*} context
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateRestaurantAction(
  context,
  { apolloClient, input }
) {
  try {
    const year = input.vipRestaurant.openDate
      ? input.vipRestaurant.openDate.substring(0, 4)
      : null;
    const month = input.vipRestaurant.openDate
      ? input.vipRestaurant.openDate.substring(5, 7)
      : null;
    // Scala Datetime Format: YYYY-MM-DDTHH:mm:ss:sssZ
    const openDate = isNaN(parseInt(year))
      ? null
      : `${year}-${month}-01T01:00:00.000Z`;

    // If select one got no value, so set null value for sync with Mobile App
    const addressLevelOne = input.addressLevelOne
      ? [input.addressLevelOne]
      : null;
    const addressLevelTwo = input.addressLevelTwo
      ? [input.addressLevelTwo]
      : null;
    const addressLevelThree = input.addressLevelThree
      ? [input.addressLevelThree]
      : null;
    const aloneMenu = input.aloneMenu ? [input.aloneMenu] : null;
    const smoking = input.vipRestaurant.smoking
      ? [input.vipRestaurant.smoking]
      : null;

    const variables = {
      input: {
        restaurantId: input.restaurantId,
        name: input.name,
        description: input.description,
        addressLevelOne,
        addressLevelTwo,
        addressLevelThree,
        specificAddress: input.specificAddress,
        lat: input.lat,
        lng: input.lng,
        phone: input.phone,
        email: input.email,
        access: input.access,
        priceRangeLow: parseInt(input.priceRangeLow),
        priceRangeHigh: parseInt(input.priceRangeHigh),
        openTimeSearch: input.openTimeSearch,
        openTimes: input.openTimes,
        regularHolidays: input.regularHolidays,
        url: input.url,
        genderRatioMan: parseInt(input.genderRatioMan),
        genderRatioLady: parseInt(input.genderRatioLady),
        customerAgeMin: parseInt(input.customerAgeMin),
        customerAgeMax: parseInt(input.customerAgeMax),
        aloneMenu,
        typeOfSake: input.typeOfSake,
        sakes: input.sakes,
        lonelyScenes: input.lonelyScenes,
        vipRestaurant: {
          yomigana: input.vipRestaurant.yomigana,
          payments: input.vipRestaurant.payments,
          snsFacebook: input.vipRestaurant.snsFacebook,
          snsInstagram: input.vipRestaurant.snsInstagram,
          snsTwitter: input.vipRestaurant.snsTwitter,
          numberOfSeatTable: parseInt(input.vipRestaurant.numberOfSeatTable),
          numberOfSeatCounter: parseInt(
            input.vipRestaurant.numberOfSeatCounter
          ),
          smoking,
          languages: input.vipRestaurant.languages,
          features: input.vipRestaurant.features,
          salesInformations: input.vipRestaurant.salesInformations,
          typeOfMenus: input.vipRestaurant.typeOfMenus,
          theAtmosphereOfTheCounters:
            input.vipRestaurant.theAtmosphereOfTheCounters,
          remarks: input.vipRestaurant.remarks,
          locations: input.vipRestaurant.locations,
          memberRegistrationDate: input.vipRestaurant.memberRegistrationDate,
          openDate,
          catchPhrase: input.vipRestaurant.catchPhrase,
        },
      },
    };

    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_RESTAURANT,
      variables,
    });

    // Update Restaurant Information Success
    if (response.data.result.requestResolved) {
      return { requestResolved: true };
    }
    // Update Restaurant Information Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Restaurant Photo
 * @author AnhTQ
 * @date 2019-12-26
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, photo, photoIndex }
 * @returns
 */
export async function apiUpdateRestaurantPhotoAction(
  { commit },
  { apolloClient, input, photo, photoIndex }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_RESTAURANT_PHOTO,
      variables: { input, photo },
    });

    // Update Photo Success
    if (response.data.result.error.requestResolved) {
      commit('saveRestaurantPhotoMutation', { response, photoIndex });

      return { requestResolved: true };
    }
    // Update Photo Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Delete Restaurant Photo
 * @author AnhTQ
 * @date 2020-01-04
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input, photoIndex }
 * @returns
 */
export async function apiDeleteRestaurantPhotoAction(
  { commit },
  { apolloClient, input, photoIndex }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_DELETE_RESTAURANT_PHOTO,
      variables: { input },
    });

    // Delete Photo Success
    if (response.data.result.requestResolved) {
      commit('deleteRestaurantPhotoMutation', { photoIndex });

      return { requestResolved: true };
    }
    // Delete Photo Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}

/**
 * @description call API Update Restaurant SeatAvailable
 * @author NamTS
 * @date 2020-02-18
 * @export
 * @param {*} { commit }
 * @param {*} { apolloClient, input }
 * @returns
 */
export async function apiUpdateSeatAvailableTodayAction(
  { commit },
  { apolloClient, input }
) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADMIN_UPDATE_SEAT_AVAILABLE,
      variables: { input },
    });
    // Update Restaurant SeatAvailable Success
    if (response.data.result.requestResolved) {
      commit('updateSeatAvailableTodayMutation', { input });
      return { requestResolved: true };
    }
    // Update Restaurant SeatAvailable Failed
    else {
      return { requestResolved: false, systemError: null };
    }
  } catch (systemError) {
    return { requestResolved: false, systemError };
  }
}
