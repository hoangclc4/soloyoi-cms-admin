import gql from 'graphql-tag';

export const ALL_PROVINCE = gql`
  query getAllProvince {
    result: getAllProvince {
      response {
        postalCodeMasterId
        name
        parentId
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
