import { graphql } from 'react-relay'
import type { GridPaginationPostContentFragment$key } from '@//:artifacts/GridPaginationPostContentFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Flex } from '@chakra-ui/react'
import { ControlPlayButton } from '@//:assets/icons'
import { Icon } from '../../../../../../../PageLayout'
import React from 'react'
import PreviewGridImageMedia from '../../../../../../Media/fragments/PreviewGridImageMedia/PreviewGridImageMedia'

const Fragment = graphql`
  fragment GridPaginationPostContentFragment on PostContent {
    media {
      __typename
      ...on VideoMedia {
        cover {
          ...PreviewGridImageMediaFragment
        }
      }
      ...on ImageMedia {
        ...PreviewGridImageMediaFragment
      }
    }
  }
`

interface Props {
  postContentQuery: GridPaginationPostContentFragment$key
  isSmall: boolean
}

export default function GridPaginationPostContent (props: Props): JSX.Element {
  const {
    postContentQuery,
    isSmall
  } = props

  const data = useFragment(Fragment, postContentQuery)

  if (data.media.__typename === 'VideoMedia') {
    return (
      <Flex w='100%' h='100%' position='relative'>
        <PreviewGridImageMedia isSmall={isSmall} imageMediaQuery={data.media.cover} />
        <Flex align='center' justify='center' position='absolute' top={0} bottom={0} right={0} left={0}>
          <Flex px={3} py={2} bg='dimmers.500' borderRadius='full'>
            <Icon icon={ControlPlayButton} w={3} h={3} fill='gray.00' />
          </Flex>
        </Flex>
      </Flex>
    )
  }

  if (data.media.__typename === 'ImageMedia') {
    return (
      <PreviewGridImageMedia isSmall={isSmall} imageMediaQuery={data.media} />
    )
  }

  return <></>
}
