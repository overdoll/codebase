/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import { Badge, Box, Flex, Spacer, Stack, Text, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { UsernameAliasCard$key } from '@//:artifacts/UsernameAliasCard.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { SmallBackgroundBox, SmallMenuButton, SmallMenuItem } from '@//:modules/content/PageLayout'
import { DeleteBin, SwapCircle } from '../../../../../../../assets/icons/interface'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import type { UsernameAliasCardDeleteMutation } from '@//:artifacts/UsernameAliasCardDeleteMutation.graphql'
import type { UsernameAliasCardSwapMutation } from '@//:artifacts/UsernameAliasCardSwapMutation.graphql'

type Props = {
  query: UsernameAliasCard$key,
  usernamesConnectionID: UsernamesSettingsFragment$key,
  disabled: () => void,
};

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

export default function UsernameAliasCard ({ query, usernamesConnectionID, disabled }: Props): Node {
  const data = useFragment(Fragment, query)

  const [currentUsername] = useState(data.username)

  const [swapUsername, isSwappingUsername] = useMutation<UsernameAliasCardSwapMutation>(
    SwapUsernameMutation
  )

  const [deleteUsername, isDeletingUsername] = useMutation<UsernameAliasCardDeleteMutation>(
    DeleteUsernameMutation
  )

  const [t] = useTranslation('settings')

  const notify = useToast()

  const onSwapUsername = () => {
    swapUsername({
      variables: {
        input: {
          username: data.username
        },
        connections: [usernamesConnectionID]
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t('profile.username.previous.swap.query.success', { username: currentUsername }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.username.previous.swap.query.error', { username: currentUsername }),
          isClosable: true
        })
      }
    }
    )
  }

  const onDeleteUsername = () => {
    deleteUsername({
      variables: {
        input: {
          accountUsernameId: data.id
        },
        connections: [usernamesConnectionID]
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t('profile.username.previous.delete.query.success', { username: currentUsername }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.username.previous.delete.query.error', { username: currentUsername }),
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
            {t('profile.username.current.badge')}
          </Badge>
          : <Flex align='center'>
            <SmallMenuButton>
              <SmallMenuItem
                icon={SwapCircle}
                text={t('profile.username.previous.swap.button')}
                onClick={onSwapUsername}
                isDisabled={isSwappingUsername}
              />
              <SmallMenuItem
                color='orange.300'
                icon={DeleteBin}
                text={t('profile.username.previous.delete.button')}
                onClick={onDeleteUsername}
                isDisabled={isDeletingUsername}
              />
            </SmallMenuButton>
          </Flex>}
      </Flex>
    </SmallBackgroundBox>
  )
}
