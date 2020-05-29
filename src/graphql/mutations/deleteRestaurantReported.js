import gql from 'graphql-tag';

export const DELETE_RESTAURANT_REPORTED = gql`
  mutation deleteRestaurantReported(
    $input: DeleteRestaurantReportedCondition!
  ) {
    result: deleteRestaurantReported(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
