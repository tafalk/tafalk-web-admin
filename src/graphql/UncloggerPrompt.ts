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
      }
      nextToken
    }
  }
`
