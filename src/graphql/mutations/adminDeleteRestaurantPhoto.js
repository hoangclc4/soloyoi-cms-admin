import gql from 'graphql-tag';

export const ADMIN_DELETE_RESTAURANT_PHOTO = gql`
  mutation adminDeleteRestaurantPhoto(
    $input: AdminDeleteRestaurantPhotoCondition!
  ) {
    result: adminDeleteRestaurantPhoto(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
