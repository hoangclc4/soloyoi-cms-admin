import gql from 'graphql-tag';

export const ADMIN_DELETE_REVIEW = gql`
  mutation($input: RemoveReviewRestaurantCondition!) {
    result: removeReviewRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
