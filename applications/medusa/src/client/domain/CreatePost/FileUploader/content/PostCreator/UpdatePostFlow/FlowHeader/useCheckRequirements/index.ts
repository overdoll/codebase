/**
 * @flow
 */
import type { useCheckRequirementsFragment$key } from '@//:artifacts/useCheckRequirementsFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'

interface Props {
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
    club {
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

export default function useCheckRequirements ({ query }: Props): [boolean, boolean, boolean, boolean, boolean] {
  const data = useFragment(Fragment, query)

  const contentRequirements = data.content.length > 0

  const audienceRequirements = !(data.audience == null)

  const brandRequirements = !(data.brand == null)

  const categoriesRequirements = data.categories.length >= 3

  const charactersRequirements = data.characters.length > 0

  return [contentRequirements, audienceRequirements, brandRequirements, categoriesRequirements, charactersRequirements]
}
