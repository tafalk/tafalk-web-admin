import gql from 'graphql-tag'

// Get
export const ListFlags = gql`
  query ListFlags(
    $limit: Int
    $offset: Int
    $searchText: String
    $status: FlagApprovalStatus
  ) {
    listFlags(
      limit: $limit
      offset: $offset
      searchText: $searchText
      status: $status
    ) {
      id
      contentType
      contentId
      category
      type
      detail
      flaggerUserId
      createTime
      status
      reviewTime
    }
  }
`

export const CountFlags = gql`
  query CountFlags($searchText: String, $status: FlagApprovalStatus) {
    countFlags(searchText: $searchText, status: $status) {
      count
    }
  }
`

// Update
export const UpdateFlagReview = gql`
  mutation UpdateFlagReview(
    $id: ID!
    $reviewerUserId: String
    $status: FlagApprovalStatus
    $reviewNote: String
  ) {
    updateFlagReview(
      input: {
        id: $id
        reviewerUserId: $reviewerUserId
        status: $status
        reviewNote: $reviewNote
      }
    ) {
      id
    }
  }
`

export const UpdateFlagContent = gql`
  mutation UpdateFlagContent(
    $id: ID!
    $category: String
    $type: String
    $detail: String
  ) {
    updateFlagContent(
      input: { id: $id, category: $category, type: $type, detail: $detail }
    ) {
      id
    }
  }
`
