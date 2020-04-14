import gql from 'graphql-tag';

export const ADMIN_SETTING_USER_PAYMENT = gql`
  mutation adminSettingUserPayment($input: AdminSettingUserPaymentCondition!) {
    result: adminSettingUserPayment(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
