import { graphql, useFragment } from 'react-relay/hooks'
import { RootClubPostsPreviewFragment$key } from '@//:artifacts/RootClubPostsPreviewFragment.graphql'
import { RootClubPostsPreviewViewerFragment$key } from '@//:artifacts/RootClubPostsPreviewViewerFragment.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { encodeQueryParams } from 'serialize-query-params'
import { stringify } from 'query-string'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import ClubPostsPreview from './ClubPostsPreview/ClubPostsPreview'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { configMap } from '@//:common/components/PageHeader/SearchButton/constants'
import { Icon } from '@//:modules/content/PageLayout'
import { SearchSmall } from '@//:assets/icons'
import { useCookies } from 'react-cookie'

interface SearchProps {
  slug: string
  sort: string
  supporter?: string[]
  seed?: string | null
}

interface Props {
  clubQuery: RootClubPostsPreviewFragment$key
}

const ClubFragment = graphql`
  fragment RootClubPostsPreviewFragment on Club {
    slug
    viewerMember {
      isSupporter
    }
    viewerIsOwner
    supporterPosts: posts(first: 1, supporterOnlyStatus: [FULL, PARTIAL]) {
      edges {
        node {
          __typename
        }
      }
    }
    ...ClubPostsPreviewFragment
  }
`

export default function RootClubPostsPreview ({
  clubQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const { query: { slug } } = useRouter()

  const [cookies] = useCookies<string>(['postSeed'])

  const isSupporter = clubData?.viewerMember?.isSupporter === true && !clubData.viewerIsOwner

  const staticParams = {
    slug: slug as string,
    seed: cookies.postSeed ?? null
  }
  const sortByTopParams = { sort: 'ALGORITHM' }
  // const sortByNewParams = { sort: 'NEW' }
  const supporterParams = { supporter: ['FULL', 'PARTIAL'] }

  const initialParams = {
    ...staticParams,
    ...sortByTopParams,
    ...(isSupporter ? supporterParams : sortByTopParams)
  }

  const [params] = useState<SearchProps>(initialParams)

  const BUTTON_PROPS = {
    size: {
      base: 'sm',
      md: 'md'
    }
  }

  // const {
  //   setArguments,
  //   loadQuery
  // } = useSearch<SearchProps>({
  //   defaultValue: { ...params }
  // })

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const {
    slug: excludeSlug,
    seed: excludeSeed,
    ...linkParams
  } = params

  const link = `/${clubData.slug}/posts?${stringify(encodeQueryParams(configMap, { ...linkParams }))}`

  // const hasSupporterPosts = clubData.supporterPosts.edges.length > 0
  //
  // const setExclusiveParams = (): void => {
  //   setParams(val => ({
  //     ...staticParams,
  //     ...supporterParams,
  //     sort: val?.sort ?? 'ALGORITHM'
  //   }))
  // }
  //
  // const setAllParams = (): void => {
  //   setParams(val => ({
  //     ...staticParams,
  //     sort: val?.sort ?? 'ALGORITHM'
  //   }))
  // }
  //
  // const setTopParams = (): void => {
  //   setParams(val => ({
  //     ...staticParams,
  //     ...sortByTopParams,
  //     ...(val?.supporter != null && { supporter: val.supporter })
  //   }))
  // }
  //
  // const setNewParams = (): void => {
  //   setParams(val => ({
  //     ...staticParams,
  //     ...sortByNewParams,
  //     ...(val?.supporter != null && { supporter: val.supporter })
  //   }))
  // }
  //
  // useUpdateEffect(() => {
  //   setArguments({ ...params })
  // }, [params])

  return (
    <Stack spacing={3}>
      <HStack
        overflowX={{
          base: 'scroll',
          md: 'visible'
        }}
        py={1}
        justify='flex-end'
        spacing={1}
      >
        <LinkButton
          {...BUTTON_PROPS}
          href={link}
          leftIcon={<Icon icon={SearchSmall} fill='gray.100' w={4} h={4} />}
        >
          <Trans>
            All Posts
          </Trans>
        </LinkButton>
      </HStack>
      <ClubPostsPreview clubQuery={clubData} />
    </Stack>
  )
}
