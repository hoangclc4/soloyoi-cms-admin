import gql from 'graphql-tag';

export const ADMIN_ADD_PHOTO_MENU = gql`
  mutation adminAddPhotoMenuRestaurant(
    $input: AdminAddPhotoMenuRestaurantCondition!
    $photo: Upload!
  ) {
    result: adminAddPhotoMenuRestaurant(condition: $input, photo: $photo) {
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
