/**
 * @flow
 */
import {
  Flex,
  Text,
  Tooltip,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialog, useDisclosure, useToast
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Button from '@//:modules/form/Button'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { DisableMultiFactorFragment$key } from '@//:artifacts/DisableMultiFactorFragment.graphql'
import type { DisableMultiFactorMutation } from '@//:artifacts/DisableMultiFactorMutation.graphql'

type Props = {
  data: DisableMultiFactorFragment$key
}

const DisableMultiFactorFragmentGQL = graphql`
  fragment DisableMultiFactorFragment on AccountMultiFactorSettings {
    canDisableMultiFactor
  }
`

const DisableMultiFactorMutationGQL = graphql`
  mutation DisableMultiFactorMutation {
    disableAccountMultiFactor {
      accountMultiFactorTotpEnabled
    }
  }
`

export default function DisableMultiFactor (props: Props): Node {
  const data = useFragment(DisableMultiFactorFragmentGQL, props.data)

  const [disableMultiFactor, isDisablingMultiFactor] = useMutation<DisableMultiFactorMutation>(
    DisableMultiFactorMutationGQL
  )

  const [t] = useTranslation('settings')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const notify = useToast()

  const onDisable = () => {
    disableMultiFactor({
      variables: {},
      onCompleted () {
        notify({
          status: 'success',
          title: t('security.multi_factor.disable.modal.query.success'),
          isClosable: true
        })
        onClose()
      },
      updater: (store, payload) => {
        const viewer = store.getRoot().getLinkedRecord('viewer').getLinkedRecord('multiFactorSettings')
        viewer.setValue(payload.disableAccountMultiFactor.accountMultiFactorTotpEnabled, 'multiFactorTotpConfigured')
      },
      onError () {
        notify({
          status: 'error',
          title: t('security.multi_factor.disable.modal.query.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <Flex align='center' justify='space-between'>
        <Flex align='flex-start' justify='center' direction='column'>
          <Text mb={1} color='gray.100' fontSize='sm'>
            {t('security.multi_factor.disable.title')}
          </Text>
        </Flex>
        <Tooltip
          isDisabled={data.canDisableMultiFactor} shouldWrapChildren
          label={t('security.multi_factor.disable.tooltip')}
        >
          <Button
            onClick={onOpen} isDisabled={!data.canDisableMultiFactor} variant='outline' colorScheme='orange'
            size='sm'
          >
            {t('security.multi_factor.disable.button')}
          </Button>
        </Tooltip>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg'>
              {t('security.multi_factor.disable.modal.header')}
            </AlertDialogHeader>

            <AlertDialogBody>
              {t('security.multi_factor.disable.modal.description')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button size='lg' onClick={onClose}>
                {t('security.multi_factor.disable.modal.cancel')}
              </Button>
              <Button
                isLoading={isDisablingMultiFactor} size='lg' variant='outline' colorScheme='orange'
                onClick={onDisable} ml={3}
              >
                {t('security.multi_factor.disable.modal.confirm')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
