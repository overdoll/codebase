/**
 * @flow
 */
import { graphql, useFragment } from 'react-relay/hooks';
import type { MultiFactorFragment$key } from '@//:artifacts/MultiFactorFragment.graphql';
import TotpAuthentication from './TotpAuthentication/TotpAuthentication';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from '@//:modules/content/PageLayout';
import { Alert, AlertDescription, AlertIcon, Collapse, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import Button from '@//:modules/form/Button';
import RecoveryCode from './RecoveryCode/RecoveryCode';
import { useTranslation } from 'react-i18next';

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

  const [t] = useTranslation('auth')

  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Helmet title='multifactor authentication' />
      <PageWrapper>
        <Stack spacing={3}>
          {data.multiFactor.totp && <TotpAuthentication />}
          <Flex justify='center'>
            <Button onClick={onToggle} size='md' variant='link'>{t('multi_factor.recovery.button')}</Button>
          </Flex>
          <Collapse animateOpacity in={isOpen}>
            <Stack spacing={3}>
              <Alert status='info'>
                <AlertIcon />
                <AlertDescription align='center' lineHeight={5} fontSize='sm'>
                  {t('multi_factor.recovery.alert.description')}
                </AlertDescription>
              </Alert>
              <RecoveryCode />
            </Stack>
          </Collapse>
        </Stack>
      </PageWrapper>
    </>
  )
}
