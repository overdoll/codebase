import { t, Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostReportButtonFragment$key } from '@//:artifacts/PostReportButtonFragment.graphql'
import { PostReportButtonMutation } from '@//:artifacts/PostReportButtonMutation.graphql'

import { useFragment, useMutation } from 'react-relay/hooks'
import { MenuItem } from '../../../../../ThemeComponents/Menu/Menu'
import { FlagReport } from '@//:assets/icons'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from '@chakra-ui/react'
import CloseButton from '../../../../../ThemeComponents/CloseButton/CloseButton'
import QueryErrorBoundary from '../../../../../Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '../../../../../Placeholder/Loading/SkeletonStack/SkeletonStack'
import SelectRuleList
  from '../../../../../../../client/domain/Admin/components/SelectRuleButton/SelectRuleList/SelectRuleList'
import { useHistoryDisclosure } from '../../../../../../hooks'
import useSearch from '../../../../../HookedComponents/Search/hooks/useSearch'
import { useChoice } from '../../../../../HookedComponents/Choice'
import Button from '../../../../../../form/Button/Button'
import { useToast } from '../../../../../ThemeComponents'

interface Props {
  query: PostReportButtonFragment$key
}

interface ChoiceProps {
  title: string
}

const Fragment = graphql`
  fragment PostReportButtonFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation PostReportButtonMutation($input: ReportPostInput!) {
    reportPost(input: $input) {
      postReport {
        id
        account {
          username
        }
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
  } = useHistoryDisclosure()

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
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an erro submitting the report`
        })
      }
    })
  }

  return (
    <>
      <MenuItem onClick={onOpen} text={<Trans>Report Post</Trans>} icon={FlagReport} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='none'
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Report post
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <Stack spacing={2}>
              <QueryErrorBoundary loadQuery={loadQuery}>
                <Suspense fallback={<SkeletonStack />}>
                  <SelectRuleList
                    searchArguments={searchArguments}
                    register={register}
                  />
                </Suspense>
              </QueryErrorBoundary>
            </Stack>
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
