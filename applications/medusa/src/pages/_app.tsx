import { ChakraProvider } from '@chakra-ui/react'

import theme from '../client/theme'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { ReactNode, Suspense } from 'react'
import { createClientEnvironment, createServerEnvironment } from './environment'

const App = ({
  Component,
  props,
  environment
}: any): ReactNode => {
  return (
    <ChakraProvider theme={theme}>
      <RelayEnvironmentProvider environment={environment}>
        <Suspense fallback='loading...'>
          <Component {...props} />
        </Suspense>
      </RelayEnvironmentProvider>
    </ChakraProvider>
  )
}

App.getInitialProps = async context => {
  let environment
  if (typeof window === 'undefined') {
    environment = createServerEnvironment(context.ctx.req, context.ctx.res)
  } else {
    environment = createClientEnvironment()
  }

  if (context.Component.getInitialProps != null) {
    const componentProps = await context.Component.getInitialProps({
      ...context,
      environment
    })

    return {
      ...componentProps,
      environment
    }
  }

  return {
    environment
  }
}

export default App
