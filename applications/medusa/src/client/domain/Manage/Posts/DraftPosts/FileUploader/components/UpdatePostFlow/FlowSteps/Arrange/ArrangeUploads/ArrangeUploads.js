/**
 * @flow
 */
import type { Node } from 'react'
import { useState, useEffect } from 'react'
import type { Dispatch, State } from '@//:types/upload'
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Progress,
  Heading,
  Text,
  CloseButton, Spacer
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import Button from '@//:modules/form/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ArrangeUploadsFragment$key } from '@//:artifacts/ArrangeUploadsFragment.graphql'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../../../constants/constants'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: ArrangeUploadsFragment$key
}

const ArrangeUploadsFragmentGQL = graphql`
  fragment ArrangeUploadsFragment on Post {
    content {
      urls {
        url
      }
    }
  }
`

const reorder = (
  list: Array<string>,
  startIndex: number,
  endIndex: number
): Array<string> => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default function ArrangeUploads ({ state, uppy, dispatch, query }: Props): Node {
  const data = useFragment(ArrangeUploadsFragmentGQL, query)

  const initialData = data.content.map((item) => item.urls[0].url)

  const displayData = initialData || state.content

  useEffect(() => {
    dispatch({ type: EVENTS.CONTENT, value: initialData })
  }, [data.content])

  const onRemoveFile = url => {
    dispatch({
      type: EVENTS.CONTENT,
      value: url,
      remove: true
    })
  }

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const content = reorder(
      state.content,
      result.source.index,
      result.destination.index
    )

    dispatch({ type: EVENTS.CONTENT, value: content })
  }

  return (
    <Flex>{displayData.map((item, index) => (
      <Flex key={index}>{index}</Flex>
    )
    )}
    </Flex>
  )
}
