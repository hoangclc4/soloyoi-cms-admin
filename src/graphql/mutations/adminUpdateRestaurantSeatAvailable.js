import gql from 'graphql-tag';

export const ADMIN_UPDATE_SEAT_AVAILABLE = gql`
  mutation adminUpdateRestaurantSeatAvailable(
    $input: AdminUpdateRestaurantSeatAvailableCondition!
  ) {
    result: adminUpdateRestaurantSeatAvailable(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
