import { Box, Flex } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { useHistoryDisclosure } from '@//:modules/hooks'
import LockedAccountModal from '../LockedAccountModal/LockedAccountModal'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import { LockedAccountBannerQuery } from '@//:artifacts/LockedAccountBannerQuery.graphql'

const Query = graphql`
  query LockedAccountBannerQuery {
    viewer {
      lock {
        __typename
      }
      ...LockedAccountModalFragment
    }
  }
`

export default function LockedAccountBanner (): JSX.Element | null {
  const queryData = useLazyLoadQuery<LockedAccountBannerQuery>(Query, {})

  const {
    isOpen,
    onToggle,
    onClose
  } = useHistoryDisclosure()

  if (queryData?.viewer?.lock == null) return null

  return (
    <Box zIndex='docked' h={12} top={0} color='gray.900'>
      <Alert
        borderRadius='none'
        border='none'
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
                Your account is currently locked. Functionality is limited.
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
            queryRef={queryData.viewer}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Flex>
      </Alert>
    </Box>
  )
}
