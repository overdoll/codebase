import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { CONTAIN_PROPS, COVER_PROPS } from '../../../../constants'

export interface ControlContainCoverImageProps {
  isCovered?: boolean
}

interface Props extends ControlContainCoverImageProps {
  children: ReactNode
}

export default function ControlCoverContainImage (props: Props): JSX.Element {
  const {
    children,
    isCovered
  } = props

  return (
    <Flex
      borderRadius='inherit'
      position='relative'
      {...(isCovered === true ? COVER_PROPS : CONTAIN_PROPS)}
    >
      {children}
    </Flex>
  )
}
