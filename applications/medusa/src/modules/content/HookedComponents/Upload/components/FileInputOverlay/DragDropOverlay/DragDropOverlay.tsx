import { Box, Flex, Heading, keyframes, Stack } from '@chakra-ui/react'
import { Icon } from '../../../../../PageLayout'
import { DownloadArrow, WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  isOpen: boolean
  isDisabled?: boolean
}

export default function DragDropOverlay ({
  isOpen,
  isDisabled = false
}: Props): JSX.Element {
  const animateBounce = keyframes`
    0%   { transform: scale(1,1) translateY(0) }
    10%  { transform: scale(1.1,.9) translateY(0) }
    40%  { transform: scale(.9,1.1) translateY(-30px) }
    70%, 100%  { transform: scale(1,1) translateY(0) }
  `

  const animateGrow = keyframes`
    0% { transform: scale(.25, .7) }
    0% { opacity: 0.5 }
    70%, 100% { transform: scale(1, 1) }
    70%, 100% { opacity: 0 }
  `

  const DisplayMessage = (): JSX.Element => {
    if (isDisabled) {
      return (
        <Stack align='center' justify='center' spacing={4}>
          <Icon icon={WarningTriangle} w={8} h={8} fill='orange.300' />
          <Heading textAlign='center' fontSize='md' color='orange.300'>
            <Trans>
              Cannot drop while uploading
            </Trans>
          </Heading>
        </Stack>
      )
    }

    return (
      <>
        <Box
          zIndex={1}
          animation={`${animateBounce} cubic-bezier(0.280, 0.840, 0.420, 1) 2s infinite`}
        >
          <Icon icon={DownloadArrow} w={16} h={16} fill='gray.00' />
        </Box>
        <Box
          animation={`${animateGrow} cubic-bezier(0.280, 0.840, 0.420, 1) 2s infinite`}
          transform='auto'
          bg='gray.50'
          w={100}
          h={15}
          borderRadius='100%'
          translateY={-1}
        />
      </>
    )
  }

  return (
    <>
      <Flex
        borderRadius='inherit'
        w='100%'
        h='100%'
        position='absolute'
        align='center'
        justify='center'
        backdropFilter='auto'
        backdropBlur='3px'
        filter='blur(5px)'
        bg='dimmers.500'
        display={isOpen ? 'flex' : 'none'}
      />
      <Flex
        borderRadius='inherit'
        w='100%'
        h='100%'
        position='absolute'
        direction='column'
        align='center'
        justify='center'
        display={isOpen ? 'flex' : 'none'}
        overflow='hidden'
      >
        <DisplayMessage />
      </Flex>
    </>
  )
}
