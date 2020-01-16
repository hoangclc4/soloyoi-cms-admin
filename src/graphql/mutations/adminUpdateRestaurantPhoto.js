import gql from 'graphql-tag';

export const ADMIN_UPDATE_RESTAURANT_PHOTO = gql`
  mutation adminUpdateRestaurantPhoto(
    $input: AdminUpdateRestaurantPhotoCondition!
    $photo: Upload
  ) {
    result: adminUpdateRestaurantPhoto(condition: $input, photo: $photo) {
      response {
        photoId
        photoName
        photoMimeType
        photoEncoding
        photoThumbnailUrl
        photoFullWidthUrl
        photoTypes
        createdAt
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
