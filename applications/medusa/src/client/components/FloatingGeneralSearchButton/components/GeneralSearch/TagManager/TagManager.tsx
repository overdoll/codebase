import { StateProps } from '../../../FloatingGeneralSearchButton'
import { Wrap, WrapItem } from '@chakra-ui/react'
import RemovableTag from '../RemovableTag/RemovableTag'
import { CategoryIdentifier, CharacterIdentifier, SeriesIdentifier } from '@//:assets/icons/interface'
import { removeKeyFromObject } from '../../../helpers/removeKeyFromObject'
import { graphql, useFragment } from 'react-relay/hooks'
import type { TagManagerFragment$key } from '@//:artifacts/TagManagerFragment.graphql'

interface Props extends StateProps {
  query: TagManagerFragment$key
}

const Fragment = graphql`
  fragment TagManagerFragment on Query {
    series (slugs: $seriesSlugs) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
    characters (slugs: $charactersSlugs) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    categories (slugs: $categoriesSlugs) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`

export default function TagManager ({
  searchValues,
  setSearchValues,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const onRemove = (id): void => {
    setSearchValues((prev) => removeKeyFromObject(id, prev))
  }

  return (
    <Wrap spacing={2}>
      {Object.keys(searchValues).map((item, index) =>
        <WrapItem key={index}>
          <RemovableTag
            icon={searchValues[item].type === 'category'
              ? CategoryIdentifier
              : searchValues[item].type === 'character'
                ? CharacterIdentifier
                : SeriesIdentifier}
            onRemove={onRemove}
            id={item}
            boxShadow='md'
            title={searchValues[item].title}
          />
        </WrapItem>
      )}
    </Wrap>
  )
}
