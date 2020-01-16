import gql from 'graphql-tag';

export const ADMIN_UPDATE_MENU = gql`
  mutation adminUpdateMenuRestaurant(
    $input: AdminUpdateMenuRestaurantCondition!
  ) {
    result: adminUpdateMenuRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
