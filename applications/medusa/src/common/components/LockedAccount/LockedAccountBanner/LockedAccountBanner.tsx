import { Flex, HStack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import { useHistoryDisclosure } from '@//:modules/hooks'
import LockedAccountModal from '../LockedAccountModal/LockedAccountModal'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import { LockedAccountBannerFragment$key } from '@//:artifacts/LockedAccountBannerFragment.graphql'

interface Props {
  query: LockedAccountBannerFragment$key | null
}

const Fragment = graphql`
  fragment LockedAccountBannerFragment on Account {
    lock {
      __typename
    }
    ...LockedAccountModalFragment
  }
`

export default function LockedAccountBanner ({ query }: Props): JSX.Element | null {
  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onToggle,
    onClose
  } = useHistoryDisclosure()

  if (data?.lock == null) return null

  return (
    <Alert
      status='warning'
      mb={2}
    >
      <Flex
        w='100%'
        align='center'
        justify='space-between'
      >
        <HStack spacing={0} align='center'>
          <AlertIcon />
          <AlertDescription>
            <Trans>
              Your account is currently locked. Functionality is limited.
            </Trans>
          </AlertDescription>
        </HStack>
        <Button
          size='sm'
          colorScheme='orange'
          variant='solid'
          onClick={onToggle}
        >
          <Trans>
            View Details
          </Trans>
        </Button>
        <LockedAccountModal
          queryRef={data}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
    </Alert>
  )
}
