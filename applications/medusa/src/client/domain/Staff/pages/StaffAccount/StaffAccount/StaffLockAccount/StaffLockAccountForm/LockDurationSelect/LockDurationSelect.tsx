import { SelectInput } from '@//:modules/content/HookedComponents/Form'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import addHours from 'date-fns/addHours'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import addYears from 'date-fns/addYears'
import subHours from 'date-fns/subHours'

const now = new Date()

export default function LockDurationSelect (): JSX.Element {
  const { i18n } = useLingui()

  const durations = [
    {
      title: i18n._(t`Warning (none)`),
      value: subHours(now, 1)
    },
    {
      title: i18n._(t`12 hours`),
      value: addHours(now, 12)
    },
    {
      title: i18n._(t`24 hours`),
      value: addHours(now, 24)
    },
    {
      title: i18n._(t`3 days`),
      value: addDays(now, 3)
    },
    {
      title: i18n._(t`7 days`),
      value: addDays(now, 7)
    },
    {
      title: i18n._(t`2 weeks`),
      value: addDays(now, 14)
    },
    {
      title: i18n._(t`1 month`),
      value: addMonths(now, 1)
    },
    {
      title: i18n._(t`3 months`),
      value: addMonths(now, 3)
    },
    {
      title: i18n._(t`1 year`),
      value: addYears(now, 1)
    },
    {
      title: i18n._(t`Purge`),
      value: addYears(now, 99)
    }
  ]

  return (
    <SelectInput placeholder={i18n._(t`Select duration`)}>
      {durations.map((item, index) => (
        <option key={index} value={item.value as unknown as string}>
          {item.title}
        </option>)
      )}
    </SelectInput>
  )
}
