import gql from 'graphql-tag';

export const CHILD_POSTAL_CODE = gql`
  query getChildPostalCode($input: GetChildPostalCodeCondition!) {
    result: getChildPostalCode(condition: $input) {
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
