import { t } from '@lingui/macro'
import { SocialDiscord } from '@//:assets/logos'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useLingui } from '@lingui/react'
import MediumGenericButton from '../../GenericButtons/MediumGenericButton/MediumGenericButton'

export default function PlatformShareDiscordButton (): JSX.Element {
  const { i18n } = useLingui()

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/artists'
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({
    text: `overdoll is a new platform built for Rule34, NSFW, Hentai, Furry artists - https://overdoll.com${resolved}`,
    response: i18n._(t`Copied Discord link! Send it in a channel or direct message!`)
  })

  return (
    <MediumGenericButton colorScheme='facebook' isIcon onClick={onCopy} icon={SocialDiscord}>
      {i18n._(t`Copy Discord Link`)}
    </MediumGenericButton>
  )
}
