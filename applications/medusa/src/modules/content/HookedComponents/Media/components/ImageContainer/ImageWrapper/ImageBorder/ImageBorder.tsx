import { Flex } from '@chakra-ui/react'

interface Props {
  color: string
}

export default function ImageBorder (props: Props): JSX.Element {
  const { color } = props

  const iconBorder = {
    boxShadow: `inset 0 0 0 3px ${color}`
  }

  return (
    <Flex w='100%' h='100%' borderRadius='inherit' position='absolute' {...iconBorder} />
  )
}
