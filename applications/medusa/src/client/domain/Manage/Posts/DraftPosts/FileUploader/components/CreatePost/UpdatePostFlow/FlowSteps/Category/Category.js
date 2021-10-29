/**
 * @flow
 */
import type { Node } from 'react'
import {
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '../../../../../../../../../../components/PageLayout'
import { useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { CategoryFragment$key } from '@//:artifacts/CategoryFragment.graphql'
import type { CategoryTagFragment$key } from '@//:artifacts/CategoryTagFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { Input, Flex } from '@chakra-ui/react'
import {
  GridItem,
  GridWrap,
  useMultiSelector,
  Selector,
  SelectorTextOverlay, useSingleSelector
} from '../../../../../../../../../../components/ContentSelection'
import ResourceItem from '../../../../../../../../../../components/DataDisplay/ResourceItem/ResourceItem'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: {
    post: CategoryFragment$key,
    tag: CategoryTagFragment$key
  }
}

const CategoryFragmentGQL = graphql`
  fragment CategoryFragment on Post {
    categories {
      id
      title
    }
  }
`

const CategoryTagFragmentGQL = graphql`
  fragment CategoryTagFragment on Query {
    categories {
      edges {
        node {
          id
          title
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

export default function Category ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(CategoryFragmentGQL, query.post)
  const tagData = useFragment(CategoryTagFragmentGQL, query.tag)

  const currentCategories = data.categories.map((item) => item.id)

  const categories = tagData.categories.edges

  const [currentSelection, setCurrentSelection] = useMultiSelector({ initialSelection: currentCategories })

  const [t] = useTranslation('manage')

  return (
    <>
      <PageSectionWrap>
        <PageSectionDescription>
          {t('posts.flow.steps.category.selector.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <Input variant='filled' size='lg' />
      <Flex>
        tags
      </Flex>
      <GridWrap>
        {categories.map((item, index) => (
          <GridItem key={index}>
            <Selector
              onSelect={setCurrentSelection} selected={currentSelection} id={item.node.id}
            >
              <SelectorTextOverlay label={item.node.title}>
                <ResourceItem type={item.node.thumbnail.type} urls={item.node.thumbnail.urls} />
              </SelectorTextOverlay>
            </Selector>
          </GridItem>
        )
        )}
      </GridWrap>
    </>
  )
}
