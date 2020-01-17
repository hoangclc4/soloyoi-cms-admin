import gql from 'graphql-tag';

export const ADMIN_USER_FACEBOOK_PROFILE = gql`
  query adminUserFacebookProfile($input: AdminUserFacebookProfileCondition!) {
    result: adminUserFacebookProfile(condition: $input) {
      response {
        userId
        nickName
        facebookAvatar
        facebookFullName
        facebookBirthday
        selfIntroduction
        placeOfBirth
        residence
        singlePersonArea
        occupation
        sake
        smoking
        storyStance
        favoriteConversationGenre
        personal
        whenDrinkingAlone
        paymentStatus
        createdAt
        updatedAt
        photos {
          photoId
          photoName
          photoMimeType
          photoEncoding
          photoThumbnailUrl
          photoFullWidthUrl
          photoTypes
          createdAt
          description
        }
        myFeeling {
          drinkingArea
          todayComment
          ageOfPartner
          genderOfPartner
          yourFeeling
          paymentFeeling
          timeFeeling
          updatedAt
        }
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
