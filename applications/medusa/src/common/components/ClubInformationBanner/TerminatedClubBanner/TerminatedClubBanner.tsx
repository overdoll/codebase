import { Box, Flex } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { graphql, useFragment } from 'react-relay/hooks'
import { TerminatedClubBannerFragment$key } from '@//:artifacts/TerminatedClubBannerFragment.graphql'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'

interface Props {
  query: TerminatedClubBannerFragment$key
}

const Fragment = graphql`
  fragment TerminatedClubBannerFragment on Club {
    termination {
      account {
        username
      }
    }
  }
`

export default function TerminatedClubBanner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

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
                Club was terminated by {data?.termination?.account?.username}
              </Trans>
            </AlertDescription>
          </Flex>
          <Button
            size='sm'
            colorScheme='orange'
            variant='solid'
          >
            <Trans>
              Details
            </Trans>
          </Button>
        </Flex>
      </Alert>
    </Box>
  )
}
