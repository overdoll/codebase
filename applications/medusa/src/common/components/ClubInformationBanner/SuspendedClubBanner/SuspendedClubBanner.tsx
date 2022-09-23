import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import { SuspendedClubBannerFragment$key } from '@//:artifacts/SuspendedClubBannerFragment.graphql'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import SuspendedClubModal from './SuspendedClubModal/SuspendedClubModal'

interface Props {
  query: SuspendedClubBannerFragment$key
}

const Fragment = graphql`
  fragment SuspendedClubBannerFragment on Club {
    ...SuspendedClubModalFragment
  }
`

export default function SuspendedClubBanner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onToggle,
    onClose
  } = useDisclosure()

  return (
    <Box>
      <Alert
        status='warning'
      >
        <Flex
          w='100%'
          align='center'
          justify='space-between'
        >
          <Flex>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                Club is currently locked and access is limited
              </Trans>
            </AlertDescription>
          </Flex>
          <Button
            size='sm'
            colorScheme='orange'
            variant='solid'
            onClick={onToggle}
          >
            <Trans>
              Details
            </Trans>
          </Button>
          <SuspendedClubModal query={data} isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Alert>
    </Box>
  )
}
