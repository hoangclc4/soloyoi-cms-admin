import gql from 'graphql-tag';

export const ADMIN_STAFF_LIST = gql`
  query adminStaffRestaurantList($input: AdminStaffRestaurantListCondition!) {
    result: adminStaffRestaurantList(condition: $input) {
      response {
        staffId
        staffName
        staffPhoto
        staffBirthday
        staffBirthplace
        staffTitle
        staffStyle
        staffProfile
        staffCanTalk
        staffPhotoId
      }
      error {
        errorCode
        message
        requestResolved
      }
    }
  }
`;
