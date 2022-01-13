import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewPostQuery } from '@//:artifacts/ViewPostQuery.graphql'
import { graphql } from 'react-relay'
import PostGalleryContent from '../../../../components/Posts/PostGalleryContent/PostGalleryContent'
import { Box, Flex, Grid, HStack, Stack } from '@chakra-ui/react'
import PostIndexer from '../../../../components/Posts/PostGalleryContent/PostIndexer/PostIndexer'
import { LargeMenuButton, LargeMenuItem } from '@//:modules/content/PageLayout'
import { LoginKeys } from '@//:assets/icons/navigation'
import { t } from '@lingui/macro'
import { useHistory } from '@//:modules/routing'
import PostClickableCategories
  from '../../../../components/Posts/components/PostData/PostClickableCategories/PostClickableCategories'
import PostClickableCharacters
  from '../../../../components/Posts/components/PostData/PostClickableCharacters/PostClickableCharacters'
import { CheckCircle } from '@//:assets/icons/interface'
import { Icon } from '@//:modules/content'
import IconButton from '@//:modules/form/IconButton/IconButton'
import CopyLinkToClipboard from '../../../../components/ContentHints/CopyLinkToClipboard/CopyLinkToClipboard'
import LargeClubHeader from '../../../ManageClub/components/LargeClubHeader/LargeClubHeader'
import JoinClubButton from '../../../ManageClub/components/JoinClubButton/JoinClubButton'

interface Props {
  query: PreloadedQuery<ViewPostQuery>
}

const Query = graphql`
  query ViewPostQuery($reference: String!) {
    post(reference: $reference) {
      ...PostGalleryContentFragment
      ...PostClickableCategoriesFragment
      ...PostClickableCharactersFragment
      club {
        ...LargeClubHeaderFragment
        ...JoinClubButtonClubFragment
      }
    }
    viewer {
      ...JoinClubButtonViewerFragment
    }
  }
`

export default function ViewPost (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ViewPostQuery>(
    Query,
    props.query
  )

  const history = useHistory()

  if (queryData?.post == null) {
    history.push('/')
  }

  return (
    <>
      <Flex
        bg='gray.800'
        align='center'
        justify='center'
        w='100%'
        h={{
          md: 'calc(100vh - 54px)',
          base: '100%'
        }}
      >
        <PostGalleryContent query={queryData.post}>
          {({
            slidesCount,
            currentSlide
          }) =>
            <Grid w='100%' gap={2} mt={1}>
              <PostIndexer length={slidesCount} currentIndex={currentSlide} />
            </Grid>}
        </PostGalleryContent>
      </Flex>
      <Box
        m={3}
        w={{
          md: 600,
          base: 'auto'
        }}
      >
        <Stack spacing={4}>
          <Flex align='center' justify='space-between'>
            <LargeClubHeader query={queryData?.post?.club ?? null} />
            <JoinClubButton clubQuery={queryData?.post?.club ?? null} viewerQuery={queryData?.viewer} />
          </Flex>
          <HStack spacing={2} justify='center' align='center' w='100%'>
            <Flex h='100%' align='center' justify='flex-start'>
              <IconButton
                bg='transparent'
                size='lg'
                aria-label={t`Like`}
                icon={
                  <Icon
                    icon={CheckCircle}
                    fill='gray.200'
                    h={8}
                    w={8}
                  />
                }
              />
            </Flex>
            <CopyLinkToClipboard w='100%'>
              {`https://overdoll.com${history.location.pathname}`}
            </CopyLinkToClipboard>
            <LargeMenuButton>
              <LargeMenuItem color='purple.400' icon={LoginKeys} text={t`Moderate`} />
            </LargeMenuButton>
          </HStack>
          <PostClickableCharacters query={queryData?.post} />
          <PostClickableCategories query={queryData?.post} />
        </Stack>
      </Box>
    </>
  )
}
