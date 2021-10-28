/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { AudienceFragment$key } from '@//:artifacts/AudienceFragment.graphql'
import type { AudienceTagFragment$key } from '@//:artifacts/AudienceTagFragment.graphql'

import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Stack, Box, Heading, Text, Wrap, WrapItem, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import {
  Selector,
  SelectorTextOverlay,
  RowItem,
  RowWrap,
  useSingleSelector
} from '../../../../../../../../../../components/ContentSelection'
import {
  PageSectionWrap,
  PageSectionTitle,
  PageSectionDescription
} from '../../../../../../../../../../components/PageLayout'
import ResourceItem from '../../../../../../../../../../components/DataDisplay/ResourceItem/ResourceItem'
import { EVENTS } from '../../../../../constants/constants'
import RequiredPrompt from '../../../../RequiredPrompt/RequiredPrompt'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: {
    post: AudienceFragment$key,
    tag: AudienceTagFragment$key
  }
}

const AudienceFragmentGQL = graphql`
  fragment AudienceFragment on Post {
    audience {
      id
      title
    }
  }
`

const AudienceTagFragmentGQL = graphql`
  fragment AudienceTagFragment on Query {
    audiences {
      edges {
        node {
          id
          title
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

export default function Audience ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(AudienceFragmentGQL, query.post)

  const tagData = useFragment(AudienceTagFragmentGQL, query.tag)

  const [t] = useTranslation('manage')

  const audiences = tagData.audiences.edges

  const [currentSelection, setCurrentSelection] = useSingleSelector({ initialSelection: data.audience?.id })

  useEffect(() => {
    dispatch({
      type: EVENTS.AUDIENCE,
      value: currentSelection
    })
  }, [currentSelection])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          {t('posts.flow.steps.audience.selector.title')}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('posts.flow.steps.audience.selector.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <RowWrap>
        {audiences.map((item, index) => (
          <RowItem key={index}>
            <Selector
              onSelect={setCurrentSelection} selected={[currentSelection]} id={item.node.id}
            >
              <SelectorTextOverlay label={item.node.title}>
                <ResourceItem type={item.node.thumbnail.type} urls={item.node.thumbnail.urls} />
              </SelectorTextOverlay>
            </Selector>
          </RowItem>
        )
        )}
      </RowWrap>
      <Flex justify='center'>
        <RequiredPrompt>{t('posts.flow.steps.audience.selector.required_prompt')}</RequiredPrompt>
      </Flex>
    </>
  )
}
