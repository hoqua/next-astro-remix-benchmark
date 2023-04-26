import { GraphQLClient } from 'graphql-request'
import { getSdk } from './data-access.gql.gen'

export const getGraphqlClient = (url: string, headers?:any) => {
  const client = new GraphQLClient(url, {
    headers
  })

  return getSdk(client)
}
