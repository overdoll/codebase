import { NextRequest } from 'next/server'
import { NextURL } from 'next/dist/server/web/next-url'

const getRedirectUrl = (request: NextRequest, url: string): NextURL => {
  const mutated = request.nextUrl.clone()
  mutated.pathname = '/'

  return mutated
}

export default getRedirectUrl
