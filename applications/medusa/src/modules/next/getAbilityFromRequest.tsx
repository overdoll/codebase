import { NextRequest } from 'next/server'
import RootQuery from '@//:artifacts/RootQuery.graphql'
import { AppAbility } from '../authorization/types'
import defineAbility from '../authorization/defineAbility'
import { serverMiddlewareFetch } from './relayGQLFetch'
import { createEnvironment } from '../relay/environment'
import { GraphQLResponseWithData } from 'relay-runtime/lib/network/RelayNetworkTypes'

const getAbilityFromRequest = async (request: NextRequest): Promise<AppAbility> => {
  const environment = createEnvironment(serverMiddlewareFetch(request), null)
  const data = await environment
    .getNetwork()
    .execute(RootQuery.params, {}, {})
    .toPromise() as GraphQLResponseWithData

  // catch any network errors
  if (Array.isArray(data?.errors)) {
    throw new Error(JSON.stringify(data?.errors))
  }

  const viewer = data?.data?.viewer

  return defineAbility(
    (
      viewer != null
        ? {
            isModerator: viewer.isModerator,
            isStaff: viewer.isStaff,
            isLocked: viewer.lock != null
          }
        : null
    ))
}

export default getAbilityFromRequest
