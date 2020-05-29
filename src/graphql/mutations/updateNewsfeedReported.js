import gql from 'graphql-tag';

export const UPDATE_NEWSFEED_REPORTED = gql`
  mutation adminUpdateNewsfeedReport(
    $input: AdminUpdateNewsfeedReportCondition!
  ) {
    result: adminUpdateNewsfeedReport(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
