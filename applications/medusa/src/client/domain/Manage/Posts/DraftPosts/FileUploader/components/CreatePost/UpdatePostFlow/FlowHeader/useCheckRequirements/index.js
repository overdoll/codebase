/**
 * @flow
 */
import type { useCheckRequirementsFragment$key } from '@//:artifacts/useCheckRequirementsFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'

type Props = {
  query: useCheckRequirementsFragment$key
}

const Fragment = graphql`
  fragment useCheckRequirementsFragment on Post {
    content {
      __typename
    }
    audience {
      __typename
    }
    brand {
      __typename
    }
    categories {
      __typename
    }
    characters {
      __typename
    }
  }
`

export default function useCheckRequirements ({ query }: Props) {
  const data = useFragment(Fragment, query)

  const contentRequirements = data.content.length > 0

  const audienceRequirements = !!data.audience

  const brandRequirements = !!data.brand

  const categoriesRequirements = data.categories.length >= 3

  const charactersRequirements = data.characters.length > 0

  return [contentRequirements, audienceRequirements, brandRequirements, categoriesRequirements, charactersRequirements]
}
