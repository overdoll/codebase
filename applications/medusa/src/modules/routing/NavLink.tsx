import Link, { ChildrenCallableLink } from './Link'
import { MaybeRenderProp } from '../../types/components'
import runIfFunction from '../support/runIfFunction'
import { useRouter } from 'next/router'

interface ChildrenCallable extends ChildrenCallableLink {
  isActive: boolean
  isActiveBasePath: boolean
}

interface Props {
  children: MaybeRenderProp<ChildrenCallable>
  to: string
}

// implementation taken from https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js
// modified to work with our version of link (preloading, etc...)
// as well as changing the link to use an isActive children prop since we use css-in-js and not classnames
const NavLink = ({
  children,
  to,
  ...rest
}: Props): JSX.Element => {
  const { pathname } = useRouter()

  const isActiveBasePath = pathname.includes(to)

  const isActive = pathname === to

  return (
    <Link
      {...rest}
      to={to}
    >
      {({ isPending }) => (
        runIfFunction(children, {
          isActive,
          isActiveBasePath,
          isPending
        })
      )}
    </Link>
  )
}

export default NavLink
