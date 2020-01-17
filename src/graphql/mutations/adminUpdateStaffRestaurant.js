import gql from 'graphql-tag';

export const ADMIN_UPDATE_STAFF = gql`
  mutation adminUpdateStaffRestaurant(
    $input: AdminUpdateStaffRestaurantCondition!
    $photo: Upload
  ) {
    result: adminUpdateStaffRestaurant(condition: $input, photo: $photo) {
      requestResolved
      message
      errorCode
    }
  }
`;
