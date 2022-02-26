import { graphql, useMutation } from 'react-relay/hooks'
import Button from '@//:modules/form/Button/Button'
import {
  ButtonGroup,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { TestPaymentFlowMutation } from '@//:artifacts/TestPaymentFlowMutation.graphql'
import { useEffect, useRef, useState } from 'react'

const TestPaymentFlowGQL = graphql`
  mutation TestPaymentFlowMutation($input: GenerateCCBillClubSupporterPaymentLinkInput!) {
    generateCCBillClubSupporterPaymentLink(input: $input) {
      paymentLink
    }
  }
`

let timer: any = null

// poll every 500ms for a window close
const pollCloseMS = 500

// SAMPLE PAYMENT FLOW WITH WINDOW.OPEN
export default function TestPaymentFlow (): JSX.Element {
  const [commit, isInFlight] = useMutation<TestPaymentFlowMutation>(TestPaymentFlowGQL)
  const [origin, updateOrigin] = useState('')
  const windowReference = useRef<Window | null>(null)
  const [transactionToken, updateTransactionToken] = useState('')

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  // this useEffect focuses on listening to when the window was closed, so you can respond on the front-end appropriately
  useEffect(() => {
    if (windowReference.current == null) return

    if (timer != null) {
      clearInterval(timer)
    }

    timer = setInterval(() => {
      if (windowReference?.current?.closed === true) {
        console.log('window closed!')
        // close modal in response
        onClose()
        clearInterval(timer)
      }
    }, pollCloseMS)
  }, [windowReference.current])

  // this useEffect registers listening to messages from the child window
  useEffect(() => {
    window.addEventListener('message', messageEvent)

    // cleanup on unmount
    return () => {
      window.removeEventListener('message', messageEvent)
    }
  }, [origin])

  // grab the actual origin of our link
  const updateOriginFormatted = (link: string): void => {
    console.log(link)
    const url = new URL(link)
    console.log(url.origin)
    updateOrigin(url.origin)
  }

  const messageEvent = (event): void => {
    // we check the origin to make sure we expect calls only from our domains
    if (event.origin !== origin) {
      return
    }

    // listen for overdoll ccbill flexform event only
    if (event.data.source !== 'overdoll-ccbill-flexforms-payment-flow') {
      return
    }

    // our new token
    updateTransactionToken(event.data.token)
    closeWindow()
  }

  const focusWindow = (): void => {
    if (windowReference.current == null) return
    windowReference.current?.focus()
  }

  const closeWindow = (): void => {
    if (windowReference.current == null) return
    windowReference.current?.close()
  }

  // an example of how NOT to use window.open - window.open cannot be called from anything that's not a response to a mouse click, or else firefox/chrome will block the popup
  // useEffect(() => {
  //   window.open('https://google.com', '_blank', 'width=600,height=800')
  // }, [])

  // window.open can only be called in a mouse click function, or else it is blocked
  const onClick = (): void => {
    commit({
      variables: {
        input: {
          clubId: 'Q2x1YjoyNVRYamNDQzlzdUkwQTJyaExrd3JuVVIxd08=',
          savePaymentDetailsForLater: true,
          currency: 'USD'
        }
      },
      onCompleted (payload) {
        const paymentLink = payload?.generateCCBillClubSupporterPaymentLink?.paymentLink as string

        // we want to inform our user about this new payment, so we open a window
        onOpen()

        // https://www.w3schools.com/jsref/met_win_open.asp - full spec of window.open
        windowReference.current = window.open(paymentLink, '_blank', 'width=600,height=800')
        updateOriginFormatted(paymentLink)
      }
    })
  }

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            complete payment
          </ModalHeader>
          <ModalBody mb={4}>
            please complete payment on the new window

            <ButtonGroup>
              <Button
                mt={5}
                onClick={focusWindow}
              >
                show me
              </Button>
              <Button
                mt={5}
                onClick={closeWindow}
                textColor='primary.500'
              >
                cancel payment
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Center w='100%' h='300px'>
        {transactionToken !== ''
          ? (
            <div>
              transaction finished
            </div>
            )
          : (
            <Button disabled={isInFlight} onClick={onClick}>pay with ccbill</Button>
            )}
      </Center>
    </>
  )
}
