import gql from 'graphql-tag';

export const CREATE_RESTAURANT = gql`
  mutation createRestaurant($input: CreateRestaurantCondition!) {
    result: createRestaurant(condition: $input) {
      response {
        restaurantId
        username
        password
        name
        email
        address
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
