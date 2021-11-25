/**
 * @flow
 */
import {
  Flex,
  Text,
  Tooltip,
  Heading,
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
      <Flex w='100%'>
        <Flex
          borderRadius='base'
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          w='100%'
          px={3} py={2} bg='gray.800'
          align='center'
          justify='space-between'
        >
          <Text fontFamily='body' fontWeight='semibold' color='gray.200' fontSize='sm'>
            {t('security.multi_factor.disable.title')}
          </Text>
        </Flex>
        <Tooltip
          isDisabled={data.canDisableMultiFactor} shouldWrapChildren
          label={t('security.multi_factor.disable.tooltip')}
        >
          <Button
            onClick={onOpen} variant='solid' colorScheme='orange'
            size='sm' isDisabled={!data.canDisableMultiFactor}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            h='37px'
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
              <Button size='md' onClick={onClose}>
                {t('security.multi_factor.disable.modal.cancel')}
              </Button>
              <Button
                isLoading={isDisablingMultiFactor} size='md' variant='solid' colorScheme='orange'
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
