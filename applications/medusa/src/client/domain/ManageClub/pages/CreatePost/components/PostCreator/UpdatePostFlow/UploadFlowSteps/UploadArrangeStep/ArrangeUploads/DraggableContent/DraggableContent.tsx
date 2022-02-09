import { Flex, Heading } from '@chakra-ui/react'
import { Draggable } from 'react-beautiful-dnd'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import type { DraggableContentFragment$key } from '@//:artifacts/DraggableContentFragment.graphql'
import CloseButton from '@//:modules/form/CloseButton/CloseButton'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

interface Props {
  onRemove: (string) => void
  index: number
  dragDisabled: boolean
  query: DraggableContentFragment$key
  removeDisabled: boolean
  h: number
}

const Fragment = graphql`
  fragment DraggableContentFragment on Resource {
    id
    type
    urls {
      url
      mimeType
    }
    ...ResourceItemFragment
  }
`

export default function DraggableContent ({
  onRemove,
  index,
  dragDisabled,
  query,
  removeDisabled,
  h
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  return (
    <Draggable isDragDisabled={dragDisabled} draggableId={data.id} key={data.id} index={index}>
      {(provided, snapshot) => (
        <Flex
          h={h}
          bg='gray.800'
          borderRadius='md'
          overflow='hidden'
          boxShadow={snapshot.isDragging as boolean ? 'drag' : 'none'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex align='center' w='12%' justify='center'>
            <Heading fontSize='lg'>
              {index + 1}
            </Heading>
          </Flex>
          <Flex align='center' justify='center' w='38%'>
            <ResourceItem query={data} />
          </Flex>
          <Flex w='38%' />
          <Flex align='center' bg='gray.700' w='12%' justify='flex-end'>
            {!removeDisabled &&
              <CloseButton
                size='md'
                aria-label={i18n._(t`Remove Upload`)}
                m={2}
                isDisabled={dragDisabled}
                onClick={() => onRemove(data.id)}
              />}
          </Flex>
        </Flex>
      )}
    </Draggable>
  )
}
