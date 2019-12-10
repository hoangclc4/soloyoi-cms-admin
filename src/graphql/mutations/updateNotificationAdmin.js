import gql from 'graphql-tag';

export const UPDATE_NOTIFICATION_ADMIN = gql`
  mutation updateNotificationAdmin($input: UpdateNotificationAdminCondition!) {
    result: updateNotificationAdmin(condition: $input) {
      requestResolved
      message
      errorCode
    }
  }
`;
