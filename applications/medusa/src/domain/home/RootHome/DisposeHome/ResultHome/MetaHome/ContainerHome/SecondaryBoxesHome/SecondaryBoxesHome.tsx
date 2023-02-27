import { SecondaryBoxesHomeFragment$key } from '@//:artifacts/SecondaryBoxesHomeFragment.graphql'
import {
  BadgeCircle, HeartFull,
  LikedPremium,
  PlusCircle
} from '@//:assets/icons'
import { Center, Grid, GridItem } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import BoxHomeLink from '../BoxHomeLink/BoxHomeLink'

interface Props {
  viewerQuery: SecondaryBoxesHomeFragment$key | null
}

const ViewerFragment = graphql`
  fragment SecondaryBoxesHomeFragment on Account {
    hasClubSupporterSubscription
  }
`

export default function SecondaryBoxesHome (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <Grid
        rowGap={20}
        columnGap={20}
        templateColumns={{
          base: 'repeat(1, minmax(150px, 1fr))',
          md: 'repeat(2, minmax(150px, 1fr))'
        }}
      >
        <GridItem>
          <Center w='100%' h='100%'>
            {viewerData == null
              ? (
                <BoxHomeLink
                  icon={PlusCircle}
                  smaller
                  href='/join'
                  colorScheme='orange'
                  header={<Trans>JOIN</Trans>}
                  footer={(
                    <Trans>
                      Join overdoll to unlock the full experience with a personalized content feed
                    </Trans>)}
                  variants={(
                    <>
                      <source
                        media='(min-width: 760px)'
                        srcSet='https://static.dollycdn.net/supporters/banners/1/large.jpg'
                      />
                      <source
                        media='(min-width: 330px)'
                        srcSet='https://static.dollycdn.net/supporters/banners/1/medium.jpg'
                      />
                    </>
                  )}
                  url='https://static.dollycdn.net/supporters/banners/1/small.jpg'
                />)
              : viewerData.hasClubSupporterSubscription
                ? (
                  <BoxHomeLink
                    icon={HeartFull}
                    smaller
                    href='/likes'
                    colorScheme='orange'
                    header={<Trans>LIKES</Trans>}
                    footer={(
                      <Trans>
                        See all of your liked posts - a benefit of being a club supporter
                      </Trans>)}
                    variants={(
                      <>
                        <source
                          media='(min-width: 760px)'
                          srcSet='https://static.dollycdn.net/supporters/banners/3/large.jpg'
                        />
                        <source
                          media='(min-width: 330px)'
                          srcSet='https://static.dollycdn.net/supporters/banners/3/medium.jpg'
                        />
                      </>
                    )}
                    url='https://static.dollycdn.net/supporters/banners/3/small.jpg'
                  />
                  )
                : (
                  <BoxHomeLink
                    icon={LikedPremium}
                    smaller
                    href='/supporter'
                    colorScheme='orange'
                    header={<Trans>SUPPORT</Trans>}
                    footer={(
                      <Trans>
                        Become a club supporter and unlock access to exclusive content and platform
                        features
                      </Trans>)}
                    variants={(
                      <>
                        <source
                          media='(min-width: 760px)'
                          srcSet='https://static.dollycdn.net/supporters/banners/2/large.jpg'
                        />
                        <source
                          media='(min-width: 330px)'
                          srcSet='https://static.dollycdn.net/supporters/banners/2/medium.jpg'
                        />
                      </>
                    )}
                    url='https://static.dollycdn.net/supporters/banners/2/small.jpg'
                  />
                  )}
          </Center>
        </GridItem>
        <GridItem>
          <Center w='100%' h='100%'>
            <BoxHomeLink
              icon={BadgeCircle}
              smaller
              href='/feedback'
              colorScheme='teal'
              header={<Trans>FEEDBACK</Trans>}
              footer={<Trans>Tell us what you really think about overdoll so we can make it better</Trans>}
              variants={(
                <>
                  <source
                    media='(min-width: 760px)'
                    srcSet='https://static.dollycdn.net/supporters/banners/3/large.jpg'
                  />
                  <source
                    media='(min-width: 330px)'
                    srcSet='https://static.dollycdn.net/supporters/banners/3/medium.jpg'
                  />
                </>
              )}
              url='https://static.dollycdn.net/supporters/banners/3/small.jpg'
            />
          </Center>
        </GridItem>
      </Grid>
    </>

  )
}
