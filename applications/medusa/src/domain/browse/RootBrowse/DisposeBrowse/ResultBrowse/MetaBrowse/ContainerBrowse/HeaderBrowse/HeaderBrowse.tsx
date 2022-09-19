import { Trans } from '@lingui/macro'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { HotContent } from '@//:assets/icons'

export default function HeaderBrowse (): JSX.Element {
  return (
    <PageHeader icon={HotContent} title={<Trans>Trending content</Trans>} />
  )
}
