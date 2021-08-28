/**
 * @flow
 */
import {
  Flex,
  Text,
  Heading,
  Box,
  Tooltip,
  Badge,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialog, useDisclosure
} from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'
import Button from '@//:modules/form/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import type { DisableMultiFactorFragment$key } from '@//:artifacts/DisableMultiFactorFragment.graphql'

type Props = {
  data: DisableMultiFactorFragment$key
}

const DisableMultiFactorFragmentGQL = graphql`
  fragment DisableMultiFactorFragment on AccountMultiFactorSettings {

    canDisableMultiFactor
  }
`

export default function DisableMultiFactor (props: Props): Node {
  const data = useFragment(DisableMultiFactorFragmentGQL, props.data)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onDisable = () => {

  }

  const [t] = useTranslation('settings')

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
          <Button isDisabled={!data.canDisableMultiFactor} variant='outline' colorScheme='orange' size='sm'>
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
              <Button size='lg' variant='outline' colorScheme='orange' onClick={onDisable} ml={3}>
                {t('security.multi_factor.disable.modal.confirm')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
