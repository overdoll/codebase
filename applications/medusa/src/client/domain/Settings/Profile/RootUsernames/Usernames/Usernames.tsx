import { Collapse, Flex, Spacer, Stack, Text, useDisclosure } from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import { graphql, PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import ChangeUsernameForm from './ChangeUsernameForm/ChangeUsernameForm'
import type { UsernamesQuery } from '@//:artifacts/UsernamesQuery.graphql'
import Button from '@//:modules/form/Button/Button'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

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
        }
      }
    }
  }
`

interface Props {
  query: PreloadedQuery<UsernamesQuery>
}

export default function Usernames (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<UsernamesQuery>(
    UsernameQueryGQL,
    props.query
  )

  const data = useFragment<UsernamesSettingsFragment$key>(UsernameFragmentGQL, queryData?.viewer)

  const [t] = useTranslation('settings')

  const {
    isOpen: isFormOpen,
    onToggle: onToggleForm
  } = useDisclosure()

  const {
    isOpen: isAliasesOpen,
    onToggle: onToggleAliases
  } = useDisclosure()

  if (data?.usernames == null) return null

  const usernamesConnectionID = data?.usernames?.__id

  return (
    <>
      <Stack spacing={2}>
        <SmallBackgroundBox>
          <Flex justify='center'>
            <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{data?.username}</Text>
            {data?.usernames.edges.length > 0 &&
              <>
                <Spacer />
                <Button
                  fontFamily='body'
                  fontSize='sm'
                  color='gray.100'
                  variant='link'
                  onClick={onToggleAliases}
                >
                  {t('profile.username.previous.title', { count: data.usernames.edges.length })}
                </Button>
              </>}
          </Flex>
        </SmallBackgroundBox>
        <Collapse in={isAliasesOpen} animateOpacity>
          <SmallBackgroundBox>
            <Flex>
              <Text fontSize='sm' color='gray.100'>{t('profile.username.previous.tooltip.title')}</Text>
            </Flex>
            {data.usernames.edges.map((item, index) =>
              <Text fontSize='sm' key={index} color='gray.200'>{item.node.username}</Text>
            )}
          </SmallBackgroundBox>
        </Collapse>
        <Button
          variant='solid'
          colorScheme='gray'
          onClick={onToggleForm}
          size='sm'
        >
          {t('profile.username.current.change')}
        </Button>
        <Collapse in={isFormOpen} animateOpacity>
          <Flex>
            <ChangeUsernameForm usernamesConnectionID={usernamesConnectionID} />
          </Flex>
        </Collapse>
      </Stack>
    </>
  )
}
