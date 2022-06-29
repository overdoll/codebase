import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { TimeRewind } from '@//:assets/icons'
import { Tooltip } from '@chakra-ui/react'

export default function UploadRewindCategories (): JSX.Element {
  const { i18n } = useLingui()

  return (
    <Tooltip
      label={
        <Trans>
          Add categories from previous posts
        </Trans>
      }
    >
      <IconButton
        aria-label={i18n._(t`Rewind Categories`)}
        size='lg'
        icon={<Icon w={6} h={6} icon={TimeRewind} fill='gray.200' />}
      />
    </Tooltip>
  )
}
