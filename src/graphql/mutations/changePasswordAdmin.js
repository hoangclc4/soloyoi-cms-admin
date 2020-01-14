import gql from 'graphql-tag';

export const CHANGE_PASSWORD_ADMIN = gql`
  mutation changePasswordAdmin($input: ChangePasswordAdminCondition!) {
    result: changePasswordAdmin(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
