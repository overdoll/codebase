import { Badge, Stack, Text } from '@chakra-ui/react'
import ResourceItem from '../../../DataDisplay/ResourceItem/ResourceItem'
import { graphql, useFragment } from 'react-relay/hooks'
import { AccountTileOverlayFragment$key } from '@//:artifacts/AccountTileOverlayFragment.graphql'
import { TileOverlay } from '../../index'
import { Trans } from '@lingui/macro'
import AccountIcon from '../../../PageLayout/Display/fragments/AccountIcon/AccountIcon'

interface Props {
  query: AccountTileOverlayFragment$key
  isSupporter: boolean
}

const Fragment = graphql`
  fragment AccountTileOverlayFragment on Account {
    id
    username
    ...AccountIconFragment
  }
`

export default function AccountTileOverlay ({
  query,
  isSupporter
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <TileOverlay backdrop={
      <ResourceItem seed={data.id} query={null} />
    }
    >
      <Stack p={2} h='100%' w='100%' spacing={2} align='center' justify='center'>
        <AccountIcon size='md' accountQuery={data} />
        <Text fontFamily='mono' fontSize='md' color='gray.00'>
          {data.username}
        </Text>
        {isSupporter
          ? (
            <Badge borderRadius='base' fontSize='sm' colorScheme='orange'>
              <Trans>
                Supporter
              </Trans>
            </Badge>
            )
          : (
            <Badge borderRadius='base' fontSize='sm' colorScheme='teal'>
              <Trans>
                Member
              </Trans>
            </Badge>
            )}
      </Stack>
    </TileOverlay>
  )
}
