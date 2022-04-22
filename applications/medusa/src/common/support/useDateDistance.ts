import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

export default function useDateDistance (from: number | Date, to: number | Date): string {
  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  return formatDistanceStrict(new Date(from), new Date(to), { locale })
}
