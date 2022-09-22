import { Trans } from '@lingui/macro'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { HotContent } from '@//:assets/icons'

export default function HeaderTop (): JSX.Element {
  return (
    <PageHeader icon={HotContent} title={<Trans>Top content</Trans>} />
  )
}
