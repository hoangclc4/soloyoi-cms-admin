import gql from 'graphql-tag';

export const UPDATE_MASTER_RESTAURANT = gql`
  mutation updateMasterRestaurant($input: UpdateMasterRestaurantCondition!) {
    result: updateMasterRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
