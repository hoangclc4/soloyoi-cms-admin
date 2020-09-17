import gql from 'graphql-tag';

export const ADMIN_UPDATE_BANNER = gql`
  mutation adminUpdateBanner($input: AdminUpdateBannerCondition) {
    result: adminUpdateBanner(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
