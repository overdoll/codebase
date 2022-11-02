import { MetaBrowseCharactersFragment$key } from '@//:artifacts/MetaBrowseCharactersFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ContainerBrowseCharacters from './ContainerBrowseCharacters/ContainerBrowseCharacters'
import BrowseCharactersRichObject from './BrowseCharactersRichObject/BrowseCharactersRichObject'

interface Props {
  rootQuery: MetaBrowseCharactersFragment$key
}

const Fragment = graphql`
  fragment MetaBrowseCharactersFragment on Query {
    ...ContainerBrowseCharactersFragment
  }
`

export default function MetaBrowseCharacters (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const data = useFragment(Fragment, rootQuery)

  return (
    <>
      <BrowseCharactersRichObject />
      <ContainerBrowseCharacters rootQuery={data} />
    </>
  )
}
