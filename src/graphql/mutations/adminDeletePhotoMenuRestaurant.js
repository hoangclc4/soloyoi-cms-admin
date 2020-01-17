import gql from 'graphql-tag';

export const ADMIN_DELETE_PHOTO_MENU = gql`
  mutation adminDeletePhotoMenuRestaurant(
    $input: AdminDeletePhotoMenuRestaurantCondition!
  ) {
    result: adminDeletePhotoMenuRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
