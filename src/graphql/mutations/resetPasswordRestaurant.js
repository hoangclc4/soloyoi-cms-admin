import gql from 'graphql-tag';

export const RESET_PASSWORD_RESTAURANT = gql`
  mutation resetPasswordRes($input: ResetPasswordResCondition!) {
    result: resetPasswordRes(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
