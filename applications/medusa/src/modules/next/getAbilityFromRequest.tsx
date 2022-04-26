import { NextRequest } from 'next/server'
import fetchQuery from '../relay/fetchQuery'
import RootQuery from '@//:artifacts/RootQuery.graphql'
import { AppAbility } from '../authorization/types'
import defineAbility from '../authorization/defineAbility'
import { serverFetch } from './fetch'

const getAbilityFromRequest = async (request: NextRequest): Promise<AppAbility> => {
  const data = await fetchQuery(serverFetch(request, null))(RootQuery.params, {})

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
