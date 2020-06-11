import gql from 'graphql-tag';

export const RESET_PASSWORD_USER = gql`
  mutation resetPassword($input: ResetPasswordCondition!) {
    result: resetPassword(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
