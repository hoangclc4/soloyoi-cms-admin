import gql from 'graphql-tag';

export const ADMIN_UPDATE_BANNER_PHOTO = gql`
  mutation adminUpdateBannerPhoto(
    $input: AdminUpdateBannerPhotoCondition
    $photo: Upload
  ) {
    result: adminUpdateBannerPhoto(condition: $input, photo: $photo) {
      response {
        photoId
        photoName
        photoMimeType
        photoEncoding
        photoFullWidthUrl
        photoTypes
        category
        active
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
