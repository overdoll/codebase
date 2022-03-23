import { Currency, dinero, toFormat } from 'dinero.js'
import { AUD, CAD, EUR, GBP, JPY, USD } from '@dinero.js/currencies'

const currencies = {
  USD,
  AUD,
  CAD,
  EUR,
  GBP,
  JPY
}

interface TransformerProps {
  amount: number
  currency: Currency<number>
}

const intlFormat = (dineroObject, locale, options = {}): string => {
  const transformer = ({
    amount,
    currency
  }: TransformerProps): string => {
    return amount.toLocaleString(locale, {
      ...options,
      style: 'currency',
      currency: currency.code
    })
  }

  return toFormat(dineroObject, transformer)
}

interface DisplayPriceProps {
  amount: number
  currency: string
  locale: Locale
}

export default function displayPrice ({
  amount,
  currency,
  locale
}: DisplayPriceProps): string {
  const finalCurrency = currencies[currency]

  if (finalCurrency == null) {
    throw new Error(`Fatal error: currency ${currency} is not defined`)
  }

  const dineroValue = dinero({
    amount: amount,
    currency: finalCurrency
  })

  return intlFormat(dineroValue, currency, locale)
}
