import gql from 'graphql-tag';

export const ADMIN_USER_PAYMENT_LOG = gql`
  query adminUserPaymentLogs($input: AdminUserPaymentLogsCondition!) {
    result: adminUserPaymentLogs(condition: $input) {
      response {
        userPaymentLogId
        userId
        descriptions
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
