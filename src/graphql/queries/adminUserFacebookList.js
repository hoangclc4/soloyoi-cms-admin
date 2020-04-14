import gql from 'graphql-tag';

export const ADMIN_USER_FACEBOOK_LIST = gql`
  query adminUserFacebookList($pager: PagerCondition!) {
    result: adminUserFacebookList(pagerCondition: $pager) {
      response {
        adminUserFacebookList {
          userId
          nickName
          permission
          isAvailable
          facebookToken
          facebookId
          facebookFullName
          facebookAvatar
          facebookEmail
          facebookBirthday
          facebookGender
          facebookAddress
          facebookHometown
          facebookLink
          userPhone
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
          selfIntroduction
          singlePersonArea
          occupation
          sake
          smoking
          storyStance
          favoriteConversationGenre
          personal
          whenDrinkingAlone
          residence
          placeOfBirth
          paymentStatus
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
          createdAt
          updatedAt
          paymentInfo {
            createdAt
            updatedAt
            userPaymentId
            userId
            startDate
            endDate
            app
            status
            typePaymentRegister
          }
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
