import { Flex, Heading, Stack, Tooltip } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { DraggableContentFragment$key } from '@//:artifacts/DraggableContentFragment.graphql'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ResourceInfo from '@//:modules/content/DataDisplay/ResourceInfo/ResourceInfo'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowButtonDown, ArrowButtonUp, PremiumStar, PremiumStarHollow } from '@//:assets/icons'
import IconButton from '@//:modules/form/IconButton/IconButton'

type OnDragEndFunction = (result) => void

interface Props {
  onRemove: (string) => void
  onSupport: (id, isSupporterOnly) => void
  index: number
  dragDisabled: boolean
  query: DraggableContentFragment$key
  isSupportingContent: boolean
  h: number
  onDragEnd: OnDragEndFunction
  total: number
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
  isSupportingContent,
  onDragEnd,
  total
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const ArrangeButtons = (): JSX.Element => {
    const ARRANGE_BUTTON = {
      borderRadius: 'xl',
      size: 'sm',
      variant: 'ghost'
    }

    const onUp = (): void => {
      onDragEnd({
        source: {
          index: index
        },
        destination: {
          index: index - 1
        }
      })
    }

    const onDown = (): void => {
      onDragEnd({
        source: {
          index: index
        },
        destination: {
          index: index + 1
        }
      })
    }

    return (
      <Stack spacing={2} justify='space-between' align='center'>
        {index !== 0 && (
          <IconButton
            aria-label={i18n._(t`Up`)}
            icon={(
              <Icon
                p={2}
                icon={ArrowButtonUp}
                fill='gray.100'
                h='100%'
                w='100%'
              />)}
            onClick={onUp}
            {...ARRANGE_BUTTON}
          />
        )}
        {index + 1 < total && (
          <IconButton
            aria-label={i18n._(t`Down`)}
            icon={(
              <Icon
                p={2}
                icon={ArrowButtonDown}
                fill='gray.100'
                h='100%'
                w='100%'
              />)}
            onClick={onDown}
            {...ARRANGE_BUTTON}
          />
        )}
      </Stack>
    )
  }

  return (
    <Flex
      h={h}
      bg='gray.800'
      borderRadius='md'
      overflow='hidden'
    >
      <Flex align='center' w='12%' justify='center'>
        <Flex borderRadius='full' bg='gray.600' w={10} h={10} align='center' justify='center'>
          <Heading fontSize='xl'>
            {index + 1}
          </Heading>
        </Flex>
      </Flex>
      <Flex p={2} align='center' justify='center' w='38%'>
        <Flex overflow='hidden' w='100%' h='100%' borderRadius='md'>
          <ResourceInfo containCover query={data} />
        </Flex>
      </Flex>
      <Flex align='center' justify='center' w='38%'>
        {dragDisabled && (
          <Tooltip
            placement='bottom'
            label={data.isSupporterOnly
              ? (
                <Trans>
                  Un-mark this content as Supporter Only
                </Trans>
                )
              : (
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
                  fill={data.isSupporterOnly ? 'orange.300' : 'gray.200'}
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
            <ArrangeButtons />
            )}
      </Flex>
    </Flex>
  )
}
