import { graphql } from '@mysten/sui/graphql/schemas/latest'
import { SUI_GRAPHQL_TESTNET_URL } from '../utils/constants'
import { networkConfig } from '../utils/networkConfig'
import { SuiGraphQLClient } from '@mysten/sui/graphql'

const gqlClient = new SuiGraphQLClient({
	url: SUI_GRAPHQL_TESTNET_URL,
})

console.log(networkConfig)

export const GetOwnerObjectsApi = async (owner: string, startCursor: string | null, endCursor: string | null) => {
  const query = graphql(`
    query($endCursor: String, $startCursor: String) {
      objects(
        first: 50
        after: $endCursor
        before: $startCursor
        filter: {
          owner: "${owner}"
        }
      ) {
        pageInfo {
          hasNextPage
          endCursor
          hasPreviousPage
          startCursor
        }
        nodes {
          address
          asMoveObject {
            contents {
              json
            }
          }
        }
      }
    }
  `)
  const result = await gqlClient.query({
    query,
    variables: { endCursor, startCursor },
  })
  return result.data?.objects
}