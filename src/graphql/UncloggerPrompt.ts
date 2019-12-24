import gql from 'graphql-tag'

// Get
export const ListUncloggerPrompts = gql`
  query ListUncloggerPrompts($limit: Int, $nextToken: String) {
    listUncloggerPrompts(first: $limit, after: $nextToken) {
      items {
        id
        category
        body
        creatorUserId
        createTime
        approveTime
      }
      nextToken
    }
  }
`

// Create
export const CreateUncloggerPrompt = gql`
  mutation CreateUncloggerPrompt(
    $category: String!
    $body: String!
    $language: String
    $state: String
    $creatorUserId: String
    $createTime: String
  ) {
    createUncloggerPrompt(
      input: {
        category: $category
        body: $body
        language: $language
        state: $state
        creatorUserId: $creatorUserId
        createTime: $createTime
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
    $state: String
    $approverUserId: String
    $approveTime: String
  ) {
    createUncloggerPrompt(
      input: {
        id: $id
        category: $category
        body: $body
        language: $language
        state: $state
        approverUserId: $approverUserId
        approveTime: $approveTime
      }
    ) {
      id
    }
  }
`
