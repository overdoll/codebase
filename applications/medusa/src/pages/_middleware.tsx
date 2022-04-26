import { NextResponse } from 'next/server'
import { Middleware } from '@//:types/app'
import { randomBytes } from 'crypto'
import gcm from '@//:modules/utilities/gcm'

const middleware: Middleware = async (request, event) => {
  const secret = request.cookies['od.security']

  // generate & set cookie
  if (secret == null) {
    const rnd = randomBytes(64).toString('hex')

    const encrypted = gcm.encrypt(rnd, process.env.SECURITY_SECRET)

    const response = NextResponse.next()

    response.cookie('od.security', encrypted, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/'
    })

    return response
  }

  return NextResponse.next()
}

export default middleware
