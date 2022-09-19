import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PreviewHeaderFragment$key } from '@//:artifacts/PreviewHeaderFragment.graphql'
import { Heading, HStack, Stack, StackProps } from '@chakra-ui/react'
import ClubIcon from '../../../../../PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import { SeeRight } from '@//:assets/icons'
import { Icon } from '../../../../../PageLayout'

interface Props extends StackProps {
  postQuery: PreviewHeaderFragment$key
}

const PostFragment = graphql`
  fragment PreviewHeaderFragment on Post {
    club {
      name
      ...ClubIconFragment
    }
    description
  }
`
export default function PreviewHeader (props: Props): JSX.Element {
  const {
    postQuery,
    ...rest
  } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <Stack spacing={1} {...rest}>
      <HStack justify='space-between' align='center' spacing={2}>
        <HStack spacing={2}>
          <ClubIcon clubQuery={postData.club} size='md' />
          <Heading fontSize='xl' color='gray.00'>
            {postData.club.name}
          </Heading>
        </HStack>
        <Icon fill='whiteAlpha.200' icon={SeeRight} w={5} h={5} />
      </HStack>
      {postData.description.length > 0 && (
        <Heading fontSize='sm' color='gray.200'>
          {postData.description}
        </Heading>
      )}
    </Stack>
  )
}
