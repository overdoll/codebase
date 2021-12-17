import { graphql, useFragment } from 'react-relay/hooks'
import { i18n } from '@lingui/core'
import { ReactNode, useMemo } from 'react'
import { I18nProvider } from '@lingui/react'
import { LocaleCreatorFragment$key } from '@//:artifacts/LocaleCreatorFragment.graphql'

interface Props {
  children: ReactNode
  queryRef: LocaleCreatorFragment$key
}

const LocaleCreatorGQL = graphql`
  fragment LocaleCreatorFragment on Query {
    language {
      locale
    }
  }
`

export default function LocaleCreator ({
  queryRef,
  children
}: Props): JSX.Element {
  const data = useFragment(LocaleCreatorGQL, queryRef)

  useMemo(() => {
    if (i18n.locale !== data.language.locale) {
      i18n.activate(data.language.locale as string)
    }
  }, [])

  return (
    <I18nProvider i18n={i18n}>
      {children}
    </I18nProvider>
  )
}
