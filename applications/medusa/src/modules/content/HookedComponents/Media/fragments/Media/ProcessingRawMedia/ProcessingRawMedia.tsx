import { graphql } from 'react-relay'
import type { ProcessingRawMediaFragment$key } from '@//:artifacts/ProcessingRawMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Center, Heading, Progress } from '@chakra-ui/react'
import { Icon } from '../../../../../PageLayout'
import { TimeHourGlass, WarningTriangle } from '@//:assets/icons'

const Fragment = graphql`
  fragment ProcessingRawMediaFragment on RawMedia {
    failed
    progress {
      progress
      state
    }
    originalFileName
  }
`

interface Props {
  rawMediaQuery: ProcessingRawMediaFragment$key
}

export default function ProcessingRawMedia (props: Props): JSX.Element {
  const {
    rawMediaQuery
  } = props

  const data = useFragment(Fragment, rawMediaQuery)

  if (data.failed) {
    return (
      <Center p={2}>
        <Icon icon={WarningTriangle} fill='gray.500' w={6} h={6} />
        <Heading mt={2} textAlign='center' noOfLines={2} fontSize='sm' color='gray.200'>
          {data.originalFileName}
        </Heading>
      </Center>
    )
  }

  if (data.progress != null) {
    if (data.progress.state === 'WAITING') {
      return (
        <Center p={2}>
          <Progress
            size='md'
            colorScheme='gray'
            w='100%'
            hasStripe
            isAnimated
            value={100}
          />
          <Heading mt={2} textAlign='center' noOfLines={2} fontSize='sm' color='gray.200'>
            {data.originalFileName}
          </Heading>
        </Center>
      )
    } else if (data.progress.state === 'STARTED') {
      return (
        <Center p={2}>
          <Progress
            size='md'
            colorScheme='teal'
            w='100%'
            value={data.progress.progress === 0 ? 2 : data.progress.progress}
          />
          <Heading mt={2} textAlign='center' noOfLines={2} fontSize='sm' color='gray.200'>
            {data.originalFileName}
          </Heading>
        </Center>
      )
    } else if (data.progress.state === 'FINALIZING') {
      return (
        <Center p={2}>
          <Progress
            size='md'
            colorScheme='green'
            w='100%'
            hasStripe
            isAnimated
            value={100}
          />
          <Heading mt={2} textAlign='center' noOfLines={2} fontSize='sm' color='gray.200'>
            {data.originalFileName}
          </Heading>
        </Center>
      )
    } else {
      return <></>
    }
  }

  return (
    <Center p={2}>
      <Icon icon={TimeHourGlass} fill='gray.500' w={6} h={6} />
      <Heading mt={2} textAlign='center' noOfLines={2} fontSize='sm' color='gray.200'>
        {data.originalFileName}
      </Heading>
    </Center>
  )
}
