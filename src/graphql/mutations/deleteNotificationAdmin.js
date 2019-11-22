import gql from 'graphql-tag'

export const DELETE_NOTIFICATION_ADMIN = gql`
  mutation deleteNotificationAdmin($input: DeleteNotificationAdminCondition!) {
    result: deleteNotificationAdmin(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`
