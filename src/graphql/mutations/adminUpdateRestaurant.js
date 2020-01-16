import gql from 'graphql-tag';

export const ADMIN_UPDATE_RESTAURANT = gql`
  mutation adminUpdateRestaurant($input: AdminUpdateRestaurantCondition!) {
    result: adminUpdateRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
