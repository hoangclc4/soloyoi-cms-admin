import { LocalStorage } from 'quasar';

export default {
  userMasterdata: LocalStorage.getItem('ADMIN_USER_MASTERDATA'),
  restaurantMasterdata: LocalStorage.getItem('ADMIN_RESTAURANT_MASTERDATA'),
  addressLevelOneMaster: LocalStorage.getItem('ADDRESS_LEVEL_ONE_MASTER'),
  addressLevelTwoMaster: LocalStorage.getItem('ADDRESS_LEVEL_TWO_MASTER'),
  addressLevelThreeMaster: LocalStorage.getItem('ADDRESS_LEVEL_THREE_MASTER'),
};
