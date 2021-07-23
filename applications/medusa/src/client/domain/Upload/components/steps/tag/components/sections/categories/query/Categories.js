/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { CategoriesQuery } from '@//:artifacts/CategoriesQuery.graphql'
import type { VariablesOf } from 'relay-runtime'
import Element from '../../../../../../../../../components/Element/Element'
import { Wrap } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Empty from '../../../search/empty/Empty'

type Props = {
  args: {
    variables: VariablesOf<CategoriesQuery>,
    options: {},
  },
  onSelect: () => void,
  selected: Array<string>,
};

const CategoriesQueryGQL = graphql`
  query CategoriesQuery($title: String!) {
    categories(title: $title) {
      edges {
        node {
          id
          title
          thumbnail
        }
      }
    }
  }
`

export default function Categories ({ args, onSelect, selected }: Props): Node {
  const data = useLazyLoadQuery<CategoriesQuery>(
    CategoriesQueryGQL,
    args.variables,
    args.options
  )

  const [t] = useTranslation('upload')

  // We dont let users add custom categories
  if (data.categories.edges.length === 0) {
    return (
      <Empty title={t('tag.category.not_found')} />
    )
  }

  return (
    <Wrap justify='center'>
      {data.categories.edges.map(item => (
        <Element
          key={item.id}
          onSelect={() => onSelect(item)}
          selected={selected.indexOf(item.id) > -1}
          title={item.title}
          thumbnail={item.thumbnail}
        />
      ))}
    </Wrap>
  )
}
