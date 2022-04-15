import { NextResponse } from 'next/server'
import { Middleware } from '@//:types/app'
import getAbilityFromRequest from '@//:modules/next/getAbilityFromRequest'
import getRedirectUrl from '@//:modules/next/getRedirectUrl'

const middleware: Middleware = async (request, event) => {
  const ability = await getAbilityFromRequest(request)
  const url = getRedirectUrl(request, '/')

  if (ability.can('configure', 'Account')) return NextResponse.redirect(url)

  return NextResponse.next()
}

export default middleware
