import { graphql, useFragment } from 'react-relay'
import type { GridPaginationPostFragment$key } from '@//:artifacts/GridPaginationPostFragment.graphql'
import { Flex, Grid, GridItem, GridProps, Heading } from '@chakra-ui/react'
import GridPaginationPostContent from './GridPaginationPostContent/GridPaginationPostContent'
import PostLinkTile from '../../../../../../PageLayout/Display/fragments/Link/PostLinkTile/PostLinkTile'
import React from 'react'

interface Props {
  query: GridPaginationPostFragment$key
}

const Fragment = graphql`
  fragment GridPaginationPostFragment on Post {
    content {
      id
      ...GridPaginationPostContentFragment
    }
    ...PostLinkTileFragment
  }
`

export default function GridPaginationPost (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  const displayContent = data.content.slice(0, 4)

  const extraContent = data.content.length - displayContent.length

  const singleGridProps = {
    templateRows: '1fr',
    templateColumns: '1fr'
  }

  const dualGridProps = {
    templateRows: '1fr',
    templateColumns: '1fr 1fr'
  }

  const tripleGridProps = {
    templateRows: '1fr 1fr',
    templateColumns: '1fr 1fr'
  }

  const restGridProps = {
    templateRows: '1fr 1fr',
    templateColumns: '1fr 1fr'
  }

  const getGridProps = (): GridProps => {
    if (displayContent.length > 3) {
      return restGridProps
    } else if (displayContent.length === 3) {
      return tripleGridProps
    } else if (displayContent.length === 2) {
      return dualGridProps
    }
    return singleGridProps
  }

  return (
    <Flex
      bg='gray.800'
      position='relative'
      overflow='hidden'
      borderRadius='md'
      w='100%'
      h='100%'
      justify='center'
      align='center'
    >
      <PostLinkTile
        query={data}
      >
        <Grid
          height='100%'
          width='100%'
          position='relative'
          {...getGridProps()}
          gap={0}
        >
          {displayContent.map((item, index) => (
            <GridItem
              colSpan={displayContent.length === 3 && index === 2 ? 2 : undefined}
              w='100%'
              h='100%'
              overflow='hidden'
              position='relative'
              key={item.id}
            >
              <GridPaginationPostContent isSmall={displayContent.length > 2} postContentQuery={item} />
            </GridItem>))}
        </Grid>
        {extraContent > 0 && (
          <Flex
            bg='dimmers.500'
            px={2}
            py={1}
            borderRadius='full'
            align='center'
            justify='center'
            position='absolute'
            bottom={1}
            right={1}
          >
            <Heading color='gray.00' fontSize='sm'>
              +{extraContent}
            </Heading>
          </Flex>
        )}
      </PostLinkTile>
    </Flex>
  )
}
