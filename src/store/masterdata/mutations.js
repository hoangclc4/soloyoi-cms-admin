import { LocalStorage } from 'quasar';

/**
 * @description save Restaurant Master Data
 * @author AnhTQ
 * @date 2019-12-31
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveRestaurantMasterDataMutation(state, { response }) {
  state.restaurantMasterdata = state.restaurantMasterdata
    ? state.restaurantMasterdata
    : {};

  state.restaurantMasterdata.OpenTimeSearch = [];
  state.restaurantMasterdata.AloneMenu = [];
  state.restaurantMasterdata.Sake = [];
  state.restaurantMasterdata.LonelyScene = [];
  state.restaurantMasterdata.RestaurantPayment = [];
  state.restaurantMasterdata.Smoking = [];
  state.restaurantMasterdata.Languages = [];
  state.restaurantMasterdata.Features = [];
  state.restaurantMasterdata.SalesInformations = [];
  state.restaurantMasterdata.TypeOfMenu = [];
  state.restaurantMasterdata.TheAtmosphereOfTheCounter = [];
  state.restaurantMasterdata.Location = [];

  state.restaurantMasterdata.StaffStyle = [];
  state.restaurantMasterdata.StaffCanTalk = [];
  // StaffBirthplace will be added after retrieving addressLevelOne in function saveAddressLevelOneMutation

  response.data.result.response.forEach((data) => {
    switch (data.category.category) {
      case 'OpenTimeSearch':
        state.restaurantMasterdata.OpenTimeSearch.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'AloneMenu':
        state.restaurantMasterdata.AloneMenu.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'Sake':
        state.restaurantMasterdata.Sake.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'LonelyScene':
        state.restaurantMasterdata.LonelyScene.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'RestaurantPayment':
        state.restaurantMasterdata.RestaurantPayment.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'Smoking':
        state.restaurantMasterdata.Smoking.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'Languages':
        state.restaurantMasterdata.Languages.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'Features':
        state.restaurantMasterdata.Features.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'SalesInformations':
        state.restaurantMasterdata.SalesInformations.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'TypeOfMenu':
        state.restaurantMasterdata.TypeOfMenu.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'TheAtmosphereOfTheCounter':
        state.restaurantMasterdata.TheAtmosphereOfTheCounter.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'Location':
        state.restaurantMasterdata.Location.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'StaffStyle':
        state.restaurantMasterdata.StaffStyle.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'StaffCanTalk':
        state.restaurantMasterdata.StaffCanTalk.push({
          id: data.masterId,
          value: data.name,
        });
        break;
    }
  });

  LocalStorage.set('ADMIN_RESTAURANT_MASTERDATA', state.restaurantMasterdata);
}

/**
 * @description save User Master Data
 * @author AnhTQ
 * @date 2019-12-31
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveUserMasterDataMutation(state, { response }) {
  state.userMasterdata = state.userMasterdata ? state.userMasterdata : {};

  state.userMasterdata.SinglePersonArea = [];
  state.userMasterdata.Occupation = [];
  state.userMasterdata.Sake = [];
  state.userMasterdata.Smoking = [];
  state.userMasterdata.StoryStance = [];
  state.userMasterdata.FavoriteConversationGenre = [];
  state.userMasterdata.Personal = [];
  state.userMasterdata.WhenDrinkingAlone = [];

  state.userMasterdata.GenderOfPartner = [];
  state.userMasterdata.YourFeeling = [];
  state.userMasterdata.PaymentFeeling = [];
  state.userMasterdata.TimeFeeling = [];
  // UserBirthplace will be added after retrieving addressLevelOne in function saveAddressLevelOneMutatiom

  response.data.result.response.forEach((data) => {
    switch (data.category.category) {
      case 'SinglePersonArea':
        state.userMasterdata.SinglePersonArea.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'Occupation':
        state.userMasterdata.Occupation.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'Sake':
        state.userMasterdata.Sake.push({ id: data.masterId, value: data.name });
        break;
      case 'Smoking':
        state.userMasterdata.Smoking.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'StoryStance':
        state.userMasterdata.StoryStance.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'FavoriteConversationGenre':
        state.userMasterdata.FavoriteConversationGenre.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'Personal':
        state.userMasterdata.Personal.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'WhenDrinkingAlone':
        state.userMasterdata.WhenDrinkingAlone.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'GenderOfPartner':
        state.userMasterdata.GenderOfPartner.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'YourFeeling':
        state.userMasterdata.YourFeeling.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'PaymentFeeling':
        state.userMasterdata.PaymentFeeling.push({
          id: data.masterId,
          value: data.name,
        });
        break;
      case 'TimeFeeling':
        state.userMasterdata.TimeFeeling.push({
          id: data.masterId,
          value: data.name,
        });
        break;
    }
  });

  LocalStorage.set('ADMIN_USER_MASTERDATA', state.userMasterdata);
}

/**
 * @description save all Japan's province - level 1
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveAddressLevelOneMutation(state, { response }) {
  state.addressLevelOneMaster = response.data.result.response.map((data) => {
    return {
      id: data.postalCodeMasterId,
      value: data.name,
    };
  });

  LocalStorage.set('ADDRESS_LEVEL_ONE_MASTER', state.addressLevelOneMaster);

  // Add masterdata for StaffBirthplace and UserBirthplace
  let birthplace = [{ id: 'default', value: '海外' }];
  state.addressLevelOneMaster.forEach((data) => {
    birthplace.push(data);
  });

  state.restaurantMasterdata.StaffBirthplace = [...birthplace];
  state.userMasterdata.UserBirthplace = [...birthplace];

  LocalStorage.set('ADMIN_RESTAURANT_MASTERDATA', state.restaurantMasterdata);
  LocalStorage.set('ADMIN_USER_MASTERDATA', state.userMasterdata);
}

/**
 * @description save all Japan's child province - level 2
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export async function saveAddressLevelTwoMutation(state, { response }) {
  state.addressLevelTwoMaster = await response.data.result.response.map(
    (data) => {
      return {
        id: data.postalCodeMasterId,
        value: data.name,
      };
    }
  );
  LocalStorage.set('ADDRESS_LEVEL_TWO_MASTER', state.addressLevelTwoMaster);
}

/**
 * @description save all Japan's child province - level 3
 * @author AnhTQ
 * @date 2020-01-01
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveAddressLevelThreeMutation(state, { response }) {
  state.addressLevelThreeMaster = response.data.result.response.map((data) => {
    return {
      id: data.postalCodeMasterId,
      value: data.name,
    };
  });
  LocalStorage.set('ADDRESS_LEVEL_THREE_MASTER', state.addressLevelThreeMaster);
}
