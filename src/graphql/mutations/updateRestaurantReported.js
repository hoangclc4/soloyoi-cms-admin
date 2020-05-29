import gql from 'graphql-tag';

export const UPDATE_RESTAURANT_REPORTED = gql`
  mutation adminUpdateRestaurantReport(
    $input: AdminUpdateRestaurantReportCondition!
  ) {
    result: adminUpdateRestaurantReport(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
