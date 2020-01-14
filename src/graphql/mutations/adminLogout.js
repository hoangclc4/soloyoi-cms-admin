import gql from 'graphql-tag';

export const ADMIN_LOGOUT = gql`
  mutation logoutAdmin {
    result: logoutAdmin {
      requestResolved
      message
      errorCode
    }
  }
`;
