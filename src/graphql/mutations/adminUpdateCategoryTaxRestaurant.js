import gql from 'graphql-tag';

export const ADMIN_UPDATE_CATEGORY_TAX = gql`
  mutation adminUpdateCategoryTaxRestaurant(
    $input: UpdateCategoryTaxCondition!
  ) {
    result: adminUpdateCategoryTaxRestaurant(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
