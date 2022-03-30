import { useEffect } from 'react'
import { Flex, Stack } from '@chakra-ui/react'
import AddEmailForm from './AddEmailForm/AddEmailForm'
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import EmailCard from './EmailCard/EmailCard'
import { useFlash } from '@//:modules/flash'
import type { EmailsQuery } from '@//:artifacts/EmailsQuery.graphql'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { usePaginationFragment } from 'react-relay'
import Button from '@//:modules/form/Button/Button'
import { EmailsSettingsPaginationQuery } from '@//:artifacts/EmailsSettingsPaginationQuery.graphql'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon, useToast } from '@//:modules/content/ThemeComponents'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: PreloadedQuery<EmailsQuery>
}

const EmailsQueryGQL = graphql`
  query EmailsQuery {
    viewer {
      ...EmailsSettingsFragment
      emailsLimit
    }
  }
`

const EmailsFragmentGQL = graphql`
  fragment EmailsSettingsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "EmailsSettingsPaginationQuery" ) {
    emails(first: $first, after: $after)
    @connection(key: "EmailsSettingsFragment_emails") {
      __id
      edges {
        node {
          ...EmailCardFragment
          status
        }
      }
    }
  }
`

export default function Emails (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<EmailsQuery>(
    EmailsQueryGQL,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<EmailsSettingsPaginationQuery, any>(
    EmailsFragmentGQL,
    queryData?.viewer
  )

  const currentEmails = data.emails.edges.filter((item) => item.node.status !== 'UNCONFIRMED')

  const disableEmailAdd = queryData?.viewer != null && currentEmails.length >= queryData?.viewer?.emailsLimit

  const emailsConnectionID = data?.emails?.__id

  const {
    read,
    flush
  } = useFlash()

  const notify = useToast()

  const confirmationSuccess = read('confirmation.success')

  const confirmationError = read('confirmation.error')

  useEffect(() => {
    if (confirmationError != null) {
      notify({
        status: 'error',
        duration: 10000,
        title: confirmationError
      })
      flush('confirmation.error')
    }

    if (confirmationSuccess != null) {
      notify({
        status: 'success',
        title: confirmationSuccess
      })
      flush('confirmation.success')
    }
  }, [confirmationError, confirmationSuccess])

  return (
    <Stack spacing={4}>
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
            onClick={() => loadNext(3)}
            isLoading={isLoadingNext}
            color='gray.200'
            variant='link'
          >
            <Trans>
              Load More
            </Trans>
          </Button>
        </Flex>}
      <Collapse>
        <CollapseButton size='md'>
          <Trans>
            Add Email
          </Trans>
        </CollapseButton>
        <CollapseBody>
          <Stack spacing={2}>
            {disableEmailAdd &&
              <Alert mb={2} status='warning'>
                <AlertIcon />
                <AlertDescription fontSize='sm'>
                  <Trans>
                    You have added the maximum amount of confirmed emails. You'll have to remove at least one email to
                    be
                    able to add another.
                  </Trans>
                </AlertDescription>
              </Alert>}
            <AddEmailForm isDisabled={disableEmailAdd} connectionId={emailsConnectionID} />
          </Stack>
        </CollapseBody>
      </Collapse>
    </Stack>
  )
}
