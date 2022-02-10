import { HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Button from '../../../../form/Button/Button'
import { useHistory } from '../../../../routing'
import LinkButton from '../../../ThemeComponents/LinkButton/LinkButton'

export default function NotFoundFooter (): JSX.Element {
  const history = useHistory()

  return (
    <HStack w='100%' justify='center' align='center' spacing={4}>
      <Button size='lg' onClick={() => history.goBack()}>
        <Trans>
          Go Back
        </Trans>
      </Button>
      <LinkButton
        colorScheme='primary'
        size='lg'
        to='/'
      >
        <Trans>
          Home
        </Trans>
      </LinkButton>
    </HStack>
  )
}
