import { graphql, useFragment } from 'react-relay/hooks'
import type { ContainerPublicPostFragment$key } from '@//:artifacts/ContainerPublicPostFragment.graphql'
import type { ContainerPublicPostViewerFragment$key } from '@//:artifacts/ContainerPublicPostViewerFragment.graphql'
import React from 'react'
import { ContentContainer, Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Flex, Heading } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { PremiumStar } from '@//:assets/icons'
import Button from '@//:modules/form/Button/Button'
import HighlightInline from '@//:modules/content/ContentHints/HighlightInline/HighlightInline'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import { Link } from '@//:modules/routing'

interface Props {
  clubQuery: ContainerPublicPostFragment$key
  viewerQuery: ContainerPublicPostViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ContainerSupportClubFragment on Club {
    reference
    name
    ...ClubIconFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerSupportClubViewerFragment on Account {
    reference
  }
`

// Handle the layout of the page here and choose which components get a layout container
// so the user has a consistent experience
export default function ContainerSupportClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ContentContainer pt={2}>
      <LargeBackgroundBox color='gray.00' fontSize='lg' mb={4} p={2}>
        <Flex justifyContent='center'>
          <Flex margin='auto' flexDirection='column'>
            <ClubIcon
              size='xl'
              clubQuery={clubData}
            />
            <Heading mt={7}>
              <Trans>
                Support <HighlightInline colorScheme='pink'>{clubData.name}</HighlightInline>
              </Trans>
            </Heading>
            <Flex mt={7}>
              <Button

                margin='auto'
                onClick={() => {
                }}
                colorScheme='orange'
                size='md'
                leftIcon={<Icon icon={PremiumStar} w={5} h={5} fill='orange.900' />}
              >
                <Trans>
                  Get Premium
                </Trans>
              </Button>
            </Flex>

          </Flex>
        </Flex>

      </LargeBackgroundBox>
    </ContentContainer>
  )
}
