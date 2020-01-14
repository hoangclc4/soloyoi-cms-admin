import gql from 'graphql-tag';

export const DELETE_RESTAURANT = gql`
  mutation deleteRestaurant($input: DeleteRestaurantCondition!) {
    result: deleteRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
