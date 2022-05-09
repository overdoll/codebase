import { Flex, HStack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import { DeletingAccountBannerFragment$key } from '@//:artifacts/DeletingAccountBannerFragment.graphql'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import format from 'date-fns/format'
import { dateFormatWithTime } from '@//:modules/constants/format'

interface Props {
  query: DeletingAccountBannerFragment$key
}

const Fragment = graphql`
  fragment DeletingAccountBannerFragment on Account {
    deleting @required(action: THROW) {
      scheduledDeletion
    }
  }
`

export default function DeletingAccountBanner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)
  const scheduledDeletion = format(new Date(data.deleting.scheduledDeletion as Date), dateFormatWithTime, { locale })

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
              Your account is scheduled to be deleted on {scheduledDeletion}. Functionality is limited.
            </Trans>
          </AlertDescription>
        </HStack>
        <LinkButton
          href='/settings/profile/delete-account'
          size='sm'
          colorScheme='orange'
          variant='solid'
        >
          <Trans>
            View Details
          </Trans>
        </LinkButton>
      </Flex>
    </Alert>
  )
}
