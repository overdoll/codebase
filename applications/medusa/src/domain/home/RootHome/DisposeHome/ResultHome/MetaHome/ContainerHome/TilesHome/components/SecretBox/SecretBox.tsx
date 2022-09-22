import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'

export default function SecretBox (): JSX.Element {
  const router = useRouter()

  return (
    <Box
      borderRadius='full'
      onClick={async () => await router.push('/secret/time-is-an-illusion')}
      w='3px'
      h='3px'
      bg='#fff'
      opacity={0.05}
    />
  )
}
