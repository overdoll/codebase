import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenPostFragment$key } from '@//:artifacts/RouletteScreenPostFragment.graphql'
import { graphql } from 'react-relay'
import RouletteContent
  from '@//:modules/content/HookedComponents/Post/fragments/Content/RouletteContent/RouletteContent'

interface Props {
  query: RouletteScreenPostFragment$key
}

const Fragment = graphql`
  fragment RouletteScreenPostFragment on Post {
    ...RouletteContentFragment
  }
`

export default function RouletteScreenPost (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  return (
    <RouletteContent postQuery={data} />
  )
}
