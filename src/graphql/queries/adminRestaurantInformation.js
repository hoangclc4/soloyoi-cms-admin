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
        lat
        lng
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
        reviews {
          reviewId
          user {
            userId
            nickName
            isAvailable
            facebookFullName
            facebookAvatar
            facebookEmail
            facebookBirthday
            facebookGender
            facebookAddress
            facebookHometown
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
            }
            selfIntroduction
            age
            isLiked
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
            createdAt
            updatedAt
          }
          comment
          rate
          createdAt
        }
        menus {
          foods {
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
            categories {
              menuCategoryId
              menuList {
                menuId
                name
                price
                createdAt
              }
              name
            }
          }
          drinks {
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
            categories {
              menuCategoryId
              menuList {
                menuId
                name
                price
                createdAt
              }
              name
            }
          }
        }
        staffs {
          staffId
          staffName
          staffPhoto
          staffBirthday
          staffBirthplace
          staffTitle
          staffStyle
          staffProfile
          staffCanTalk
          staffPhotoId
        }
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
