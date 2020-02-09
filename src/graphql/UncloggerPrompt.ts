import gql from 'graphql-tag'

// Get
export const ListUncloggerPrompts = gql`
  query ListUncloggerPrompts(
    $limit: Int
    $offset: Int
    $searchText: String
    $status: UncloggerPromptApprovalStatus
  ) {
    listUncloggerPrompts(
      limit: $limit
      offset: $offset
      searchText: $searchText
      status: $status
    ) {
      id
      category
      body
      language
      creatorUserId
      createTime
      status
      reviewTime
    }
  }
`

export const CountUncloggerPrompts = gql`
  query CountUncloggerPrompts(
    $searchText: String
    $status: UncloggerPromptApprovalStatus
  ) {
    countUncloggerPrompts(searchText: $searchText, status: $status) {
      count
    }
  }
`

// Create
export const CreateUncloggerPrompt = gql`
  mutation CreateUncloggerPrompt(
    $category: UncloggerPromptCategory!
    $body: String!
    $language: Language
    $status: UncloggerPromptApprovalStatus
    $creatorUserId: String
  ) {
    createUncloggerPrompt(
      input: {
        category: $category
        body: $body
        language: $language
        status: $status
        creatorUserId: $creatorUserId
      }
    ) {
      id
    }
  }
`

// Update
export const UpdateUncloggerPromptReview = gql`
  mutation UpdateUncloggerPromptReview(
    $id: ID!
    $reviewerUserId: String
    $status: UncloggerPromptApprovalStatus
    $reviewNote: String
  ) {
    updateUncloggerPromptReview(
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

export const UpdateUncloggerPromptContent = gql`
  mutation UpdateUncloggerPromptContent(
    $id: ID!
    $category: String
    $body: String
    $language: String
  ) {
    updateUncloggerPromptContent(
      input: { id: $id, category: $category, body: $body, language: $language }
    ) {
      id
    }
  }
`
