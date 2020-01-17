import gql from 'graphql-tag';

export const ADMIN_DELETE_MENU_CATEGORY = gql`
  mutation adminDeleteMenuCategoryRestaurant(
    $input: AdminDeleteMenuCategoryRestaurantCondition!
  ) {
    result: adminDeleteMenuCategoryRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
