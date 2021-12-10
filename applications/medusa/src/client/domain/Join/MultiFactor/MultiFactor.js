/**
 * @flow
 */
import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorFragment$key } from '@//:artifacts/MultiFactorFragment.graphql'
import Totp from './Totp/Totp'
import RecoveryCode from './RecoveryCode/RecoveryCode'
import { Alert, AlertDescription, AlertIcon, Box, Collapse, Flex, useDisclosure } from '@chakra-ui/react'
import { PageWrapper } from '../../../components/PageLayout'
import Button from '@//:modules/form/Button'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const MultiFactorFragmentGQL = graphql`
  fragment MultiFactorFragment on AuthenticationToken {
    accountStatus {
      multiFactor {
        totp
      }
    }
  }
`

type Props = {
  queryRef: MultiFactorFragment$key,
}

export default function MultiFactor ({ queryRef }: Props): Node {
  const data = useFragment(MultiFactorFragmentGQL, queryRef)

  const {
    isOpen,
    onToggle
  } = useDisclosure()

  const [t] = useTranslation('auth')

  return (
    <>
      <Helmet title='mfa authentication' />
      <PageWrapper>
        {data.multiFactor.totp && <Totp queryRef={queryRef} />}
        <Flex justify='center'>
          <Button onClick={onToggle} size='md' variant='link'>{t('multi_factor.recovery.button')}</Button>
        </Flex>
        <Collapse animateOpacity in={isOpen}>
          <Box mt={5}>
            <Alert mb={3} status='info'>
              <AlertIcon />
              <AlertDescription align='center' lineHeight={5} fontSize='sm'>
                {t('multi_factor.recovery.alert.description')}
              </AlertDescription>
            </Alert>
            <RecoveryCode queryRef={queryRef} />
          </Box>
        </Collapse>
      </PageWrapper>
    </>
  )
}
