/**
 * @flow
 */
import { graphql, useMutation, useFragment } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import {
  Center,
  Flex,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Text,
  Wrap,
  WrapItem,
  Fade,
  Spinner,
  SlideFade,
  Collapse,
  Box,
  useDisclosure,
  useBreakpointValue, useToast, AlertIcon, AlertDescription, Alert
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { useTranslation } from 'react-i18next'
import Button from '@//:modules/form/Button'
import RecoveryCodeForm from './RecoveryCodeForm/RecoveryCodeForm'

const SubmitTotpMutationGQL = graphql`
  mutation TotpAuthenticationMutation($input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput!) {
    grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(input: $input) {
      validation
    }
  }
`

export default function TotpAuthentication (): Node {
  const [submitTotp, isSubmittingTotp] = useMutation(SubmitTotpMutationGQL)

  const [t] = useTranslation('auth')

  const { isOpen, onToggle } = useDisclosure()

  const breakPoint = useBreakpointValue({ base: 'md', sm: 'lg' })

  const notify = useToast()

  const onSubmitTotp = (code) => {
    submitTotp({
      variables: {
        input: {
          code: code
        }
      },
      onCompleted (data) {
        if (data?.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp?.validation) {
          notify({
            status: 'error',
            title: data.grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp.validation,
            isClosable: true
          })
          return
        }
        console.log('success')
      },
      onError (data) {
        console.log(data)
        notify({
          status: 'error',
          title: t('multi_factor.submit.form.query.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <Helmet title='totp authentication' />
      <Center mt={40}>
        <Flex w={['sm', 'md']} ml={[1, 0]} mr={[1, 0]} direction='column' align='center'>
          <Icon
            icon={SignBadgeCircle}
            w={100}
            h={100}
            color='primary.500'
            ml='auto'
            mr='auto'
            mb={8}
          />
          <Heading align='center' fontSize='xl' color='gray.00'>
            {t('multi_factor.header')}
          </Heading>
          <Text mb={6} align='center' fontSize='sm' color='gray.200'>
            {t('multi_factor.subheader')}
          </Text>
          <Flex mb={5} position='relative' align='center'>
            <form>
              <Wrap>
                <PinInput
                  onComplete={(value) => { onSubmitTotp(value) }} isDisabled={isSubmittingTotp}
                  size={breakPoint || 'md'} otp
                >
                  <PinInputField filter={isSubmittingTotp && 'blur(1px)'} />
                  <PinInputField filter={isSubmittingTotp && 'blur(1px)'} />
                  <PinInputField filter={isSubmittingTotp && 'blur(1px)'} />
                  <PinInputField filter={isSubmittingTotp && 'blur(1px)'} />
                  <PinInputField filter={isSubmittingTotp && 'blur(1px)'} />
                  <PinInputField filter={isSubmittingTotp && 'blur(1px)'} />
                </PinInput>
              </Wrap>
            </form>
            <Flex
              position='absolute'
              w='100%' h='100%'
              pointerEvents={isSubmittingTotp ? 'initial' : 'none'}
            >
              <Fade in={isSubmittingTotp}>
                <Flex
                  p={4}
                  w='100%' h='100%'
                  position='absolute'
                  align='center'
                  justify='center'
                  direction='row'
                >
                  <Text mr={2} color='gray.00'>
                    {t('multi_factor.submit.form.submitting')}
                  </Text>
                  <Spinner color='gray.00' size='sm' />
                </Flex>
              </Fade>
            </Flex>
          </Flex>
          <Button onClick={onToggle} size='md' variant='link'>{t('multi_factor.recovery.button')}</Button>
          <Collapse animateOpacity in={isOpen}>
            <Box mt={3}>
              <Alert mb={3} status='info'>
                <AlertIcon />
                <AlertDescription align='center' lineHeight={5} fontSize='sm'>
                  {t('multi_factor.recovery.alert.description')}
                </AlertDescription>
              </Alert>
              <RecoveryCodeForm />
            </Box>
          </Collapse>
        </Flex>
      </Center>
    </>
  )
}
