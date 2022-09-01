import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { RandomQuery as RandomQueryType } from '@//:artifacts/RandomQuery.graphql'
import RandomQuery from '@//:artifacts/RandomQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageProps } from '@//:types/app'
import { PageWrapper } from '@//:modules/content/PageLayout'
import BrowseStructuredData from '@//:common/structured-data/browse/BrowseStructuredData/BrowseStructuredData'
import Random from './Random/Random'
import RandomRichObject from '@//:common/rich-objects/random/RandomRichObject/RandomRichObject'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import Icon from '../../../modules/content/PageLayout/Flair/Icon/Icon'
import { RandomizeDice } from '@//:assets/icons'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  queryRefs: {
    randomQuery: PreloadedQuery<RandomQueryType>
  }
}

const RootRandom: PageProps<Props> = (props: Props): JSX.Element => {
  const [queryRef, loadQuery] = useQueryLoader(
    RandomQuery,
    props.queryRefs.randomQuery)

  const [postSeed, setPostSeed] = useQueryParam<string | null | undefined>('seed')

  const seed = `${Date.now()}`

  const onRandomize = (): void => {
    setPostSeed(seed)
  }

  useUpdateEffect(() => {
    if (seed == null) return
    loadQuery({
      seed: postSeed
    })
  }, [postSeed])

  return (
    <>
      <RandomRichObject />
      <BrowseStructuredData />
      <PageWrapper>
        <Button
          leftIcon={<Icon w={5} h={5} icon={RandomizeDice} fill='orange.900' />}
          onClick={onRandomize}
          variant='solid'
          mb={8}
          size='lg'
          colorScheme='orange'
          w='100%'
        >
          <Trans>
            Randomize!
          </Trans>
        </Button>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          seed: postSeed
        })}
        >
          <Suspense fallback={<SkeletonPost />}>
            <Random query={queryRef as PreloadedQuery<RandomQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootRandom
