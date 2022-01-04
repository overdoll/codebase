import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewPostQuery } from '@//:artifacts/ViewPostQuery.graphql'
import { graphql } from 'react-relay'
import PostHeaderClub from '../../../components/Posts/PostHeaderClub/PostHeaderClub'
import PostGalleryContent from '../../../components/Posts/PostGalleryContent/PostGalleryContent'
import { Button, Flex, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react'
import PostIndexer from '../../../components/Posts/PostGalleryContent/PostIndexer/PostIndexer'
import { LargeMenuButton, LargeMenuItem, PostPlaceholder } from '@//:modules/content/PageLayout'
import { LoginKeys } from '@//:assets/icons/navigation'
import { t, Trans } from '@lingui/macro'
import { Link } from '@//:modules/routing'
import PostClickableCategories
  from '../../../components/Posts/components/PostData/PostClickableCategories/PostClickableCategories'
import PostClickableCharacters
  from '../../../components/Posts/components/PostData/PostClickableCharacters/PostClickableCharacters'
import { CheckCircle } from '@//:assets/icons/interface'
import { Icon } from '@//:modules/content'
import IconButton from '@//:modules/form/IconButton/IconButton'

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
        <PostHeaderClub query={post} />
        <PostGalleryContent query={post}>
          {({
            slidesCount,
            currentSlide
          }) =>
            <Grid w='100%' templateColumns='repeat(8, 1fr)' gap={2} mt={1}>
              <GridItem colSpan={1}>
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
              </GridItem>
              <GridItem colSpan={6}>
                <Flex justify='center' h='100%' align='center'>
                  <PostIndexer length={slidesCount} currentIndex={currentSlide} />
                </Flex>
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
        <PostClickableCharacters query={post} />
        <PostClickableCategories query={post} />
      </Stack>
    </>
  )
}
