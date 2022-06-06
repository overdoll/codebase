import { t, Trans } from '@lingui/macro'
import Select from '../../../../../form/Select/Select'
import { SelectProps } from '@chakra-ui/react'
import { RegisterFunctionReturn } from '../../types'
import startOfToday from 'date-fns/startOfToday'
import startOfYesterday from 'date-fns/startOfYesterday'
import endOfYesterday from 'date-fns/endOfYesterday'
import subWeeks from 'date-fns/subWeeks'
import subMonths from 'date-fns/subMonths'
import subYears from 'date-fns/subYears'
import { useState } from 'react'
import { useLingui } from '@lingui/react'

type Props = SelectProps & RegisterFunctionReturn

export interface SearchDateRangeProps {
  from: Date
  to: Date
}

const now = new Date()

const values = {
  today: [startOfToday(), now],
  yesterday: [startOfYesterday(), endOfYesterday()],
  lastWeek: [subWeeks(now, 1), now],
  lastMonth: [subMonths(now, 1), now],
  lastYear: [subYears(now, 1), now]
}

export default function SearchDateRange ({
  id,
  onChangeRegister,
  isPending,
  ...rest
}: Props): JSX.Element {
  const { i18n } = useLingui()

  const dates = [
    {
      title: i18n._(t`Today`),
      value: 'today'
    },
    {
      title: i18n._(t`Yesterday`),
      value: 'yesterday'
    },
    {
      title: i18n._(t`Last Week`),
      value: 'lastWeek'
    },
    {
      title: i18n._(t`Last Month`),
      value: 'lastMonth'
    },
    {
      title: i18n._(t`Last Year`),
      value: 'lastYear'
    }
  ]

  const defaultValue = dates[0].value

  const [date, setDate] = useState<string>(defaultValue)

  const onChange = (e): void => {
    setDate(e.target.value)
    onChangeRegister({
      from: values[e.target.value][0],
      to: values[e.target.value][1]
    })
  }

  return (
    <Select value={date} id={id} onChange={onChange} {...rest}>
      {dates.map((item, index) => (
        <option key={index} value={item.value as unknown as string}>
          <Trans>
            {item.title}
          </Trans>
        </option>)
      )}
    </Select>
  )
}

export function getDateRangeDefault (): SearchDateRangeProps {
  return {
    from: values.today[0],
    to: values.today[1]
  }
}
