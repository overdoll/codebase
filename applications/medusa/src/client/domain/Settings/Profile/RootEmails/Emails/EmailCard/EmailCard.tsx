import { Badge, Box, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import type { EmailCardFragment$key } from '@//:artifacts/EmailCardFragment.graphql'
import MakePrimary from './MakePrimary/MakePrimary'
import Delete from './Delete/Delete'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { SmallBackgroundBox, SmallMenuButton } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  emails: EmailCardFragment$key
  connectionID: string
}

const EmailCardFragmentGQL = graphql`
  fragment EmailCardFragment on AccountEmail {
    ...DeleteFragment
    ...MakePrimaryFragment
    email
    status
  }
`

export default function EmailCard ({
  emails,
  connectionID
}: Props): JSX.Element {
  const data = useFragment(EmailCardFragmentGQL, emails)

  return (
    <SmallBackgroundBox>
      <Flex justify='space-between' w='100%'>
        <Stack spacing={1}>
          <Flex mr={2} wordBreak='break-all'>
            <Text color='gray.00' fontSize='sm'>
              {data.email}
            </Text>
          </Flex>
          <Box>
            {data.status === 'PRIMARY' &&
              <Text color='gray.200' fontSize='sm'>
                <Trans>
                  Used to log into your account
                </Trans>
              </Text>}
            {data.status === 'CONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>
                <Trans>
                  Can be set as a Primary email
                </Trans>
              </Text>}
            {data.status === 'UNCONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>
                <Trans>
                  Needs to be confirmed through email link
                </Trans>
              </Text>}
          </Box>
        </Stack>
        <Flex direction='column' align='flex-end'>
          <Badge
            fontSize='xs'
            colorScheme={
              data.status === 'PRIMARY'
                ? 'green'
                : data.status === 'CONFIRMED'
                  ? 'purple'
                  : 'orange'
            }
          >
            {data.status}
          </Badge>
          <Spacer />
          {data.status === 'CONFIRMED' &&
            <SmallMenuButton>
              <MakePrimary query={data} />
              <Delete query={data} connectionID={connectionID} />
            </SmallMenuButton>}
        </Flex>
      </Flex>
    </SmallBackgroundBox>
  )
}
