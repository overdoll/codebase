/**
 * @flow
 */
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type LockedQuery from '@//:artifacts/LockedQuery.graphql'
import { useTranslation } from 'react-i18next'
import CommunityGuidelines from '../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import { Alert, AlertDescription, Text, Heading, Stack, Box } from '@chakra-ui/react'

type Props = {
  query: LockedQuery
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
export default function Locked (props: Props): Node {
  const queryData = usePreloadedQuery<LockedQuery>(
    LockedQueryGQL,
    props.query
  )

  const [t] = useTranslation('locked')
  // TODO add avatar in "jail"
  // TODO button for unlocking account is disabled and has countdown timer
  // TODO to unlock account, you have to check "I promise to be better" checkbox

  return (
    <>
      <Stack spacing={4}>
        <Heading fontSize='4xl' color='gray.00'>{t('title', { time: queryData?.viewer.lock?.expires })}</Heading>
        <Text mb={2}>{t('description')}</Text>
        <Text>{t('reason')}</Text>
        <Alert mt={4} mb={4} status='info'>
          <AlertDescription>
            {queryData?.viewer.lock?.reason}
          </AlertDescription>
        </Alert>
        <Box>
          <Text>{t('review')}</Text>
          <CommunityGuidelines />
        </Box>
        <Text>{t('timer', { time: queryData?.viewer.lock?.expires, date: queryData?.viewer.lock?.expires })}</Text>
      </Stack>
    </>
  )
}
