import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerTopFragment$key } from '@//:artifacts/ContainerTopFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import HeaderTop from './HeaderTop/HeaderTop'
import ScrollTop from './ScrollTop/ScrollTop'
import { Stack } from '@chakra-ui/react'

interface Props {
  rootQuery: ContainerTopFragment$key
}

const RootFragment = graphql`
  fragment ContainerTopFragment on Query {
    ...ScrollTopFragment
  }
`

export default function ContainerTop (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <>
      <ContentContainer pt={2}>
        <Stack spacing={8}>
          <HeaderTop />
          <ScrollTop rootQuery={rootData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
