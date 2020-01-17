import gql from 'graphql-tag';

export const ADMIN_CREATE_MENU = gql`
  mutation adminCreateMenuRestaurant(
    $input: AdminCreateMenuRestaurantCondition!
  ) {
    result: adminCreateMenuRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
