import gql from 'graphql-tag'

// Get
export const ListEnumValues = gql`
  query ListEnumValues($enumName: String!) {
    enum: __type(name: $enumName) {
      enumValues {
        name
      }
    }
  }
`
