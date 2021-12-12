import { Box } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

export default function PageContents ({ children }: Props): JSX.Element {
  return (
    <Box
      className='page-contents'
      w='100%'
    >
      {children}
    </Box>
  )
}
