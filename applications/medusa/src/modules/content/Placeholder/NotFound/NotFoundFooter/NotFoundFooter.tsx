import { HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Button from '../../../../form/Button/Button'
import { Link, useHistory } from '../../../../routing'

export default function NotFoundFooter (): JSX.Element {
  const history = useHistory()

  return (
    <HStack w='100%' justify='center' align='center' spacing={4}>
      <Button size='lg' onClick={() => history.goBack()}>
        <Trans>
          Go Back
        </Trans>
      </Button>
      <Link to='/'>
        <Button colorScheme='primary' size='lg'>
          <Trans>
            Home
          </Trans>
        </Button>
      </Link>
    </HStack>
  )
}
