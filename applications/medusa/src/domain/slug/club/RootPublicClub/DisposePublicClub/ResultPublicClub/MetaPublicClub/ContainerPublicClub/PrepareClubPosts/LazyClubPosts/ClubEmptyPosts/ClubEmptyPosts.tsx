import { graphql, useFragment } from 'react-relay/hooks'
import { ClubEmptyPostsFragment$key } from '@//:artifacts/ClubEmptyPostsFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { ContentBrushPen } from '@//:assets/icons'

interface Props {
  clubQuery: ClubEmptyPostsFragment$key
}

const ClubFragment = graphql`
  fragment ClubEmptyPostsFragment on Club {
    slug
    viewerIsOwner
  }
`

export default function ClubEmptyPosts ({
  clubQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  if (clubData.viewerIsOwner) {
    return (
      <LargeBackgroundBox>
        <Stack align='center'>
          <Heading textAlign='center' color='gray.200' fontSize='lg'>
            <Trans>
              You haven't posted any content yet. Start posting by clicking the button below!
            </Trans>
          </Heading>
          <LinkButton
            href={{
              pathname: '/club/[slug]/create-post',
              query: { slug: clubData.slug }
            }}
            leftIcon={(
              <Icon
                icon={ContentBrushPen}
                fill='teal.900'
                h={4}
                w={4}
              />)}
            size='lg'
            colorScheme='teal'
          >
            <Trans>
              Create Post
            </Trans>
          </LinkButton>
        </Stack>
      </LargeBackgroundBox>
    )
  }

  return (
    <LargeBackgroundBox>
      <Heading textAlign='center' color='gray.200' fontSize='lg'>
        <Trans>
          This club hasn't posted any content yet
        </Trans>
      </Heading>
    </LargeBackgroundBox>
  )
}
