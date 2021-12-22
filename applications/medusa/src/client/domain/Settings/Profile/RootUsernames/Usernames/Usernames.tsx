import { Collapse, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { graphql, PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import ChangeUsernameForm from './ChangeUsernameForm/ChangeUsernameForm'
import type { UsernamesQuery } from '@//:artifacts/UsernamesQuery.graphql'
import Button from '@//:modules/form/Button/Button'
import { ListSpacer, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import UsernameAliasCard from './UsernameAliasCard/UsernameAliasCard'
import { Plural, Trans } from '@lingui/macro'

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

interface Props {
  query: PreloadedQuery<UsernamesQuery>
}

export default function Usernames (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<UsernamesQuery>(
    UsernameQueryGQL,
    props.query
  )

  const data = useFragment<UsernamesSettingsFragment$key>(UsernameFragmentGQL, queryData?.viewer)

  const {
    isOpen: isFormOpen,
    onToggle: onToggleForm
  } = useDisclosure()

  const {
    isOpen: isAliasesOpen,
    onToggle: onToggleAliases
  } = useDisclosure()

  const usernamesConnectionID = data?.usernames?.__id

  const disableUsernameAdd = data?.usernames != null && (data?.usernames?.edges?.length >= (queryData?.viewer?.usernamesLimit != null && queryData?.viewer?.usernamesLimit))

  const showAliases = data?.usernames != null && data?.usernames?.edges?.length > 1

  return (
    <>
      <ListSpacer>
        <Flex>
          <SmallBackgroundBox
            borderTopRightRadius={showAliases ? 0 : 'initial'}
            borderBottomRightRadius={showAliases ? 0 : 'initial'}
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
              colorScheme='teal'
              variant='solid'
              onClick={onToggleAliases}
              h='60px'
            >
              <Plural
                value={data?.usernames?.edges?.length - 1}
                one='1 alias'
                other={`${data?.usernames?.edges?.length - 1} aliases`}
              />
            </Button>}
        </Flex>
        <Collapse in={isAliasesOpen && showAliases} animateOpacity>
          <ListSpacer>
            {data?.usernames.edges.map((item, index) =>
              <UsernameAliasCard
                disabled={item.node.username === data?.username}
                usernamesConnectionID={usernamesConnectionID}
                query={item.node}
                key={index}
              />
            )}
          </ListSpacer>
        </Collapse>
        <Button
          variant='solid'
          colorScheme='gray'
          onClick={onToggleForm}
          size='sm'
        >
          <Trans>
            Change Username
          </Trans>
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
