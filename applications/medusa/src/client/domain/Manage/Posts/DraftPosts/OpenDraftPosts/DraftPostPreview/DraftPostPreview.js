/**
 * @flow
 */
import type { Node } from 'react'
import {
  InputLeftElement,
  Input,
  InputRightElement,
  IconButton, InputGroup,
  CloseButton, Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Progress,
  Box,
  Text,
  Heading,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import SearchCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/search/search-circle.svg'
import InterfaceDelete1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-1.svg'
import { useState } from 'react'
import { ClickableBox, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { graphql } from 'react-relay/hooks'
import type { DraftPostPreviewFragment$key } from '@//:artifacts/DraftPostPreviewFragment.graphql'
import { useFragment } from 'react-relay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { StringParam, useQueryParam } from 'use-query-params'
import useCheckRequirements
  from '../../FileUploader/components/CreatePost/UpdatePostFlow/FlowHeader/useCheckRequirements'
import progressScore from '../../FileUploader/components/CreatePost/UpdatePostFlow/FlowHeader/progressScore'

type Props = {
  query: DraftPostPreviewFragment$key,
};

const DraftPostPreviewGQL = graphql`
  fragment DraftPostPreviewFragment on Post {
    id
    reference
    ...useCheckRequirementsFragment
    content {
      type
      urls {
        url
        mimeType
      }
    }
  }
`

export default function DraftPostPreview ({ query }: Props): Node {
  const data = useFragment(DraftPostPreviewGQL, query)

  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const limitedContent = data.content.slice(0, 3)

  const [content, audience, brand, categories, characters] = useCheckRequirements({ query: data })

  const score = progressScore([content, audience, brand, categories, characters])

  const selectPost = () => {
    setPostReference(data.reference)
  }

  const DisplayContentGrid = () => {
    return (
      <SimpleGrid h='100%' spacing={0} columns={limitedContent.length > 1 ? 2 : 1}>
        {limitedContent.map((item, index) =>
          <ResourceItem h='100%' key={index} type={item.type} urls={item.urls} />
        )}
        {data.content.length > 4 && (<Flex align='center' justify='center'>
          <Heading color='gray.200' fontSize='lg'>
            +{data.content.length - limitedContent.length}
          </Heading>
        </Flex>)}
      </SimpleGrid>
    )
  }

  return (
    <Flex h='100%' direction='column'>
      <Flex direction='column' h='80%'>
        <ClickableBox
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          onClick={selectPost}
          p={0}
          overflow='hidden'
          position='relative'
          h='100%'
        >
          <Flex h='100%' position='relative' direction='column' justify='space-between'>
            <DisplayContentGrid />
            <Flex bg='dimmers.400' h='100%' w='100%' justify='center' align='center' position='absolute'>
              <CircularProgress
                color={score >= 100 ? 'green.500' : 'primary.500'}
                size={28}
                trackColor='transparent'
                thickness={6}
                value={score}
              >
                <CircularProgressLabel color='gray.00' fontSize='xl'>
                  {score}%
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </Flex>
        </ClickableBox>
      </Flex>
      <Flex h='20%'>
        <SmallBackgroundBox
          borderTopLeftRadius={0}
          borderTopRightRadius={0}
          w='100%'
        >
          <Flex />
        </SmallBackgroundBox>
      </Flex>
    </Flex>
  )
}
