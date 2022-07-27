import { graphql, useFragment } from 'react-relay/hooks'
import type { PostUpdateDescriptionFragment$key } from '@//:artifacts/PostUpdateDescriptionFragment.graphql'
import { useHistoryDisclosure } from '@//:modules/hooks'
import PostDescriptionModal from '../UploadPostOptions/PostAddDescription/PostDescriptionModal/PostDescriptionModal'
import { Flex, Text } from '@chakra-ui/react'
import { ContentBookEdit } from '@//:assets/icons'
import Icon from '../../../../../../../../../../../modules/content/PageLayout/Flair/Icon/Icon'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

interface Props {
  query: PostUpdateDescriptionFragment$key
}

const Fragment = graphql`
  fragment PostUpdateDescriptionFragment on Post {
    description
    ...PostDescriptionModalFragment
  }
`

export default function PostUpdateDescription ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onClose,
    onOpen
  } = useHistoryDisclosure()

  const { i18n } = useLingui()

  if (data.description.length === 0) {
    return <></>
  }

  return (
    <>
      <Flex
        borderColor='transparent'
        borderWidth={2}
        overflow='hidden'
        borderRadius='md'
        bg='gray.800'

      >
        <Flex w='100%'>
          <Flex w='88%' py={2} px={3}>
            <Text color='gray.200' fontSize='sm'>
              {data.description}
            </Text>
          </Flex>
          <Flex w='12%' justify='center' align='center' h='100%' bg='gray.700'>
            <IconButton
              onClick={onOpen}
              size='md'
              borderRadius='md'
              variant='solid'
              colorScheme='gray'
              icon={<Icon w={4} h={4} icon={ContentBookEdit} fill='gray.200' />}
              aria-label={i18n._(t`Set Supporter Only`)}
            />
          </Flex>
        </Flex>
      </Flex>
      <PostDescriptionModal query={data} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
