/**
 * @flow
 */
import { Center, Code, Flex } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import type { Node } from 'react'

type Props = {
  error: Error
}

// This component displays an error page when an error occurs on the server
// TODO: make this page look nice, since users may sometimes see this during downtime or crashes
// TODO: also need to report the error to sentry
export default function ErrorDisplay ({ error }: Props): Node {
  const debug = process.env.APP_DEBUG === 'true'

  if (debug) console.log(error)

  return (
    <>
      <Helmet title='error' />
      <Flex h='100%'>
        <Center w='100%'>
          {debug
            ? (
              <Code colorScheme='red'>
                {error.stack}
              </Code>
              )
            : 'error'}
        </Center>
      </Flex>
    </>
  )
}
