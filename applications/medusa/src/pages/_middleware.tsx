/* istanbul ignore file */
import { NextResponse } from 'next/server'
import { Middleware } from '@//:types/app'
import getAbilityFromRequest from '@//:modules/next/getAbilityFromRequest'

const middleware: Middleware = async (request, event) => {
  const ability = await getAbilityFromRequest(request)

  return NextResponse.next()
}

export default middleware
