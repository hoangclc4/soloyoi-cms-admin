import gql from 'graphql-tag';

export const ADMIN_USER_REPORT_LIST = gql`
  query adminUserReportList(
    $input: AdminUserReportListCondition
    $pager: PagerCondition
  ) {
    result: adminUserReportList(condition: $input, pagerCondition: $pager) {
      response {
        adminUserReportList {
          userReportId
          reporter {
            userId
            facebookFullName
            nickName
          }
          newsFeed {
            newsFeedId
            description
          }
          user {
            userId
            facebookFullName
            nickName
          }
          restaurant {
            restaurantId
            name
          }
          reason
          isReported
        }
        pager {
          offset
          limit
          currentPageNum
          totalCount
          hasPrev
          hasNext
          prevPageNum
          nextPageNum
          lastPageNum
        }
      }
      error {
        requestResolved
        message
        errorCode
      }
    }
  }
`;
