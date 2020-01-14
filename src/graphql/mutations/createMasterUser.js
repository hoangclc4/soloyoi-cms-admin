import gql from 'graphql-tag';

export const CREATE_MASTER_USER = gql`
  mutation createMasterUser($input: CreateMasterUserCondition!) {
    result: createMasterUser(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
