import gql from 'graphql-tag';

export const ADMIN_RESTAURANT_INFO = gql`
  query adminRestaurantInformation(
    $input: AdminRestaurantInformationCondition!
  ) {
    result: adminRestaurantInformation(condition: $input) {
      response {
        isVip
        restaurantId
        name
        description
        avatar
        address
        addressLevelOne
        addressLevelTwo
        addressLevelThree
        specificAddress
        phone
        email
        access
        priceRangeLow
        priceRangeHigh
        openTimes
        openTimeSearch
        regularHolidays
        url
        genderRatioMan
        genderRatioLady
        customerAgeMin
        customerAgeMax
        aloneMenu
        typeOfSake
        sakes
        lonelyScenes
        rating
        seatAvailable
        photos {
          photoId
          photoName
          photoMimeType
          photoEncoding
          photoThumbnailUrl
          photoFullWidthUrl
          photoTypes
          createdAt
        }
        vipRestaurant {
          yomigana
          payments
          snsFacebook
          snsInstagram
          snsTwitter
          numberOfSeatTable
          numberOfSeatCounter
          smoking
          languages
          features
          salesInformations
          typeOfMenus
          theAtmosphereOfTheCounters
          remarks
          locations
          memberRegistrationDate
          openDate
          catchPhrase
          wordsOfToday
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
