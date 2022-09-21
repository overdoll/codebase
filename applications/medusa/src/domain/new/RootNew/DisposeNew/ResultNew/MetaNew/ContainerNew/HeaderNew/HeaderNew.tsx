import { Trans } from '@lingui/macro'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'
import { FreshLeaf } from '@//:assets/icons'

export default function HeaderNew (): JSX.Element {
  return (
    <PageHeader icon={FreshLeaf} title={<Trans>New content</Trans>} />
  )
}
