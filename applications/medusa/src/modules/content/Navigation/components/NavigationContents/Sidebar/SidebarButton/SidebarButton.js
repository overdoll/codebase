/**
 * @flow
 */
import NavLink from '@//:modules/routing/NavLink'
import Button from '@//:modules/form/Button'

type Props = {
  path: string,
  title: string
}

export default function SidebarButton ({ path, title }: Props): Node {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <Button
          borderRadius={5}
          textAlign='left' w='100%'
          pt={0}
          pb={0}
          pl={3}
          pr={0}
          h={{ base: 9, md: 10 }}
          variant={isActive ? 'panel' : 'ghost'}
          display='inline'
          lineHeight='inherit'
          color={isActive ? 'gray.100' : 'gray.400'}
        >
          {title}
        </Button>
      )}
    </NavLink>
  )
}
