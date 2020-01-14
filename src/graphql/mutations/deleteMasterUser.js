import gql from 'graphql-tag';

export const DELETE_MASTER_USER = gql`
  mutation deleteMasterUser($input: DeleteMasterUserCondition!) {
    result: deleteMasterUser(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
