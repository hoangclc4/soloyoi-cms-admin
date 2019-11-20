import gql from 'graphql-tag'

export const ADMIN_LOGIN = gql`
  mutation loginAdmin($input: LoginAdminCondition!) {
    result: loginAdmin(condition: $input) {
      response {
        token
        token_type
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`
