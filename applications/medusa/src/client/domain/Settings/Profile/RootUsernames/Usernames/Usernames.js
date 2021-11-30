/**
 * @flow
 */
import type { Node } from 'react'
import {
  Flex,
  Heading,
  Stack,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Collapse,
  Spacer
} from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import { graphql, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import ChangeUsernameForm from './ChangeUsernameForm/ChangeUsernameForm'
import InfoTip from '../../../../../components/ContentHints/InfoTip/InfoTip'
import type { UsernamesQuery } from '@//:artifacts/UsernamesQuery.graphql'
import Button from '@//:modules/form/Button'
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
              <InfoTip
                text={t('profile.username.previous.tooltip.hint')}
              />
            </Flex>
            {data.usernames.edges.map((item, index) =>
              <Text fontSize='sm' key={index} color='gray.200'>{item.node.username}</Text>
            )}
          </SmallBackgroundBox>
        </Collapse>
        <Button
          variant='solid' colorScheme='gray' onClick={onToggleForm}
          size='sm'
        >{t('profile.username.current.change')}
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
