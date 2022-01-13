import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewPostQuery } from '@//:artifacts/ViewPostQuery.graphql'
import { graphql } from 'react-relay'
import PostHeaderClub from '../../../../components/Posts/PostHeaderClub/PostHeaderClub'
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

interface Props {
  query: PreloadedQuery<ViewPostQuery>
}

const Query = graphql`
  query ViewPostQuery($reference: String!) {
    post(reference: $reference) {
      ...PostHeaderClubFragment
      ...PostGalleryContentFragment
      ...PostClickableCategoriesFragment
      ...PostClickableCharactersFragment
    }
  }
`

export default function ViewPost (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ViewPostQuery>(
    Query,
    props.query
  )

  const post = queryData?.post

  const history = useHistory()

  if (post == null) {
    history.push('/')
  }

  return (
    <>
      <Flex bg='gray.800' align='center' justify='center' w='100%' h='100%'>
        <PostGalleryContent query={post}>
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
          sm: 400,
          base: '100%'
        }}
      >
        <Stack spacing={2}>
          <PostHeaderClub query={post} />
          <PostClickableCharacters query={post} />
          <PostClickableCategories query={post} />
          <HStack>
            <Flex h='100%' align='center' justify='flex-start'>
              <IconButton
                bg='transparent'
                size='lg'
                aria-label={t`Like`}
                icon={
                  <Icon
                    icon={CheckCircle}
                    w={8}
                    fill='gray.500'
                    h={8}
                  />
                }
              />
            </Flex>
            <CopyLinkToClipboard>
              {`https://overdoll.com${history.location.pathname}`}
            </CopyLinkToClipboard>
            <LargeMenuButton>
              <LargeMenuItem color='purple.400' icon={LoginKeys} text={t`Moderate`} />
            </LargeMenuButton>
          </HStack>
        </Stack>
      </Box>
    </>
  )
}
