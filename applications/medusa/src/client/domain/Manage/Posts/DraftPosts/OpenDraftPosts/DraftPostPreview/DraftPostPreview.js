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
  Box
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
    return limitedContent.map((item, index) =>
      <ResourceItem key={index} type={item.type} urls={item.urls} />
    )
  }

  return (
    <Flex h='100%' direction='column'>
      <Flex h='80%'>
        <ClickableBox
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          onClick={selectPost}
          p={0}
          overflow='hidden'
          position='relative'
        >
          <SimpleGrid spacing={1}>
            <DisplayContentGrid />
          </SimpleGrid>
        </ClickableBox>
        <Progress colorScheme={score >= 100 ? 'green' : 'primary'} size='xs' borderRadius='none' value={score} />
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
