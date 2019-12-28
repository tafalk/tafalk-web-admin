import gql from 'graphql-tag'

// Get
export const GetUserIdByUserName = gql`
  query GetUserIdByUserName($username: String!) {
    getUserByUsername(username: $username) {
      id
    }
  }
`
