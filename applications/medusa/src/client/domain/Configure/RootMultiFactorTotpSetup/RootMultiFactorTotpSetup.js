/**
 * @flow
 */

import { useTranslation } from 'react-i18next'

export default function RootMultiFactorTotpSetup (props: Props): Node {
  const [t] = useTranslation('settings')

  return (
    <>
      totp setup
    </>
  )
}
