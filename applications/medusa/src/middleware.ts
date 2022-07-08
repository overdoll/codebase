import { Middleware } from '@//:types/app'
import getAbilityFromRequest from '@//:modules/next/getAbilityFromRequest'
import getRedirectUrl from '@//:modules/next/getRedirectUrl'
import { NextResponse } from 'next/server'

export const middleware: Middleware = async (request, event) => {
  const ability = await getAbilityFromRequest(request)

  if (request.nextUrl.pathname.startsWith('/verify-token')) {
    if (ability.can('configure', 'Account')) return NextResponse.redirect(getRedirectUrl(request, '/'))
  }

  if (request.nextUrl.pathname.startsWith('/staff')) {
    if (ability.can('staff', 'Entity') || ability.can('staff', 'Account') || ability.can('staff', 'Club') || ability.can('staff', 'Post') || ability.can('staff', 'Billing')) return NextResponse.next()

    return NextResponse.redirect(getRedirectUrl(request, '/join'))
  }

  if (request.nextUrl.pathname.startsWith('/settings/payouts')) {
    if (ability.can('configure', 'Club')) return NextResponse.next()

    return NextResponse.redirect(getRedirectUrl(request, '/settings/profile'))
  }

  if (request.nextUrl.pathname.startsWith('/settings')) {
    if (ability.can('configure', 'Account')) return NextResponse.next()

    return NextResponse.redirect(getRedirectUrl(request, '/join'))
  }

  if (request.nextUrl.pathname.startsWith('/moderation')) {
    if (ability.can('moderate', 'Post')) return NextResponse.next()

    return NextResponse.redirect(getRedirectUrl(request, '/join'))
  }

  if (request.nextUrl.pathname.startsWith('/logout')) {
    if (ability.can('configure', 'Account')) return NextResponse.next()

    return NextResponse.redirect(getRedirectUrl(request, '/join'))
  }

  if (request.nextUrl.pathname.startsWith('/join')) {
    if (ability.can('configure', 'Account')) return NextResponse.redirect(getRedirectUrl(request, '/'))
  }

  if (request.nextUrl.pathname.startsWith('/confirm-email')) {
    if (ability.can('configure', 'Account')) return NextResponse.next()

    return NextResponse.redirect(getRedirectUrl(request, '/join'))
  }

  if (request.nextUrl.pathname.startsWith('/clubs/feed')) {
    if (ability.can('configure', 'Account')) return NextResponse.next()

    return NextResponse.redirect(getRedirectUrl(request, '/join'))
  }

  if (request.nextUrl.pathname.startsWith('/clubs/invite-only')) {
    if (ability.can('create', 'Club')) return NextResponse.redirect(getRedirectUrl(request, '/'))
  }

  if (request.nextUrl.pathname.startsWith('/clubs/create-club')) {
    if (ability.can('create', 'Club')) return NextResponse.next()

    return NextResponse.redirect(getRedirectUrl(request, '/join'))
  }

  if (request.nextUrl.pathname.startsWith('/club')) {
    if (ability.can('configure', 'Club')) return NextResponse.next()

    return NextResponse.redirect(getRedirectUrl(request, '/join'))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/club/:path*',
    '/clubs/:path*',
    '/confirm-email',
    '/join',
    '/logout',
    '/moderation/:path*',
    '/settings/:path*',
    '/staff/:path*',
    '/verify-token'
  ]
}
