/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect } from 'react'
import {
  Divider,
  Flex,
  Heading,
  Box,
  Stack, useToast
} from '@chakra-ui/react'
import AddEmailForm from './AddEmailForm/AddEmailForm'
import { graphql, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import EmailCard from './EmailCard/EmailCard'
import { useFlash } from '@//:modules/flash'
import type { EmailsQuery } from '@//:artifacts/EmailsQuery.graphql'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { usePaginationFragment } from 'react-relay'
import type { SessionsSettingsFragment$key } from '@//:artifacts/SessionsSettingsFragment.graphql'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'

type Props = {
  query: EmailsSettingsFragment$key
}

const EmailsQueryGQL = graphql`
  query EmailsQuery {
    viewer {
      ...EmailsSettingsFragment
    }
  }
`

const EmailsFragmentGQL = graphql`
  fragment EmailsSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "EmailsSettingsPaginationQuery" ) {
    emails(first: $first, after: $after)
    @connection(key: "EmailsSettingsFragment_emails") {
      __id
      edges {
        node {
          ...EmailCardFragment
          id
        }
      }
    }
  }
`

export default function Emails (props: Props): Node {
  const queryData = usePreloadedQuery<EmailsQuery>(
    EmailsQueryGQL,
    props.query
  )

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<EmailsSettingsFragment$key,
    _>(
      EmailsFragmentGQL,
      queryData?.viewer
    )

  const [t] = useTranslation('settings')

  const emailsConnectionID = data?.emails?.__id

  const { read, flush } = useFlash()

  const notify = useToast()

  const confirmationSuccess = read('confirmation.success')

  const confirmationError = read('confirmation.error')

  useEffect(() => {
    if (confirmationError) {
      notify({
        status: 'error',
        duration: 10000,
        isClosable: true,
        title: confirmationError
      })
      flush('confirmation.error')
    }

    if (confirmationSuccess) {
      notify({
        status: 'success',
        isClosable: true,
        title: confirmationSuccess
      })
      flush('confirmation.success')
    }
  }, [confirmationError, confirmationSuccess])

  return (
    <Stack spacing={3}>
      <ListSpacer>
        {data?.emails.edges.map((item, index) => {
          return (
            <EmailCard
              emails={item.node}
              key={index}
              connectionID={emailsConnectionID}
            />
          )
        })}
      </ListSpacer>
      {hasNext &&
        <Flex justify='center'>
          <Button
            onClick={() => loadNext(3)} isLoading={isLoadingNext} color='gray.200'
            variant='link'
          >{t('profile.email.load')}
          </Button>
        </Flex>}
      <AddEmailForm connectionID={emailsConnectionID} />
    </Stack>
  )
}
