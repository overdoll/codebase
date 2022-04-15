/* istanbul ignore file */
import { NextResponse } from 'next/server'
import { Middleware } from '@//:types/app'
import getAbilityFromRequest from '@//:modules/next/getAbilityFromRequest'
import getRedirectUrl from '@//:modules/next/getRedirectUrl'

const middleware: Middleware = async (request, event) => {
  const ability = await getAbilityFromRequest(request)

  if (ability.can('staff', 'Account')) return NextResponse.next()

  const url = getRedirectUrl(request, '/join')

  return NextResponse.redirect(url)
}

export default middleware
