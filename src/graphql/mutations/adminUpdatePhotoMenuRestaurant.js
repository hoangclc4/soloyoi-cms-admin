import gql from 'graphql-tag';

export const ADMIN_UPDATE_PHOTO_MENU = gql`
  mutation adminUpdatePhotoMenuRestaurant(
    $input: AdminUpdatePhotoMenuRestaurantCondition!
    $photo: Upload!
  ) {
    result: adminUpdatePhotoMenuRestaurant(condition: $input, photo: $photo) {
      response {
        photoId
        photoOrder
        photoName
        photoMimeType
        photoEncoding
        photoThumbnailUrl
        photoFullWidthUrl
        photoTypes
        createdAt
        description
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
