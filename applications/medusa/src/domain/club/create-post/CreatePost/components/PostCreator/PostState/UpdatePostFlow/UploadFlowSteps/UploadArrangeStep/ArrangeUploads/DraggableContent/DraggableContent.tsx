import { Flex, Heading, Tooltip } from '@chakra-ui/react'
import { Draggable } from 'react-beautiful-dnd'
import { graphql, useFragment } from 'react-relay/hooks'
import type { DraggableContentFragment$key } from '@//:artifacts/DraggableContentFragment.graphql'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ResourceInfo from '@//:modules/content/DataDisplay/ResourceInfo/ResourceInfo'
import { Icon } from '@//:modules/content/PageLayout'
import { DragReorder, PremiumStar, PremiumStarHollow } from '@//:assets/icons'
import IconButton from '@//:modules/form/IconButton/IconButton'

interface Props {
  onRemove: (string) => void
  onSupport: (id, isSupporterOnly) => void
  index: number
  dragDisabled: boolean
  query: DraggableContentFragment$key
  isSupportingContent: boolean
  h: number
}

const Fragment = graphql`
  fragment DraggableContentFragment on PostContent {
    isSupporterOnly
    ...ResourceInfoFragment
    resource {
      id
    }
  }
`

export default function DraggableContent ({
  onRemove,
  index,
  dragDisabled,
  query,
  onSupport,
  h,
  isSupportingContent
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const isSupporterOnly = data.isSupporterOnly

  return (
    <Draggable isDragDisabled={dragDisabled} draggableId={data.resource.id} key={data.resource.id} index={index}>
      {(provided, snapshot) => (
        <Flex
          h={h}
          bg='gray.800'
          borderRadius='md'
          overflow='hidden'
          boxShadow={snapshot.isDragging as boolean ? 'drag' : isSupporterOnly ? 'premium' : 'none'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex align='center' w='12%' justify='center'>
            <Flex borderRadius='full' bg='gray.600' w={10} h={10} align='center' justify='center'>
              <Heading fontSize='xl'>
                {index + 1}
              </Heading>
            </Flex>
          </Flex>
          <Flex align='center' justify='center' w='38%'>
            <ResourceInfo query={data} />
          </Flex>
          <Flex align='center' justify='center' w='38%'>
            {dragDisabled && (
              <Tooltip
                placement='bottom'
                label={(
                  <Trans>
                    Mark this content as Supporter Only
                  </Trans>)}
              >
                <IconButton
                  aria-label={i18n._(t`Supporter Only`)}
                  borderRadius='xl'
                  size='lg'
                  isLoading={isSupportingContent}
                  variant='ghost'
                  icon={(
                    <Icon
                      p={2}
                      icon={data.isSupporterOnly ? PremiumStar : PremiumStarHollow}
                      fill={data.isSupporterOnly ? 'orange.400' : 'gray.200'}
                      h='100%'
                      w='100%'
                    />)}
                  onClick={() => onSupport(data.resource.id, !data.isSupporterOnly)}
                />
              </Tooltip>
            )}

          </Flex>
          <Flex align='center' bg='gray.700' w='12%' justify='center'>
            {dragDisabled
              ? (
                <CloseButton
                  isDisabled={isSupportingContent}
                  size='md'
                  aria-label={i18n._(t`Remove Upload`)}
                  m={2}
                  onClick={() => onRemove(data.resource.id)}
                />)
              : (
                <Icon
                  icon={DragReorder}
                  fill='gray.400'
                  h={8}
                  w={8}
                />
                )}
          </Flex>
        </Flex>
      )}
    </Draggable>
  )
}
