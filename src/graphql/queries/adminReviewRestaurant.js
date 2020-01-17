import gql from 'graphql-tag';

export const ADMIN_REVIEW_RESTAURANT = gql`
  query adminReviewRestaurant(
    $input: AdminReviewRestaurantCondition!
    $pager: PagerCondition
  ) {
    result: adminReviewRestaurant(condition: $input, pagerCondition: $pager) {
      response {
        reviewRestaurantList {
          reviewId
          user {
            nickName
          }
          rate
          comment
          createdAt
          updatedAt
        }
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
