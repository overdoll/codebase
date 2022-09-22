import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerBrowseFragment$key } from '@//:artifacts/ContainerBrowseFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import HeaderBrowse from './HeaderBrowse/HeaderBrowse'
import ScrollBrowse from './ScrollBrowse/ScrollBrowse'
import { Stack } from '@chakra-ui/react'

interface Props {
  rootQuery: ContainerBrowseFragment$key
}

const RootFragment = graphql`
  fragment ContainerBrowseFragment on Query {
    ...ScrollBrowseFragment
  }
`

export default function ContainerBrowse (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <>
      <ContentContainer pt={2}>
        <Stack spacing={8}>
          <HeaderBrowse />
          <ScrollBrowse rootQuery={rootData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
