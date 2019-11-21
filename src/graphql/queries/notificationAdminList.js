import gql from 'graphql-tag'

export const NOTIFICATION_ADMIN_LIST = gql`
  query notificationAdminList($pager: PagerCondition!) {
    result: notificationAdminList(pagerCondition: $pager) {
      response {
        notificationAdmins {
          adminNotifyId
          notifyMessage
          notifyLink
          createdAt
        }
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`
