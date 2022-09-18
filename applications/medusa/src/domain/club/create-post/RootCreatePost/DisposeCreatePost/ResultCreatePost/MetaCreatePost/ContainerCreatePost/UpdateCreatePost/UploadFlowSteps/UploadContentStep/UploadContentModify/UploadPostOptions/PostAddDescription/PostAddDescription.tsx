import { graphql, useFragment } from 'react-relay/hooks'
import type { PostAddDescriptionFragment$key } from '@//:artifacts/PostAddDescriptionFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { AddDescription } from '@//:assets/icons'
import PostDescriptionModal from './PostDescriptionModal/PostDescriptionModal'
import { useDisclosure } from '@chakra-ui/react'

interface Props {
  query: PostAddDescriptionFragment$key
}

const Fragment = graphql`
  fragment PostAddDescriptionFragment on Post {
    description
    ...PostDescriptionModalFragment
  }
`

export default function PostAddDescription ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onClose,
    onOpen
  } = useDisclosure()

  if (data.description.length > 0) {
    return <></>
  }

  return (
    <>
      <Button
        borderRadius='md'
        colorScheme='gray'
        variant='solid'
        onClick={onOpen}
        leftIcon={<Icon w={4} h={4} icon={AddDescription} fill='gray.100' />}
      >
        <Trans>
          Add Shout
        </Trans>
      </Button>
      <PostDescriptionModal query={data} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
