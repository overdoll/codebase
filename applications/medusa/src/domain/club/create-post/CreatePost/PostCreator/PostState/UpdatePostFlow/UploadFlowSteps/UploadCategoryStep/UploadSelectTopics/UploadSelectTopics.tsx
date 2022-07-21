import { Suspense } from 'react'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { TopicIdentifier } from '@//:assets/icons'
import SearchHeader
  from '../../../../../../../../../../common/components/PageHeader/SearchButton/components/SearchBody/SearchHeader/SearchHeader'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { UploadSearchCategoriesMultiSelectorProps } from '../UploadCategoryStep'
import UploadSearchTopicsSelector from './UploadSearchTopicsSelector/UploadSearchTopicsSelector'
import SkeletonUploadAudienceGrid
  from '@//:modules/content/Placeholder/Loading/SkeletonUploadAudienceGrid/SkeletonUploadAudienceGrid'

interface Props extends ComponentChoiceArguments<UploadSearchCategoriesMultiSelectorProps> {
}

export default function UploadSelectTopics ({
  register
}: Props): JSX.Element {
  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  return (
    <Stack spacing={2}>
      <SearchHeader icon={TopicIdentifier}>
        <Trans>
          Topics
        </Trans>
      </SearchHeader>
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<SkeletonUploadAudienceGrid />}>
          <UploadSearchTopicsSelector
            searchArguments={searchArguments}
            register={register}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
