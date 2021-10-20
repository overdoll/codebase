/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import type { State } from '@//:types/upload'
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Progress,
  Heading,
  Text,
  CloseButton
} from '@chakra-ui/react'
import { STEPS } from '../../constants/constants'
import { useTranslation } from 'react-i18next'

type Props = {
  state: State,
}

export default function ProgressIndicator ({ state }: Props): Node {
  const [t] = useTranslation('upload')

  const RenderText = () => {
    switch (state.step) {
      case STEPS.ARRANGE:

        return (
          <>
            <Heading>
              step 1
            </Heading>
            <Text>
              step 2
            </Text>
          </>
        )

      case STEPS.AUDIENCE:

        return <></>

      case STEPS.BRAND:

        return <></>

      case STEPS.CATEGORY:

        return <></>

      case STEPS.CHARACTER:

        return <></>

      case STEPS.REVIEW:

        return <></>

      case STEPS.SUBMIT:

        return <></>

      default:
        return <></>
    }

    return (
      <>
        <Heading>
          step 1
        </Heading>
        <Text>
          step 2
        </Text>
      </>
    )
  }

  return (
    <Flex justify='space-between'>
      <Flex>
        <CircularProgress capIsRound size='72px' color='primary.500' thickness='6px' value={20}>
          <CircularProgressLabel>20%</CircularProgressLabel>
        </CircularProgress>
        <Box ml={2}>
          <RenderText />
        </Box>
      </Flex>
      <CloseButton />
    </Flex>
  )
}
