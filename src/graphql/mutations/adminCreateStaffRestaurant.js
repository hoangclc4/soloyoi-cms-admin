import gql from 'graphql-tag';

export const ADMIN_CREATE_STAFF = gql`
  mutation adminCreateStaffRestaurant(
    $input: AdminCreateStaffRestaurantCondition!
    $photo: Upload
  ) {
    result: adminCreateStaffRestaurant(condition: $input, photo: $photo) {
      requestResolved
      message
      errorCode
    }
  }
`;
