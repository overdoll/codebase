import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SocialTwitter } from '@//:assets/logos'
import MediumGenericButton from '../../GenericButtons/MediumGenericButton/MediumGenericButton'
import useTwitterShare from '@//:modules/support/useTwitterShare'

export default function PlatformShareTwitterButton (): JSX.Element {
  const { i18n } = useLingui()

  const onOpen = useTwitterShare({
    url: {
      pathname: '/artists'
    },
    hashtags: ['R34', 'Rule34', 'hentai', 'furry', 'NSFW', '3D'],
    text: 'overdoll is a platform built for the adult content artist (you!) to create a new experience for your fans when sharing your content!'
  })

  return (
    <MediumGenericButton colorScheme='twitter' isIcon onClick={onOpen} icon={SocialTwitter}>
      {i18n._(t`Share on Twitter`)}
    </MediumGenericButton>
  )
}
