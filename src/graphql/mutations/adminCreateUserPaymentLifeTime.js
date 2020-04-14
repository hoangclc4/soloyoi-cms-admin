import gql from 'graphql-tag';

export const ADMIN_CREATE_USER_PAYMENT_LIFETIME = gql`
  mutation adminCreateUserPaymentLifeTime(
    $input: AdminCreateUserPaymentLifeTimeCondition!
  ) {
    result: adminCreateUserPaymentLifeTime(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
