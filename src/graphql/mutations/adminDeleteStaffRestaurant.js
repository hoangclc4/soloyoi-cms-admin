import gql from 'graphql-tag';

export const ADMIN_DELETE_STAFF = gql`
  mutation adminDeleteStaffRestaurant(
    $input: AdminDeleteStaffRestaurantCondition!
  ) {
    result: adminDeleteStaffRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
