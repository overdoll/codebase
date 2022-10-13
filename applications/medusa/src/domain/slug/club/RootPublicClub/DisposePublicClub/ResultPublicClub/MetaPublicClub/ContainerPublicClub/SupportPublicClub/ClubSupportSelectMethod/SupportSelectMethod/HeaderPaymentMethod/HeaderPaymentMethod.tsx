import { HeaderPaymentMethodFragment$key } from '@//:artifacts/HeaderPaymentMethodFragment.graphql'
import { ForwardedRef, useContext } from 'react'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useQueryParam } from 'use-query-params'
import { Flex } from '@chakra-ui/react'
import Icon from '../../../../../../../../../../../../modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { ArrowButtonLeft } from '@//:assets/icons'
import { t } from '@lingui/macro'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'

interface Props {
  query: HeaderPaymentMethodFragment$key
  closeButtonRef: ForwardedRef<any>
}

const Fragment = graphql`
  fragment HeaderPaymentMethodFragment on Account {
    savedPaymentMethods {
      edges {
        node {
          __typename
        }
      }
    }
  }
`

export default function HeaderPaymentMethod (props: Props): JSX.Element {
  const {
    query,
    closeButtonRef
  } = props

  const data = useFragment(Fragment, query)

  const [, setSupportParam] = useQueryParam<boolean | null | undefined>('support')

  const { i18n } = useLingui()

  const {
    skipToStep,
    currentStep
  } = useContext(FlowContext)

  const hasSavedPayments = data.savedPaymentMethods != null && data.savedPaymentMethods.edges.length > 0

  const canGoBack = hasSavedPayments && currentStep !== 'select_payment'

  const onClose = (): void => {
    setSupportParam(undefined)
  }

  const onGoBack = (): void => {
    if (currentStep !== 'select_payment') {
      skipToStep('select_payment')
    }
  }

  return (
    <Flex justify='space-between'>
      {canGoBack
        ? (
          <IconButton
            icon={<Icon icon={ArrowButtonLeft} w={4} h={4} fill='gray.100' />}
            variant='ghost'
            onClick={onGoBack}
            size='md'
            aria-label={i18n._(t`Back`)}
          />
          )
        : (
          <Flex />
          )}
      <CloseButton color='gray.200' ref={closeButtonRef} onClick={onClose} variant='ghost' size='md' />
    </Flex>
  )
}
