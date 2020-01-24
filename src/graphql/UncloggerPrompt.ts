import gql from 'graphql-tag'

// Get
export const ListUncloggerPrompts = gql`
  query ListUncloggerPrompts($limit: Int, $offset: Int, $searchText: String) {
    listUncloggerPrompts(
      limit: $limit
      offset: $offset
      searchText: $searchText
    ) {
      id
      category
      body
      creatorUserId
      createTime
      status
      reviewTime
    }
  }
`

export const CountUncloggerPrompts = gql`
  query CountUncloggerPrompts($searchText: String) {
    countUncloggerPrompts(searchText: $searchText) {
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
    $status: ApprovalStatus
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

export const UpdateUncloggerPrompt = gql`
  mutation UpdateUncloggerPrompt(
    $id: ID!
    $category: String
    $body: String
    $language: String
    $status: String
    $reviewerUserId: String
  ) {
    createUncloggerPrompt(
      input: {
        id: $id
        category: $category
        body: $body
        language: $language
        status: $status
        reviewerUserId: $reviewerUserId
      }
    ) {
      id
    }
  }
`
