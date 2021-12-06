/**
 * @flow
 */
import type { Node } from 'react'
import {
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { BrandFragment$key } from '@//:artifacts/BrandFragment.graphql'
import type { BrandTagFragment$key } from '@//:artifacts/BrandTagFragment.graphql'
import { useTranslation } from 'react-i18next'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import {
  RowItem,
  RowWrap,
  Selector,
  SelectorTextOverlay, useSingleSelector
} from '../../../../../../../../../components/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { Flex, Text, Box, Heading } from '@chakra-ui/react'
import RequiredPrompt from '../../../../RequiredPrompt/RequiredPrompt'
import { useEffect } from 'react'
import { EVENTS } from '../../../../../constants/constants'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: BrandFragment$key,
}

const BrandFragmentGQL = graphql`
  fragment BrandFragment on Query {
    post (reference: $reference) {
      brand {
        id
        name
      }
    }
    brands {
      edges {
        node {
          id
          name
          slug
          thumbnail {
            type
            urls {
              mimeType
              url
            }
          }
        }
      }
    }
  }
`

export default function Brand ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(BrandFragmentGQL, query)

  const [t] = useTranslation('manage')

  const brands = data.brands.edges

  // If there is only one brand and one wasn't already selected
  // Pre-select the first brand on the list for convenience
  const determineDefaultBrand = () => {
    if (!data.post.brand?.id) {
      if (brands.length === 1) {
        return brands[0].node.id
      }
      return null
    }
    return data.post.brand.id
  }

  const [currentSelection, setCurrentSelection] = useSingleSelector({ initialSelection: determineDefaultBrand() })

  useEffect(() => {
    dispatch({
      type: EVENTS.BRAND,
      value: currentSelection
    })
  }, [currentSelection])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          {t('posts.flow.steps.brand.selector.title')}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('posts.flow.steps.brand.selector.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <RowWrap>
        {brands.map((item, index) => (
          <RowItem h={82} key={index}>
            <Selector
              onSelect={setCurrentSelection} selected={[currentSelection]} id={item.node.id}
            >
              <Flex
                mx={2}
                my={1}
                align='center'
              >
                <Flex align='center' justify='center' mr={2} borderRadius='md' overflow='hidden' w={12} h={12}>
                  <ResourceItem type={item.node.thumbnail.type} urls={item.node.thumbnail.urls} />
                </Flex>
                <Box>
                  <Heading fontSize='xl' color='gray.00'>
                    {item.node.name}
                  </Heading>
                  <Text
                    color='gray.200' textAlign='left'
                    fontSize='sm'
                  >
                    /{item.node.slug}
                  </Text>
                </Box>
              </Flex>
            </Selector>
          </RowItem>
        )
        )}
      </RowWrap>
      <Flex justify='center'>
        <RequiredPrompt>{t('posts.flow.steps.brand.required_prompt')}</RequiredPrompt>
      </Flex>
    </>
  )
}
