import gql from 'graphql-tag';

export const ADMIN_CREATE_MENU_CATEGORY = gql`
  mutation adminCreateMenuCategoryRestaurant(
    $input: AdminCreateMenuCategoryRestaurantCondition!
  ) {
    result: adminCreateMenuCategoryRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
