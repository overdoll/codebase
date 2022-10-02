import Icon from '../../../../PageLayout/BuildingBlocks/Icon/Icon'
import { SuccessBox } from '@//:assets/icons'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import type { PendingMediaFragment$key } from '@//:artifacts/PendingMediaFragment.graphql'

interface Props {
  postQuery: PendingMediaFragment$key
}

const Fragment = graphql`
  fragment PendingMediaFragment on Post {
    characters {
      name
    }
  }
`

export default function PendingMedia (props: Props): JSX.Element {
  const {
    postQuery
  } = props

  const data = useFragment(Fragment, postQuery)

  return (
    <Stack p={2} spacing={1}>
      <Icon icon={SuccessBox} w={6} h={6} fill='gray.200' />
      <Heading textAlign='center' fontSize='sm' color='gray.200'>
        <Trans>Post queued for processing</Trans>
      </Heading>
      {data.characters.map((item) => (
        <Heading key={item.name} textAlign='center' fontSize='xs' color='gray.300'>
          {item.name}
        </Heading>))}
    </Stack>
  )
}
