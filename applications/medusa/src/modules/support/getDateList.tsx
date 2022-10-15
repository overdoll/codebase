import format from 'date-fns/format'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '../locale'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import getYear from 'date-fns/getYear'
import subYears from 'date-fns/subYears'

interface GetMonthsReturn {
  name: string
  index: number
}

interface GetDaysReturn {
  name: string
  index: number
}

interface GetYearsReturn {
  name: string
  index: number
}

export const getMonths = (): GetMonthsReturn[] => {
  const months = [...Array(12).keys()]
  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const getMonthName = (month): string => {
    const date = new Date()
    date.setMonth(month)
    return format(new Date(date), 'MMMM', { locale: locale })
  }

  return months.map((item) => ({
    name: getMonthName(item),
    index: item
  }))
}

export const getDays = (month?: number | null): GetDaysReturn[] => {
  const currentMonth = month ?? 0
  const days = [...Array(getDaysInMonth(new Date(2000, currentMonth))).keys()]

  return days.map((item) => ({
    name: `${item + 1}`,
    index: item + 1
  }))
}

export const getYears = (): GetYearsReturn[] => {
  const startYear = 1900
  const endYear = getYear(subYears(new Date(), 18))

  const years = [...Array(endYear - startYear).keys()]

  return years.map((item) => ({
    name: `${item + startYear + 1}`,
    index: item + startYear + 1
  })).reverse()
}
