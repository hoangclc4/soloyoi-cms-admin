import gql from 'graphql-tag';

export const BANNER_INFORMATION = gql`
  query bannerInformation {
    result: bannerInformation {
      response {
        photoId
        photoName
        photoFullWidthUrl
        photoTypes
        url
        category
        active
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
