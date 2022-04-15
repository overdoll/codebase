/* istanbul ignore file */
import { NextResponse } from 'next/server'
import { Middleware } from '@//:types/app'

const middleware: Middleware = async (request, event) => {
  return NextResponse.next()
}

export default middleware
