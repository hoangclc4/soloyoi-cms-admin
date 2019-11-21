import gql from 'graphql-tag'

export const CREATE_NOTIFICATION_ADMIN = gql`
  mutation createNotificationAdmin($input: CreateNotificationAdminCondition!) {
    result: createNotificationAdmin(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`
