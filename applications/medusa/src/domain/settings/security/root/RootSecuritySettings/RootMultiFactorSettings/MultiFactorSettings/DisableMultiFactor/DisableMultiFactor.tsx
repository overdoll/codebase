import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Flex,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { DisableMultiFactorFragment$key } from '@//:artifacts/DisableMultiFactorFragment.graphql'
import type { DisableMultiFactorMutation } from '@//:artifacts/DisableMultiFactorMutation.graphql'
import { useRef } from 'react'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  data: DisableMultiFactorFragment$key
}

const DisableMultiFactorFragmentGQL = graphql`
  fragment DisableMultiFactorFragment on Account {
    canDisableMultiFactor
  }
`

const DisableMultiFactorMutationGQL = graphql`
  mutation DisableMultiFactorMutation {
    disableAccountMultiFactor {
      account {
        multiFactorEnabled
      }
    }
  }
`

export default function DisableMultiFactor (props: Props): JSX.Element {
  const data = useFragment(DisableMultiFactorFragmentGQL, props.data)

  const [disableMultiFactor, isDisablingMultiFactor] = useMutation<DisableMultiFactorMutation>(
    DisableMultiFactorMutationGQL
  )

  const cancelRef = useRef(null)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const notify = useToast()

  const onDisable = (): void => {
    disableMultiFactor({
      variables: {},
      onCompleted () {
        notify({
          status: 'success',
          title: t`Two-factor authentication has been disabled for your account`,
          isClosable: true
        })
        onClose()
      },
      updater: (store, payload) => {
        const viewer = store.getRoot().getLinkedRecord('viewer')

        if (viewer != null) {
          viewer
            .setValue(payload?.disableAccountMultiFactor?.accountMultiFactorTotpEnabled, 'multiFactorTotpConfigured')
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error disabling two-factor authentication`,
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <Flex w='100%'>
        <Flex
          borderRadius='base'
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          w='100%'
          px={3}
          py={2}
          bg='gray.800'
          align='center'
          justify='space-between'
        >
          <Text fontFamily='body' fontWeight='semibold' color='gray.200' fontSize='sm'>
            <Trans>
              Disable Two-Factor Authentication
            </Trans>
          </Text>
        </Flex>
        <Tooltip
          isDisabled={data.canDisableMultiFactor}
          shouldWrapChildren
          label={
            <Trans>
              Your account role prevents you from disabling two-factor authentication
            </Trans>
          }
        >
          <Button
            onClick={onOpen}
            variant='solid'
            colorScheme='orange'
            size='sm'
            isDisabled={!data.canDisableMultiFactor}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            h='37px'
          >
            <Trans>
              Disable
            </Trans>
          </Button>
        </Tooltip>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg'>
              <Trans>
                Disable Two-Factor Authentication
              </Trans>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Trans>
                Disabling two-factor authentication will remove the extra layer of security on your account. Are you
                sure?
              </Trans>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button size='md' onClick={onClose} ref={cancelRef}>
                <Trans>
                  Cancel
                </Trans>
              </Button>
              <Button
                isLoading={isDisablingMultiFactor}
                size='md'
                variant='solid'
                colorScheme='orange'
                onClick={onDisable}
                ml={3}
              >
                <Trans>
                  Disable Two-Factor
                </Trans>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
