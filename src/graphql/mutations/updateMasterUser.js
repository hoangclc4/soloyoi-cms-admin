import gql from 'graphql-tag';

export const UPDATE_MASTER_USER = gql`
  mutation updateMasterUser($input: UpdateMasterUserCondition!) {
    result: updateMasterUser(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
