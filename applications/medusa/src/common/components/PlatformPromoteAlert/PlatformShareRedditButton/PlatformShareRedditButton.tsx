import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SocialReddit } from '@//:assets/logos'
import MediumGenericButton from '../../GenericButtons/MediumGenericButton/MediumGenericButton'
import useRedditShare from '@//:modules/support/useRedditShare'

export default function PlatformShareRedditButton (): JSX.Element {
  const { i18n } = useLingui()

  const onOpen = useRedditShare({
    url: {
      pathname: '/creators'
    },
    title: 'overdoll is a new platform built for Rule34, NSFW, Hentai, Furry artists',
    trackingEventId: 'KYLM9WBY'
  })

  return (
    <MediumGenericButton colorScheme='red' isIcon onClick={onOpen} icon={SocialReddit}>
      {i18n._(t`Share on Reddit`)}
    </MediumGenericButton>
  )
}
