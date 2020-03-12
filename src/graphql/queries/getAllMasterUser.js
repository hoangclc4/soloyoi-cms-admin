import gql from 'graphql-tag';

export const USER_ALL_MASTER = gql`
  query getAllMasterUser($input: GetAllMasterUserCondition) {
    result: getAllMasterUser(condition: $input) {
      response {
        masterId
        category {
          category
          description
        }
        name
        description
        order
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
