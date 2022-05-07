import { t } from '@lingui/macro'
import { SelectInput } from '@//:modules/content/HookedComponents/Form'
import { useLingui } from '@lingui/react'
import subHours from 'date-fns/subHours'
import setDate from 'date-fns/setDate'
import format from 'date-fns/format'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'

const now = new Date()

export default function DepositDateInput (): JSX.Element {
  const { i18n } = useLingui()

  const month = format(now, 'MMMMMMM')

  const durations = [
    {
      title: i18n._(t`Now`),
      value: subHours(now, 1)
    },
    {
      title: i18n._(t`Start of ${month}`),
      value: startOfMonth(now)
    },
    {
      title: i18n._(t`15th of ${month}`),
      value: setDate(now, 15)
    },
    {
      title: i18n._(t`End of ${month}`),
      value: endOfMonth(now)
    }
  ]

  return (
    <SelectInput placeholder={i18n._(t`Select custom deposit date`)}>
      {durations.map((item, index) => (
        <option key={index} value={item.value as unknown as string}>
          {item.title}
        </option>)
      )}
    </SelectInput>
  )
}
