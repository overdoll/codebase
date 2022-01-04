/**
 * @flow
 */
import type { checkPostRequirementsFragment$key } from '@//:artifacts/checkPostRequirementsFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'

interface Props {
  query: checkPostRequirementsFragment$key
}

interface ReturnType {
  hasRequiredContent: boolean
  hasRequiredAudience: boolean
  hasRequiredCategories: boolean
  hasRequiredCharacters: boolean
}

const Fragment = graphql`
  fragment checkPostRequirementsFragment on Post {
    content {
      __typename
    }
    audience {
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

export default function checkPostRequirements ({ query }: Props): ReturnType {
  const data = useFragment(Fragment, query)

  const contentRequirements = data.content.length > 0

  const audienceRequirements = !(data.audience == null)

  const categoriesRequirements = data.categories.length >= 3

  const charactersRequirements = data.characters.length > 0

  return {
    hasRequiredContent: contentRequirements,
    hasRequiredAudience: audienceRequirements,
    hasRequiredCategories: categoriesRequirements,
    hasRequiredCharacters: charactersRequirements
  }
}
