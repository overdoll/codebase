import { graphql, useFragment } from 'react-relay/hooks'
import type { PostUpdateDescriptionFragment$key } from '@//:artifacts/PostUpdateDescriptionFragment.graphql'
import PostDescriptionModal from '../UploadPostOptions/PostAddDescription/PostDescriptionModal/PostDescriptionModal'
import { Flex, HStack, useDisclosure } from '@chakra-ui/react'
import { ContentBookEdit } from '@//:assets/icons'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import PostDescriptionHeading from './PostDescriptionHeading/PostDescriptionHeading'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

interface Props {
  query: PostUpdateDescriptionFragment$key
}

const Fragment = graphql`
  fragment PostUpdateDescriptionFragment on Post {
    description
    club {
      id
      ...ClubIconFragment
    }
    ...PostDescriptionModalFragment
    ...PostDescriptionHeadingFragment
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
  } = useDisclosure()

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
          <Flex align='center' w='88%' py={2} px={3}>
            <HStack justify='center'>
              <ClubIcon size='lg' clubQuery={data.club} />
              <PostDescriptionHeading postQuery={data} />
            </HStack>
          </Flex>
          <Flex w='12%' justify='center' align='center' h='100%' bg='gray.700'>
            <IconButton
              my={2}
              onClick={onOpen}
              size='sm'
              variant='solid'
              borderRadius='xl'
              colorScheme='gray'
              icon={<Icon w={5} h={5} icon={ContentBookEdit} fill='gray.200' />}
              aria-label={i18n._(t`Edit Description`)}
            />
          </Flex>
        </Flex>
      </Flex>
      <PostDescriptionModal query={data} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
