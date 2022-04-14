import gcm from '../utilities/gcm'
import { randomBytes } from 'crypto'
import { NextRequest } from 'next/server'
import fetchQuery from '../relay/fetchQuery'
import RootQuery from '@//:artifacts/RootQuery.graphql'
import { AppAbility } from '../authorization/types'
import defineAbility from '../authorization/defineAbility'

const customFetch = (req) => {
  return async (data) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cookie: []
    }

    req.headers.forEach((value, key) => {
      headers[key] = value
    })

    const existingSecurity = req.cookies['od.security']

    let token = ''

    if (existingSecurity != null) {
      token = gcm.decrypt(existingSecurity, process.env.SECURITY_SECRET)
    } else {
      token = randomBytes(64).toString('hex')
      const encrypted = gcm.encrypt(token, process.env.SECURITY_SECRET)
      headers.cookie[0] = headers.cookie[0] + 'od.security=' + encrypted
    }

    headers['X-overdoll-Security'] = token

    const response = await fetch(
      process.env.SERVER_GRAPHQL_ENDPOINT as string,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      }
    )

    return await response.json()
  }
}

const getAbilityFromRequest = async (request: NextRequest): Promise<AppAbility> => {
  const data = await fetchQuery(customFetch(request))(RootQuery.params, {})

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
