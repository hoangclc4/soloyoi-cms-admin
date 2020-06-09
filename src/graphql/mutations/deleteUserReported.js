import gql from 'graphql-tag';

export const DELETE_USER_REPORTED = gql`
  mutation deleteUserReported($input: DeleteUserReportedCondition!) {
    result: deleteUserReported(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
