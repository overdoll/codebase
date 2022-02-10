import { useEffect } from 'react'
import { Collapse, Flex, useDisclosure, useToast } from '@chakra-ui/react'
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

  const {
    isOpen: isFormOpen,
    onToggle: onToggleForm
  } = useDisclosure()

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
        isClosable: true,
        title: confirmationError
      })
      flush('confirmation.error')
    }

    if (confirmationSuccess != null) {
      notify({
        status: 'success',
        isClosable: true,
        title: confirmationSuccess
      })
      flush('confirmation.success')
    }
  }, [confirmationError, confirmationSuccess])

  return (
    <ListSpacer>
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
      <Button
        variant='solid'
        colorScheme='gray'
        onClick={onToggleForm}
        size='sm'
      >
        <Trans>
          Add Email
        </Trans>
      </Button>
      <Collapse in={isFormOpen} animateOpacity>
        <AddEmailForm isDisabled={disableEmailAdd} connectionId={emailsConnectionID} />
      </Collapse>
    </ListSpacer>
  )
}
