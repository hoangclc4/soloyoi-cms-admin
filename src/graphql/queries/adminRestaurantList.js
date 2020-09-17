import gql from 'graphql-tag';

export const ADMIN_RESTAURANT_LIST = gql`
  query adminRestaurantList($pager: PagerCondition!) {
    result: adminRestaurantList(pagerCondition: $pager) {
      response {
        adminRestaurantList {
          isVip
          restaurantId
          defaultId
          name
          address
          addressLevelOne
          addressLevelTwo
          addressLevelThree
          specificAddress
          phone
          email
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
