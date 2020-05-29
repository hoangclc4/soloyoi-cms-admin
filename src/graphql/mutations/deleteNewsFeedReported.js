import gql from 'graphql-tag';

export const DELETE_NEWSFEED_REPORTED = gql`
  mutation deleteNewsFeedReported($input: DeleteNewsFeedReportedCondition!) {
    result: deleteNewsFeedReported(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
