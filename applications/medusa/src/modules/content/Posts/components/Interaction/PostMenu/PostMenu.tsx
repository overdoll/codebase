import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { NavigationMenuHorizontal } from '@//:assets/icons/navigation'
import { graphql } from 'react-relay'
import { PostMenuFragment$key } from '@//:artifacts/PostMenuFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Icon } from '../../../../PageLayout'

interface Props {
  query: PostMenuFragment$key | null
  size?: string
}

const Fragment = graphql`
  fragment PostMenuFragment on Post {
    id
  }
`

export default function PostMenu ({
  query,
  size = 'md'
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const getIconSize = (): number => {
    switch (size) {
      case 'sm':
        return 6
      default:
        return 8
    }
  }

  const getButtonSize = (): string => {
    switch (size) {
      case 'sm':
        return '32px'
      default:
        return '40px'
    }
  }

  const iconSize = getIconSize()
  const buttonSize = getButtonSize()

  return (
    <Menu autoSelect={false}>
      <MenuButton
        bg='transparent'
        borderRadius='xl'
        h={buttonSize}
        w={buttonSize}
        aria-label={t`Open Menu`}
        as={IconButton}
        icon={
          <Icon
            p={1}
            icon={NavigationMenuHorizontal}
            w={iconSize}
            fill='gray.200'
            h={iconSize}
          />
        }
      />
      <MenuList minW='300px' boxShadow='outline'>
        <></>
      </MenuList>
    </Menu>
  )
}
