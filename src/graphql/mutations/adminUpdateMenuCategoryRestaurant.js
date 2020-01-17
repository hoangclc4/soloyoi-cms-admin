import gql from 'graphql-tag';

export const ADMIN_UPDATE_MENU_CATEGORY = gql`
  mutation adminUpdateMenuCategoryRestaurant(
    $input: AdminUpdateMenuCategoryRestaurantCondition!
  ) {
    result: adminUpdateMenuCategoryRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
