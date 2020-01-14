import gql from 'graphql-tag';

export const RESTAURANT_ALL_MASTER = gql`
  query getAllMasterRestaurant($input: GetAllMasterRestaurantCondition!) {
    result: getAllMasterRestaurant(condition: $input) {
      response {
        masterId
        category {
          category
          description
        }
        name
        description
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
