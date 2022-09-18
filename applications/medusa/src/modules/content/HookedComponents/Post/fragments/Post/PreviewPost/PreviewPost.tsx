import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PreviewPostFragment$key } from '@//:artifacts/PreviewPostFragment.graphql'
import { Box } from '@chakra-ui/react'
import { PreviewContent } from '../../../../../HookedComponents/Post'
import PreviewHeader from '../PreviewHeader/PreviewHeader'
import { Link } from '../../../../../../routing'
import PreviewFooter from '../PreviewFooter/PreviewFooter'

interface Props {
  postQuery: PreviewPostFragment$key
}

const PostFragment = graphql`
  fragment PreviewPostFragment on Post {
    reference
    club {
      slug
    }
    ...PreviewHeaderFragment
    ...PreviewContentFragment
    ...PreviewFooterFragment
  }
`

export default function PreviewPost (props: Props): JSX.Element {
  const { postQuery } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <Box position='relative'>
      <Link
        passHref
        href={{
          pathname: '/[slug]/post/[reference]',
          query: {
            slug: postData.club.slug,
            reference: postData.reference
          }
        }}
      >
        <Box position='absolute' top={0} bottom={0} left={0} right={0} as='a' />
      </Link>
      <PreviewHeader mb={1} postQuery={postData} />
      <PreviewContent postQuery={postData} />
      <PreviewFooter mt={1} postQuery={postData} />
    </Box>
  )
}
