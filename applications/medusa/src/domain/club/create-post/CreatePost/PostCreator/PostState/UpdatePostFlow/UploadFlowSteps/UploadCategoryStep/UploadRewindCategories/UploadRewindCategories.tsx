import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { TimeRewind } from '@//:assets/icons'
import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { useHistoryDisclosure } from '@//:modules/hooks'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import UploadRewindSingleSelector from './UploadRewindSingleSelector/UploadRewindSingleSelector'
import { Suspense } from 'react'
import { QueryErrorBoundary, SkeletonRectangleGrid } from '@//:modules/content/Placeholder'
import { useRouter } from 'next/router'
import { useChoice } from '@//:modules/content/HookedComponents/Choice'
import Button from '@//:modules/form/Button/Button'
import RemovableTag from '@//:modules/content/DataDisplay/RemovableTag/RemovableTag'
import { Choices, UseChoiceReturnOnChange } from '@//:modules/content/HookedComponents/Choice/types'
import { UploadSearchCategoriesMultiSelectorProps } from '../UploadCategoryStep'
import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadRewindCategoriesFragment$key } from '@//:artifacts/UploadRewindCategoriesFragment.graphql'

interface Props {
  onChange: UseChoiceReturnOnChange<UploadSearchCategoriesMultiSelectorProps>
  currentValues: Choices<UploadSearchCategoriesMultiSelectorProps>
  query: UploadRewindCategoriesFragment$key
}

interface SearchProps {
  slug: string
}

interface ChoiceProps {
  categories: Array<{ id: string, title: string }>
}

const Fragment = graphql`
  fragment UploadRewindCategoriesFragment on Post {
    ...UploadRewindSingleSelectorPostFragment
  }
`

export default function UploadRewindCategories ({
  onChange,
  currentValues,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const { query: { slug } } = useRouter()

  const {
    searchArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      slug: slug as string
    }
  })

  const {
    values,
    register
  } = useChoice<ChoiceProps>({
    max: 1
  })

  const categories = Object.values(values)?.[0]?.categories ?? []

  const onAddCategories = (): void => {
    categories.forEach((item) => {
      if (Object.keys(currentValues).includes(item.id)) return
      onChange(item.id, { title: item.title })
    })
    onClose()
  }

  return (
    <>
      <Tooltip
        label={
          <Trans>
            Add categories from previous posts
          </Trans>
        }
      >
        <IconButton
          onClick={onOpen}
          aria-label={i18n._(t`Rewind Categories`)}
          size='lg'
          icon={<Icon w={6} h={6} icon={TimeRewind} fill='gray.200' />}
        />
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Add Categories From Post
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <QueryErrorBoundary
              loadQuery={loadQuery}
            >
              <Suspense fallback={<SkeletonRectangleGrid />}>
                <UploadRewindSingleSelector query={data} register={register} searchArguments={searchArguments} />
              </Suspense>
            </QueryErrorBoundary>
          </ModalBody>
          <ModalFooter>
            <Stack spacing={2} w='100%'>
              {categories.length > 0 && (
                <Wrap mb={2} spacing={1} overflow='show'>
                  {categories.map((item) => (
                    <WrapItem key={item.id}>
                      <RemovableTag
                        generateColor
                        id={item.id}
                        title={item.title}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              )}
              {(Object.keys(values).length > 0 && categories.length < 1) && (
                <Heading fontSize='md' color='gray.200'>
                  <Trans>
                    The selected post has no categories
                  </Trans>
                </Heading>
              )}
              <Flex w='100%' justify='flex-end'>
                <Button
                  onClick={onAddCategories}
                  isDisabled={Object.keys(values).length < 1 || categories.length < 1}
                  size='lg'
                  colorScheme='teal'
                >
                  <Trans>
                    Add Categories
                  </Trans>
                </Button>
              </Flex>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
