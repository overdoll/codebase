import { useState } from 'react'
import { Badge, Flex, Text, useToast } from '@chakra-ui/react'
import type { UsernameAliasCard$key } from '@//:artifacts/UsernameAliasCard.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { SmallBackgroundBox, SmallMenuButton, SmallMenuItem } from '@//:modules/content/PageLayout'
import { DeleteBin, SwapCircle } from '../../../../../../../assets/icons/interface'
import type { UsernameAliasCardDeleteMutation } from '@//:artifacts/UsernameAliasCardDeleteMutation.graphql'
import type { UsernameAliasCardSwapMutation } from '@//:artifacts/UsernameAliasCardSwapMutation.graphql'
import { t, Trans } from '@lingui/macro'

interface Props {
  query: UsernameAliasCard$key
  usernamesConnectionID: string | undefined
  disabled: boolean
}

const Fragment = graphql`
  fragment UsernameAliasCard on AccountUsername {
    id
    username
  }
`

const SwapUsernameMutation = graphql`
  mutation UsernameAliasCardSwapMutation($input: UpdateAccountUsernameAndRetainPreviousInput!) {
    updateAccountUsernameAndRetainPrevious(input: $input) {
      accountUsername {
        account {
          id
          username
        }
      }
    }
  }
`

const DeleteUsernameMutation = graphql`
  mutation UsernameAliasCardDeleteMutation($input: DeleteAccountUsernameInput! , $connections: [ID!]!) {
    deleteAccountUsername(input: $input) {
      accountUsernameId @deleteEdge(connections: $connections)
    }
  }
`

export default function UsernameAliasCard ({
  query,
  usernamesConnectionID,
  disabled
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [currentUsername] = useState(data.username)

  const [swapUsername, isSwappingUsername] = useMutation<UsernameAliasCardSwapMutation>(
    SwapUsernameMutation
  )

  const [deleteUsername, isDeletingUsername] = useMutation<UsernameAliasCardDeleteMutation>(
    DeleteUsernameMutation
  )

  const notify = useToast()

  const onSwapUsername = (): void => {
    swapUsername({
      variables: {
        input: {
          username: data.username
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Your current username is now ${currentUsername}`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error swapping to the username ${currentUsername}`,
          isClosable: true
        })
      }
    }
    )
  }

  const onDeleteUsername = (): void => {
    if (usernamesConnectionID == null) return

    deleteUsername({
      variables: {
        input: {
          accountUsernameId: data.id
        },
        connections: [usernamesConnectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`You can no longer use the username ${currentUsername}`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error deleting the username ${currentUsername}`,
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <SmallBackgroundBox py={2}>
      <Flex h='100%' align='center' justify='space-between'>
        <Text fontSize='sm' color='gray.100'>{data.username}</Text>
        {disabled
          ? <Badge
              fontSize='xs'
              colorScheme='green'
            >
            <Trans>
              Current
            </Trans>
          </Badge>
          : <Flex align='center'>
            <SmallMenuButton>
              <SmallMenuItem
                icon={SwapCircle}
                text={t`Swap To`}
                onClick={onSwapUsername}
                isDisabled={isSwappingUsername}
              />
              <SmallMenuItem
                color='orange.300'
                icon={DeleteBin}
                text={t`Delete`}
                onClick={onDeleteUsername}
                isDisabled={isDeletingUsername}
              />
            </SmallMenuButton>
          </Flex>}
      </Flex>
    </SmallBackgroundBox>
  )
}
