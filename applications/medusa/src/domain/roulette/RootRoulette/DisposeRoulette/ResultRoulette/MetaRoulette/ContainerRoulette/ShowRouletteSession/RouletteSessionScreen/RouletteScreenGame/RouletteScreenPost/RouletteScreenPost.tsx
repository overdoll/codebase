import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenPostFragment$key } from '@//:artifacts/RouletteScreenPostFragment.graphql'
import { graphql } from 'react-relay'
import { CinematicContent } from '@//:modules/content/HookedComponents/Post'

interface Props {
  query: RouletteScreenPostFragment$key
}

const Fragment = graphql`
  fragment RouletteScreenPostFragment on Post {
    ...CinematicContentFragment
  }
`

export default function RouletteScreenPost (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  return (
    <CinematicContent postQuery={data} />
  )
}
