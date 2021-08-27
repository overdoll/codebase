/**
 * @flow
 */

import type { MultiFactorTotpSetupQuery } from '@//:artifacts/MultiFactorTotpSetupQuery.graphql'
import { graphql, usePreloadedQuery, useMutation } from 'react-relay/hooks'
import { useState, useEffect } from 'react'
import type { MultiFactorTotpFlowMutation } from '@//:artifacts/MultiFactorTotpFlowMutation.graphql'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Alert, AlertDescription, AlertIcon, Flex } from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'

type Props = {}

const MultiFactorTotpFlowMutationGQL = graphql`
  mutation MultiFactorTotpFlowMutation {
    generateAccountMultiFactorTotp {
      multiFactorTotp {
        secret
        imageSrc
      }
    }
  }
`

export default function MultiFactorTotpFlow (props: Props): Node {
  const [generateTotp, isGeneratingTotp] = useMutation<MultiFactorTotpFlowMutation>(
    MultiFactorTotpFlowMutationGQL
  )

  const [t] = useTranslation('configure')

  const generateTotpSetup = () => {
    generateTotp({
      onCompleted (data) {
        setTotp(data)
      },
      onError (data) {
        setHasError(true)
        console.log(data)
      }
    })
  }

  useEffect(() => {
    generateTotpSetup()
  }, [])

  const [totp, setTotp] = useState(null)

  const [hasError, setHasError] = useState(false)

  console.log(totp)

  if (hasError) {
    return (
      <>
        <Flex direction='column' align='center'>
          <Alert mb={3} status='warning'>
            <AlertIcon />
            <AlertDescription>
              {t('totp.empty.alert')}
            </AlertDescription>
          </Alert>
          <Link to='/configure/multi_factor/recovery_codes'>
            <Button
              colorScheme='gray' size='lg'
            >
              {t('recovery_codes.empty.button')}
            </Button>
          </Link>
        </Flex>
      </>
    )
  }

  if (isGeneratingTotp && !totp && !hasError) {
    return <SkeletonStack />
  }

  return (
    <Flex>
      totp flow
    </Flex>
  )
}
