import { Flex, FlexProps } from '@chakra-ui/react'
import { LargeBackgroundBox } from '../../PageLayout'
import { ReactNode } from 'react'

interface Props extends FlexProps {
  children: ReactNode
}

export default function PostPlaceholder ({
  children,
  ...rest
}: Props): JSX.Element {
  return (
    <LargeBackgroundBox>
      <Flex
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='500px'
        {...rest}
      >
        {children}
      </Flex>
    </LargeBackgroundBox>
  )
}
