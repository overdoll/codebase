import { t, Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostReportButtonFragment$key } from '@//:artifacts/PostReportButtonFragment.graphql'
import { PostReportButtonMutation } from '@//:artifacts/PostReportButtonMutation.graphql'
import { useFragment, useMutation } from 'react-relay/hooks'
import { MenuItem } from '../../../../../../ThemeComponents/Menu/Menu'
import { FlagReport } from '@//:assets/icons'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import CloseButton from '../../../../../../ThemeComponents/CloseButton/CloseButton'
import QueryErrorBoundary from '../../../../../../Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '../../../../../../Placeholder/Loading/SkeletonStack/SkeletonStack'
import SelectRuleList
  from '../../../../../Form/FormInput/Inputs/RuleInput/SelectRuleButton/SelectRuleList/SelectRuleList'
import { useHistoryDisclosure } from '../../../../../../../hooks'
import useSearch from '../../../../../Search/hooks/useSearch'
import { useChoice } from '../../../../../Choice'
import Button from '../../../../../../../form/Button/Button'
import { useToast } from '../../../../../../ThemeComponents'
import useAbility from '../../../../../../../authorization/useAbility'
import { useJoin } from '@//:domain/app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'

interface Props {
  query: PostReportButtonFragment$key
}

interface ChoiceProps {
  title: string
}

const Fragment = graphql`
  fragment PostReportButtonFragment on Post {
    id
    reference
    club {
      slug
    }
    viewerReport {
      __typename
    }
  }
`

const Mutation = graphql`
  mutation PostReportButtonMutation($input: ReportPostInput!) {
    reportPost(input: $input) {
      postReport {
        id
        rule {
          title
        }
      }
    }
  }
`

export default function PostReportButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<PostReportButtonMutation>(Mutation)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure({ hash: 'report' })

  const {
    loadQuery,
    searchArguments
  } = useSearch<{}>({})

  const {
    values,
    register,
    clearValues
  } = useChoice<ChoiceProps>({
    max: 1
  })

  const isDisabled = Object.keys(values).length < 1

  const notify = useToast()

  const ability = useAbility()

  const onJoin = useJoin({
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: data.club.slug,
      reference: data.reference
    }
  })

  const onSubmit = (): void => {
    const ruleId = Object.keys(values)[0]

    commit({
      variables: {
        input: {
          postId: data.id,
          ruleId: ruleId
        }
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t`Post report was submitted successfully`
        })
        onClose()
        clearValues()
      },
      updater: (store, payload) => {
        if (payload?.reportPost?.postReport != null) {
          const reportPayload = store.get(payload.reportPost.postReport.id)
          const post = store.get(data.id)
          if (reportPayload != null) {
            post?.setLinkedRecord(reportPayload, 'viewerReport')
          }
        }
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error submitting the report`
        })
      }
    })
  }

  const ReportMenuItem = (): JSX.Element => {
    if (!ability.can('configure', 'Account')) {
      return (
        <MenuItem
          onClick={onJoin}
          text={<Trans>Report Post</Trans>}
          icon={FlagReport}
        />
      )
    }

    if (data?.viewerReport != null) {
      return (
        <MenuItem
          isDisabled
          text={<Trans>Reported</Trans>}
          icon={FlagReport}
        />
      )
    }

    return (
      <MenuItem
        onClick={onOpen}
        text={<Trans>Report Post</Trans>}
        icon={FlagReport}
      />
    )
  }

  return (
    <>
      <ReportMenuItem />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Report Post
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <QueryErrorBoundary loadQuery={loadQuery}>
              <Suspense fallback={<SkeletonStack />}>
                <SelectRuleList
                  searchArguments={searchArguments}
                  register={register}
                />
              </Suspense>
            </QueryErrorBoundary>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onSubmit}
              size='lg'
              colorScheme='orange'
              isDisabled={isDisabled}
              isLoading={isInFlight}
            >
              <Trans>
                Submit Report
              </Trans>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
