import { HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Button from '../../../../form/Button/Button'
import LinkButton from '../../../ThemeComponents/LinkButton/LinkButton'
import { useRouter } from 'next/router'

export default function NotFoundFooter (): JSX.Element {
  const router = useRouter()

  return (
    <HStack w='100%' justify='center' align='center' spacing={4}>
      <Button size='lg' onClick={() => router.back()}>
        <Trans>
          Go Back
        </Trans>
      </Button>
      <LinkButton
        colorScheme='primary'
        size='lg'
        href='/'
      >
        <Trans>
          Home
        </Trans>
      </LinkButton>
    </HStack>
  )
}
