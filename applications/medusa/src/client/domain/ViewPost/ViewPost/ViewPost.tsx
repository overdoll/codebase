import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewPostQuery } from '@//:artifacts/ViewPostQuery.graphql'
import { graphql } from 'react-relay'
import PostBrand from '../../../components/Posts/PostBrand/PostBrand'
import PostGalleryContent from '../../../components/Posts/PostGalleryContent/PostGalleryContent'
import { Button, Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react'
import PostIndexer from '../../../components/Posts/PostIndexer/PostIndexer'
import { LargeMenuButton, LargeMenuItem, PostPlaceholder } from '@//:modules/content/PageLayout'
import { LoginKeys } from '@//:assets/icons/navigation'
import { t, Trans } from '@lingui/macro'
import { Link } from '@//:modules/routing'
import PostClickableCategories
  from '../../../components/Posts/components/PostClickableCategories/PostClickableCategories'

interface Props {
  query: PreloadedQuery<ViewPostQuery>
}

const Query = graphql`
  query ViewPostQuery($reference: String!) {
    post(reference: $reference) {
      ...PostBrandFragment
      ...PostGalleryContentFragment
      ...PostClickableCategoriesFragment
    }
  }
`

export default function ViewPost (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ViewPostQuery>(
    Query,
    props.query
  )

  const post = queryData?.post

  if (post == null) {
    return (
      <PostPlaceholder>
        <Heading color='gray.00' fontSize='4xl'>
          <Trans>Post Not Found</Trans>
        </Heading>
        <Text mb={8} textAlign='center' color='gray.100' fontSize='md'>
          <Trans>
            This post could not be found
          </Trans>
        </Text>
        <Link to='/'>
          <Button
            colorScheme='primary'
            variant='solid'
            size='lg'
          ><Trans>
            Home
          </Trans>
          </Button>
        </Link>
      </PostPlaceholder>
    )
  }

  return (
    <>
      <Stack spacing={2}>
        <PostBrand query={post} />
        <PostGalleryContent query={post}>
          {({
            slidesCount,
            currentSlide
          }) =>
            <Grid w='100%' templateColumns='repeat(8, 1fr)' gap={2} mt={1}>
              <GridItem colSpan={1}>
                <Flex h='100%' align='center' justify='flex-start'>
                  <Trans>
                    like
                  </Trans>
                </Flex>
              </GridItem>
              <GridItem colSpan={6}>
                <PostIndexer length={slidesCount} currentIndex={currentSlide} />
              </GridItem>
              <GridItem colSpan={1}>
                <Flex h='100%' align='center' justify='flex-end'>
                  <LargeMenuButton>
                    <LargeMenuItem color='purple.400' icon={LoginKeys} text={t`Moderate`} />
                  </LargeMenuButton>
                </Flex>
              </GridItem>
            </Grid>}
        </PostGalleryContent>
        <PostClickableCategories query={post} />
      </Stack>
    </>
  )
}
