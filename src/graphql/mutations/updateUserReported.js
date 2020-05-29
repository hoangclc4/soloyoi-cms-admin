import gql from 'graphql-tag';

export const UPDATE_USER_REPORTED = gql`
  mutation adminUpdateUserReport($input: AdminUpdateUserReportCondition!) {
    result: adminUpdateUserReport(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
