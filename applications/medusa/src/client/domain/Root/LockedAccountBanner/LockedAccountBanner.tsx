import { Alert, AlertDescription, AlertIcon, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Button from '@//:modules/form/Button/Button'
import Link from '@//:modules/routing/Link'
import { graphql, useFragment } from 'react-relay/hooks'
import { LockedAccountBannerFragment$key } from '@//:artifacts/LockedAccountBannerFragment.graphql'

interface Props {
  queryRef: LockedAccountBannerFragment$key | null
}

const LockedAccountBannerGQL = graphql`
  fragment LockedAccountBannerFragment on Account {
    lock {
      reason
      expires
    }
  }
`

export default function LockedAccountBanner ({ queryRef }: Props): JSX.Element | null {
  const [t] = useTranslation('locked')

  const data = useFragment(LockedAccountBannerGQL, queryRef)

  if (data?.lock == null) {
    return null
  }

  return (
    <Alert
      h={12}
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
            {t('banner.description')}
          </AlertDescription>
        </Flex>
        <Link to='/locked'>
          <Button
            size='sm'
            colorScheme='orange'
            variant='solid'
          >
            {t('banner.button')}
          </Button>
        </Link>
      </Flex>
    </Alert>
  )
}
