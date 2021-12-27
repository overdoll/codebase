import { Collapse, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { graphql, PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import ChangeUsernameForm from './ChangeUsernameForm/ChangeUsernameForm'
import type { UsernamesQuery } from '@//:artifacts/UsernamesQuery.graphql'
import Button from '@//:modules/form/Button/Button'
import { ListSpacer, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

const UsernameQueryGQL = graphql`
  query UsernamesQuery {
    viewer {
      ...UsernamesSettingsFragment
    }
  }
`

const UsernameFragmentGQL = graphql`
  fragment UsernamesSettingsFragment on Account {
    username
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

  return (
    <>
      <ListSpacer>
        <SmallBackgroundBox
          w='100%'
          h='60px'
        >
          <Flex align='center'>
            <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{data?.username}</Text>
          </Flex>
        </SmallBackgroundBox>
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
            <ChangeUsernameForm />
          </Flex>
        </Collapse>
      </ListSpacer>
    </>
  )
}
