import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

export default function useFormattedDate (date: number | Date): string {
  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  return formatDistanceToNowStrict(new Date(date), { locale })
}
