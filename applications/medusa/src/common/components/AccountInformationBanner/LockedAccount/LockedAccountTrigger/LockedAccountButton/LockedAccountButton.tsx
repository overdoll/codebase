import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { LockedAccountButtonQuery } from '@//:artifacts/LockedAccountButtonQuery.graphql'
import { t } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { WarningTriangle } from '@//:assets/icons'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import LockedAccountModal from '../../LockedAccountModal/LockedAccountModal'
import { useDisclosure } from '@chakra-ui/react'

const Query = graphql`
  query LockedAccountButtonQuery {
    viewer {
      lock {
        __typename
      }
      ...LockedAccountModalFragment
    }
  }
`

export default function LockedAccountButton (): JSX.Element | null {
  const queryData = useLazyLoadQuery<LockedAccountButtonQuery>(Query, {})

  const {
    isOpen,
    onClose,
    onOpen
  } = useDisclosure()

  const { i18n } = useLingui()

  if (queryData?.viewer?.lock == null) return null

  return (
    <>
      <IconButton
        aria-label={i18n._(t`Open Lock Info`)}
        onClick={onOpen}
        colorScheme='orange'
        size='sm'
        borderRadius='md'
        icon={<Icon fill='orange.900' w={4} h={4} icon={WarningTriangle} />}
      />
      <LockedAccountModal
        queryRef={queryData.viewer}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
