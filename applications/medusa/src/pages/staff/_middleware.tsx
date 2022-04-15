/* istanbul ignore file */
import { NextResponse } from 'next/server'
import { Middleware } from '@//:types/app'
import getAbilityFromRequest from '@//:modules/next/getAbilityFromRequest'

const middleware: Middleware = async (request, event) => {
  const ability = await getAbilityFromRequest(request)

  if (ability.can('staff', 'Tag') || ability.can('staff', 'Account') || ability.can('staff', 'Club') || ability.can('staff', 'Post') || ability.can('staff', 'Billing')) return NextResponse.next()

  return NextResponse.redirect('/join')
}

export default middleware
