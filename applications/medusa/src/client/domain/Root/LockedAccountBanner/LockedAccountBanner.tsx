import { Alert, AlertDescription, AlertIcon, Flex } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import { LockedAccountBannerFragment$key } from '@//:artifacts/LockedAccountBannerFragment.graphql'
import { useHistoryDisclosure } from '@//:modules/hooks'
import LockedAccountModal from './LockedAccountModal/LockedAccountModal'
import { Trans } from '@lingui/macro'

interface Props {
  queryRef: LockedAccountBannerFragment$key | null
}

const LockedAccountBannerGQL = graphql`
  fragment LockedAccountBannerFragment on Account {
    lock {
      ...LockedAccountModalFragment
    }
  }
`

export default function LockedAccountBanner ({ queryRef }: Props): JSX.Element | null {
  const data = useFragment(LockedAccountBannerGQL, queryRef)

  const {
    isOpen,
    onToggle,
    onClose
  } = useHistoryDisclosure()

  if (data?.lock == null) {
    return null
  }

  return (
    <Alert
      h={12}
      borderRadius='none'
      border='none'
      status='warning'
      zIndex='docked'
      position='fixed'
      bottom={0}
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
              Your account is currently locked
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
            View Details
          </Trans>
        </Button>
        <LockedAccountModal
          queryRef={data.lock}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
    </Alert>
  )
}
