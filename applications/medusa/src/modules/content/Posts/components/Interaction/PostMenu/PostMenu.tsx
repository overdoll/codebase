import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { Icon } from '../../../../index'
import { NavigationMenuHorizontal } from '@//:assets/icons/navigation'
import { graphql } from 'react-relay'
import { PostMenuFragment$key } from '@//:artifacts/PostMenuFragment.graphql'
import { useFragment } from 'react-relay/hooks'

interface Props {
  query: PostMenuFragment$key | null
}

const Fragment = graphql`
  fragment PostMenuFragment on Post {
    id
  }
`

export default function PostMenu ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Menu autoSelect={false}>
      <MenuButton
        bg='transparent'
        borderRadius='xl'
        h='40px'
        w='40px'
        aria-label={t`Open Menu`}
        p={1}
        as={IconButton}
        icon={
          <Icon
            p={1}
            icon={NavigationMenuHorizontal}
            w={8}
            fill='gray.200'
            h={8}
          />
        }
      />
      <MenuList minW='300px' boxShadow='outline'>
        <></>
      </MenuList>
    </Menu>
  )
}
