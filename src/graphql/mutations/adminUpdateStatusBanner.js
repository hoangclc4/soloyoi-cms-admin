import gql from 'graphql-tag';

export const ADMIN_UPDATE_STATUS_BANNER = gql`
  mutation updateStatusBanner($input: UpdateStatusBannerCondition) {
    result: updateStatusBanner(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
