import { LocalStorage } from 'quasar';
import { decodeEmojiText } from '../../common/actions';

/**
 * @description save user information as a state with decode self introduction and today comment
 * @author AnhTQ
 * @date 2020-02-26
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveUserInformationMutation(state, { response }) {
  let userInfo = { ...response.data.result.response };

  // Handle Profile data
  userInfo.selfIntroduction = decodeEmojiText(userInfo.selfIntroduction);
  userInfo.placeOfBirth = userInfo.placeOfBirth
    ? userInfo.placeOfBirth[0]
    : null;
  userInfo.smoking = userInfo.smoking ? userInfo.smoking[0] : null;
  userInfo.storyStance = userInfo.storyStance ? userInfo.storyStance[0] : null;
  // handle selection with others
  userInfo.singlePersonArea = userInfo.singlePersonArea
    ? userInfo.singlePersonArea.other
      ? [
          { id: 'other', value: userInfo.singlePersonArea.other },
          ...userInfo.singlePersonArea.default,
        ]
      : userInfo.singlePersonArea.default
    : null;
  userInfo.occupation = userInfo.occupation
    ? userInfo.occupation.other
      ? { id: 'other', value: userInfo.occupation.other }
      : userInfo.occupation.default[0]
    : null;
  userInfo.favoriteConversationGenre = userInfo.favoriteConversationGenre
    ? userInfo.favoriteConversationGenre.other
      ? [
          { id: 'other', value: userInfo.favoriteConversationGenre.other },
          ...userInfo.favoriteConversationGenre.default,
        ]
      : userInfo.favoriteConversationGenre.default
    : null;

  // Handle Feeling Today data
  let myFeeling = { ...userInfo.myFeeling };
  myFeeling.todayComment = decodeEmojiText(myFeeling.todayComment);
  myFeeling.ageOfPartner = myFeeling.ageOfPartner
    ? myFeeling.ageOfPartner[0]
    : null;
  myFeeling.genderOfPartner = myFeeling.genderOfPartner
    ? myFeeling.genderOfPartner[0]
    : null;
  myFeeling.timeFeeling = myFeeling.timeFeeling
    ? myFeeling.timeFeeling[0]
    : null;
  userInfo.myFeeling = { ...myFeeling };

  state.userInfo = { ...userInfo };

  LocalStorage.set('ADMIN_USER_INFO', state.userInfo);
}

/**
 * @description save user payment log as a state
 * @author AnhTQ
 * @date 2020-02-26
 * @export
 * @param {*} state
 * @param {*} { response }
 */
export function saveUserPaymentLogMutation(state, { response }) {
  state.userPaymentLog = [...response.data.result.response];

  LocalStorage.set('ADMIN_USER_PAYMENT_LOG', state.userPaymentLog);
}
