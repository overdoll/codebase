import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { LockedQuery } from '@//:artifacts/LockedQuery.graphql'
import { useTranslation } from 'react-i18next'
import CommunityGuidelines from '../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import { Alert, AlertDescription, Box, Heading, Stack, Text } from '@chakra-ui/react'

interface Props {
  query: PreloadedQuery<LockedQuery> | null | undefined
}

const LockedQueryGQL = graphql`
  query LockedQuery {
    viewer {
      avatar
      lock {
        reason
        expires
      }
    }
  }
`
export default function Locked ({ query }: Props): JSX.Element | null {
  const data = usePreloadedQuery<LockedQuery>(
    LockedQueryGQL,
    query as PreloadedQuery<LockedQuery>
  )

  const [t] = useTranslation('locked')
  // TODO add avatar in "jail"
  // TODO button for unlocking account is disabled and has countdown timer
  // TODO to unlock account, you have to check "I promise to be better" checkbox

  if (data?.viewer?.lock == null) {
    return null
  }

  return (
    <>
      <Stack spacing={4}>
        <Heading
          fontSize='4xl'
          color='gray.00'
        >
          {t('title', { time: data.viewer.lock.expires })}
        </Heading>
        <Text mb={2}>{t('description')}</Text>
        <Text>{t('reason')}</Text>
        <Alert
          mt={4}
          mb={4}
          status='info'
        >
          <AlertDescription>
            {data.viewer.lock.reason}
          </AlertDescription>
        </Alert>
        <Box>
          <Text>{t('review')}</Text>
          <CommunityGuidelines />
        </Box>
        <Text>{t('timer', {
          time: data.viewer.lock.expires,
          date: data.viewer.lock.expires
        })}
        </Text>
      </Stack>
    </>
  )
}
