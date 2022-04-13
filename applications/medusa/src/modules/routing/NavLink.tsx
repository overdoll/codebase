import Link from './Link'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '../support/runIfFunction'
import { useRouter } from 'next/router'
import { LinkProps } from 'next/link'
import { resolveHref } from 'next/dist/shared/lib/router/router'

interface ChildrenCallable {
  isActive: boolean
  isActiveBasePath: boolean
}

interface Props extends LinkProps {
  children: MaybeRenderProp<ChildrenCallable>
}

/**
 * Modified version of the Link component but to tell us when the href is active
 */

const NavLink = ({
  children,
  href,
  ...rest
}: Props): JSX.Element => {
  const router = useRouter()

  const {
    asPath
  } = router

  const [, resolved] = resolveHref(router, href, true)

  const isActiveBasePath = asPath.startsWith(resolved)

  const isActive = asPath === resolved

  return (
    <Link
      href={href}
      {...rest}
    >
      {runIfFunction(children, {
        isActive,
        isActiveBasePath
      })}
    </Link>
  )
}

export default NavLink
