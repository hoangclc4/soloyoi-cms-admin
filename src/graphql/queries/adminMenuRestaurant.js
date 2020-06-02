import gql from 'graphql-tag';

export const ADMIN_MENU_RESTAURANT = gql`
  query adminMenuRestaurant($input: AdminMenuRestaurantCondition!) {
    result: adminMenuRestaurant(condition: $input) {
      response {
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
        categories {
          menuCategoryId
          menuList {
            menuId
            name
            price
            afterTaxedPrice
            isManual
            createdAt
          }
          name
          order
          taxRate
          taxFlag
          typeOfTaxed
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
