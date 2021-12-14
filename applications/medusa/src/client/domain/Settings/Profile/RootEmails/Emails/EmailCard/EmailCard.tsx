import { Badge, Box, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { EmailCardFragment$key } from '@//:artifacts/EmailCardFragment.graphql'
import MakePrimary from './MakePrimary/MakePrimary'
import Delete from './Delete/Delete'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { SmallBackgroundBox, SmallMenuButton } from '@//:modules/content/PageLayout'

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

  const [t] = useTranslation('settings')

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
              <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint1')}</Text>}
            {data.status === 'CONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>{t('profile.email.confirmed.hint1')}</Text>}
            {data.status === 'UNCONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>{t('profile.email.unconfirmed.hint1')}</Text>}
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
