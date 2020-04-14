import gql from 'graphql-tag';

export const ADMIN_USER_PAYMENT = gql`
  query adminUserPayment($input: AdminUserPaymentCondition!) {
    result: adminUserPayment(condition: $input) {
      response {
        userPaymentId
        userId
        isCancelled
        startDate
        endDate
        app
        status
        typePaymentRegister
        createdAt
        updatedAt
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
