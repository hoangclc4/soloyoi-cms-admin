import authState from '../auth/state';
import restaurantState from '../restaurant/state';
import userState from '../user/state';
import notificationState from '../notification/state';
import masterdataState from '../masterdata/state';

export default {
  allState: [
    authState,
    restaurantState,
    userState,
    notificationState,
    masterdataState,
  ],
};
