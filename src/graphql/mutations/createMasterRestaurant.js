import gql from 'graphql-tag';

export const CREATE_MASTER_RESTAURANT = gql`
  mutation createMasterRestaurant($input: CreateMasterRestaurantCondition!) {
    result: createMasterRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
