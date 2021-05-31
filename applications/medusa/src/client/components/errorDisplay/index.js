import { Alert, AlertDescription, AlertTitle, Center, Flex, AlertIcon } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

// This component displays an error page when an error occurs on the server
// TODO: make this page look nice, since users may sometimes see this during downtime or crashes
// TODO: also need to report the error to sentry
export default function ErrorDisplay ({ error }) {
  const debug = process.env.APP_DEBUG === 'true'
  return (
    <>
      <Helmet title='error' />
      <Flex h='100%'>
        <Center w='100%'>
          <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            <AlertIcon boxSize='40px' mr={0} />
            {debug
              ? (
                <>
                  <AlertTitle mt={4} mb={1} fontSize='lg'>
                    {error.message}
                  </AlertTitle>
                  <AlertDescription>
                    {error.stack}
                  </AlertDescription>
                </>
                )
              : 'error'}
          </Alert>
        </Center>
      </Flex>
    </>
  )
}
