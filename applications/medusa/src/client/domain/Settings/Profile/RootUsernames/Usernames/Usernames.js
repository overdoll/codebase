/**
 * @flow
 */
import type { Node } from 'react'
import { Badge, Collapse, Flex, Spacer, Stack, Text, useDisclosure } from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import { graphql, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import ChangeUsernameForm from './ChangeUsernameForm/ChangeUsernameForm'
import type { UsernamesQuery } from '@//:artifacts/UsernamesQuery.graphql'
import Button from '@//:modules/form/Button'
import { SmallBackgroundBox, ClickableBox, SmallMenuButton, ListSpacer } from '@//:modules/content/PageLayout'
import UsernameAliasCard from './UsernameAliasCard/UsernameAliasCard'

const UsernameQueryGQL = graphql`
  query UsernamesQuery($first: Int) {
    viewer {
      ...UsernamesSettingsFragment
    }
  }
`

const UsernameFragmentGQL = graphql`
  fragment UsernamesSettingsFragment on Account {
    username
    usernames(first: $first) @connection(key: "UsernamesSettingsFragment_usernames" ) {
      __id
      edges {
        node {
          username
          ...UsernameAliasCard
        }
      }
    }
  }
`

type Props = {
  query: UsernamesSettingsFragment$key
}

export default function Usernames (props: Props): Node {
  const queryData = usePreloadedQuery<UsernamesQuery>(
    UsernameQueryGQL,
    props.query
  )

  const data = useFragment(UsernameFragmentGQL, queryData?.viewer)

  const [t] = useTranslation('settings')

  const { isOpen: isFormOpen, onToggle: onToggleForm } = useDisclosure()

  const { isOpen: isAliasesOpen, onToggle: onToggleAliases } = useDisclosure()

  const usernamesConnectionID = data?.usernames?.__id

  const currentUsernames = data.usernames.edges.filter((item) => item.node.username !== data.username)

  return (
    <>
      <ListSpacer>
        <SmallBackgroundBox>
          <Flex align='center'>
            <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{data?.username}</Text>
            {currentUsernames.length > 0 &&
              <>
                <Spacer />
                <Button variant='link' onClick={onToggleAliases}>
                  {t('profile.username.previous.title', { count: currentUsernames.length })}
                </Button>
              </>}
          </Flex>
        </SmallBackgroundBox>
        <Collapse in={isAliasesOpen} animateOpacity>
          <ListSpacer>
            {currentUsernames.map((item, index) =>
              <UsernameAliasCard usernamesConnectionID={usernamesConnectionID} query={item.node} key={index} />
            )}
          </ListSpacer>
        </Collapse>
        <Button
          variant='solid' colorScheme='gray' onClick={onToggleForm}
          size='sm'
        >{t('profile.username.current.change')}
        </Button>
        <Collapse in={isFormOpen} animateOpacity>
          <Flex>
            <ChangeUsernameForm
              isDisabled={currentUsernames.length === 4}
              usernamesConnectionID={usernamesConnectionID}
            />
          </Flex>
        </Collapse>
      </ListSpacer>
    </>
  )
}
