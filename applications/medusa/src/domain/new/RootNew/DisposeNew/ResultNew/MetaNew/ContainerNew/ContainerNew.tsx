import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerNewFragment$key } from '@//:artifacts/ContainerNewFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import ScrollNew from './ScrollNew/ScrollNew'
import HeaderNew from './HeaderNew/HeaderNew'
import { Stack } from '@chakra-ui/react'

interface Props {
  rootQuery: ContainerNewFragment$key
}

const RootFragment = graphql`
  fragment ContainerNewFragment on Query {
    ...ScrollNewFragment
  }
`

export default function ContainerNew (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)

  return (
    <>
      <ContentContainer pt={2}>
        <Stack spacing={8}>
          <HeaderNew />
          <ScrollNew rootQuery={rootData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
