import gql from 'graphql-tag';

export const DELETE_MASTER_RESTAURANT = gql`
  mutation deleteMasterRestaurant($input: DeleteMasterRestaurantCondition!) {
    result: deleteMasterRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
