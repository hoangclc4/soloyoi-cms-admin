import gql from 'graphql-tag';

export const STATUS_BANNER = gql`
  query getStatusBanner {
    result: getStatusBanner {
      response {
        settingMasterId
        name
        status
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
