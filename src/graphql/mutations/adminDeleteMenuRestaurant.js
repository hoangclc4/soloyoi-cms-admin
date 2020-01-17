import gql from 'graphql-tag';

export const ADMIN_DELETE_MENU = gql`
  mutation adminDeleteMenuRestaurant(
    $input: AdminDeleteMenuRestaurantCondition!
  ) {
    result: adminDeleteMenuRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
