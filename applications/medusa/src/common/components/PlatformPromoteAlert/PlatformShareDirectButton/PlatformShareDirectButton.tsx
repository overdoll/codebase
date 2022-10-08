import { t } from '@lingui/macro'
import { CopyLink } from '@//:assets/icons'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { useRouter } from 'next/router'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useLingui } from '@lingui/react'
import MediumGenericButton from '../../GenericButtons/MediumGenericButton/MediumGenericButton'

export default function PlatformShareDirectButton (): JSX.Element {
  const { i18n } = useLingui()

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/creators'
  }, true)

  const [, onCopy] = useCopyToClipboardWrapper({ text: `https://overdoll.com${resolved}` })

  return (
    <MediumGenericButton colorScheme='gray' isIcon onClick={onCopy} icon={CopyLink}>
      {i18n._(t`Copy Link`)}
    </MediumGenericButton>
  )
}
