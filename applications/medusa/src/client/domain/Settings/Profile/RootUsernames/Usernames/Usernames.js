/**
 * @flow
 */
import type { Node } from 'react'
import { Badge, Collapse, Flex, Spacer, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
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
      usernamesLimit
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

  const disableUsernameAdd = data.usernames.edges.length >= queryData.viewer.usernamesLimit

  const showAliases = data.usernames.edges.length > 1

  return (
    <>
      <ListSpacer>
        <Flex>
          <SmallBackgroundBox
            borderTopRightRadius={showAliases && 0}
            borderBottomRightRadius={showAliases && 0}
            w='100%'
            h='60px'
          >
            <Flex align='center'>
              <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{data?.username}</Text>
            </Flex>
          </SmallBackgroundBox>
          {showAliases &&
            <Button
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              colorScheme='teal' variant='solid'
              onClick={onToggleAliases}
              h='60px'
            >
              {t('profile.username.previous.title', { count: data.usernames.edges.length - 1 })}
            </Button>}
        </Flex>
        <Collapse in={isAliasesOpen && showAliases} animateOpacity>
          <ListSpacer>
            {data.usernames.edges.map((item, index) =>
              <UsernameAliasCard
                disabled={item.node.username === data.username}
                usernamesConnectionID={usernamesConnectionID} query={item.node} key={index}
              />
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
              isDisabled={disableUsernameAdd}
              usernamesConnectionID={usernamesConnectionID}
            />
          </Flex>
        </Collapse>
      </ListSpacer>
    </>
  )
}
